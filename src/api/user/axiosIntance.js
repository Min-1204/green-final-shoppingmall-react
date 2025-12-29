import axios from "axios";

// 로컬 개발 api 요청 경로
export const API_SERVER = "http://localhost:8080";
// aws 로드밸런서 api 요청 경로
// export const API_SERVER = "https://moisture-village.kro.kr";

export const axiosInstance = axios.create({
  baseURL: API_SERVER,
  withCredentials: true
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
    const originalRequest = error.config;
    const isCurrentUser = originalRequest?.url?.includes("/currentUser");
    const isRefreshRequest = originalRequest?.url?.includes("/refresh");

    // 401 에러 처리 (인증 실패)
    if (error.response?.status === 401) {
      if (isCurrentUser) {
        return Promise.reject(error);
      }

      // refresh 요청 실패 시 로그인 페이지
      if (isRefreshRequest) {
        console.error("토큰 갱신 실패 - 재로그인 필요");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await axiosInstance.post("/api/user/refresh");
          return axiosInstance(originalRequest); // 원래 요청 재시도
        } catch (refreshError) {
          console.error("토큰 갱신 실패 - 재로그인 필요");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    // 403 에러 처리 (권한 없음)
    if (error.response?.status === 403) {
      const errorMessage =
        error.response.data?.message || "접근 권한이 없습니다.";
      console.error("403 권한 없음:", errorMessage);
      alert(errorMessage);
    }

    if (error.response?.data) {
      const { status, message } = error.response.data;

      const unifiedError = {
        status: status || error.response.status,
        message: message || "오류가 발생했습니다.",
        originalError: error
      };

      return Promise.reject(unifiedError);
    }

    // 네트워크 에러
    return Promise.reject({
      status: 0,
      message: "네트워크 오류가 발생했습니다.",
      originalError: error
    });
  }
);
