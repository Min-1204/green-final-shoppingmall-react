import { axiosInstance } from "./axiosIntance";

const AUTH_API = "/api/auth";

export const authApi = {
  sendFindIdCode: (email) => {
    return axiosInstance.post(`${AUTH_API}/find-id/send-code`, { email });
  },
  verifyFindId: (email, code) => {
    return axiosInstance.post(`${AUTH_API}/find-id/verify`, { email, code });
  },

  sendFindPwCode: (userId, email) => {
    return axiosInstance.post(`${AUTH_API}/find-pw/send-code`, {
      userId,
      email
    });
  },

  verifyFindPw: (email, code) => {
    return axiosInstance.post(`${AUTH_API}/find-pw/verify`, { email, code });
  },

  resetPassword: (userId, newPassword) => {
    return axiosInstance.post(`${AUTH_API}/find-pw/reset`, {
      userId,
      newPassword
    });
  }
};
