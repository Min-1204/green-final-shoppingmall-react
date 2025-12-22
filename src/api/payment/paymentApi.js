import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = "/api/payments";

export const verifyPaymentAndCompleteOrder = async (impUid, merchantUid) => {
  const res = await axiosInstance.post(`${prefix}/verify`, {
    imp_uid : impUid,
    merchant_uid : merchantUid
  })
  console.log("verifyPaymentAndCompleteOrder =>", res);
  return res;
}

export const refundPayment = async (orderId, reason) => {
  const res = await axiosInstance.post(`${prefix}/refund/${orderId}`, reason);
  console.log("refundPayment =>", res.data);
  return res.data;
};
