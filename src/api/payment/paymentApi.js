import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = "/api/payments";

export const refundPayment = async (orderId, reason) => {
  const res = await axiosInstance.post(`${prefix}/refund/${orderId}`, reason);
  console.log("refundPayment =>", res.data);
  return res.data;
};
