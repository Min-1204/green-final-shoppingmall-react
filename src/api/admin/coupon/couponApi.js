import axios from "axios";
import { API_SERVER_HOST } from "../product/productApi";

const prefix = `${API_SERVER_HOST}/api/coupon`;

export const registerCoupon = async (registerForm) => {
  const res = await axios.post(`${prefix}`, registerForm);
  return res.data;
};
