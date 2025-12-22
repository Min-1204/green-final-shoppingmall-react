import axios from "axios";

export const API_SERVER = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // FormData가 아닐 때만 application/json 설정
  if (!(config.data instanceof FormData)) {
    // config.data가 FormData의 인스턴스가 아니라면 아래의 header를 Contet-Type application/json으로 변경
    // 즉 Form(객체)가 아니라면 JSON으로 설정하는 로직
    config.headers["Content-Type"] = "application/json";
  }
  // console.log("여기는 Request 인터셉터 :", config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config; // 실패한 원래 요청의 모든 설정(URL, 파라미터 등)을 보관
    const isCurrentUser = originalRequest?.url?.includes("/currentUser");
    const isRefreshRequest = originalRequest?.url?.includes("/refresh");

    if (isCurrentUser && error.response?.status === 401) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !isRefreshRequest &&
      !originalRequest._retry // 재시도중이라는
    ) {
      originalRequest._retry = true; // 무한루프 방지. 여기서 재시도 플래그 설정

      try {
        await axiosInstance.post("/api/user/refresh");

        // 성공 시 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패 - 재 로그인이 필요합니다");
        if (!isCurrentUser) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
