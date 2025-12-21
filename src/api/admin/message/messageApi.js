import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/notification";

export const sendSmsMessage = async ({ users, message }) => {
  const res = await axiosInstance.post(`${prefix}/sms`, {
    userIds: users.map((u) => u.id),
    message,
  });
  return res.data;
};
