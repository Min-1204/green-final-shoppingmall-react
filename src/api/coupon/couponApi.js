import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/usercoupon`;

export const getUserCoupons = async (userId) => {
  const res = await axios.get(`${prefix}/${userId}`);
  //   console.log("유저 쿠폰 불러오기", res.data);
  return res.data;
};
