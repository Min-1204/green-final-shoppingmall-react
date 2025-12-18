import axios from "axios";
import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/coupon";

export const registerCoupon = async (registerForm) => {
  const res = await axiosInstance.post(`${prefix}`, registerForm);
  return res.data;
};

export const modifyCoupon = async (modifyForm) => {
  const res = await axiosInstance.post(`${prefix}/modify`, modifyForm);
  return res.data;
};

export const searchCoupons = async (condition) => {
  const res = await axiosInstance.post(`${prefix}/search`, condition);
  return res.data;
};

export const fetchCouponById = async (couponId) => {
  const res = await axiosInstance.get(`${prefix}/${couponId}`);
  return res.data;
};
