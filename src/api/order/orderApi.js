import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/order`;

export const registerOrder = async (dto, userId) => {
  const res = await axios.post(`${prefix}?userId=${userId}`, dto);
  console.log("registerOrder => ", res.data);
  return res.data;
};

export const getOneOrder = async (orderId) => {
  const res = await axios.get(`${prefix}?orderId=${orderId}`);
  console.log("getOneOrder => ", res.data);
  return res.data;
};

export const getOrderList = async (userId) => {
  const res = await axios.get(`${prefix}/list?userId=${userId}`);
  console.log("getOrderList => ", res.data);
  return res.data;
};
