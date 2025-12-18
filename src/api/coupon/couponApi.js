import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/usercoupon";

export const getUserCoupons = async (userId) => {
  const res = await axiosInstance.get(`${prefix}/${userId}`);
  //   console.log("유저 쿠폰 불러오기", res.data);
  return res.data;
};
