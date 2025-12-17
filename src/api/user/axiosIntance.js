import axios from "axios";

export const API_SERVER = "http://localhost:8080";

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
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패 : 토큰 만료");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
