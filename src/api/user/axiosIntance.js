import axios from "axios";

export const API_SERVER = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_SERVER,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  console.log(`여기는 Request 인터셉터 :${config}`);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("인증 실패 : 토큰 만료");
      window.location.href("/login");
    }
    return Promise.reject(error);
  }
);
