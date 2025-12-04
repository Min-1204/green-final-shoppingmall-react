import axios from "axios";
import { API_SERVER_HOST } from "../product/productApi";

const prefix = `${API_SERVER_HOST}/api/coupon`;

export const registerCoupon = async (registerForm) => {
  const res = await axios.post(`${prefix}`, registerForm);
  return res.data;
};

export const modifyCoupon = async (modifyForm) => {
  const res = await axios.post(`${prefix}/modify`, modifyForm);
  return res.data;
};

export const searchCoupons = async (condition) => {
  const res = await axios.post(`${prefix}/search`, condition);
  return res.data;
};

export const fetchCouponById = async (couponId) => {
  const res = await axios.get(`${prefix}/${couponId}`);
  return res.data;
};
