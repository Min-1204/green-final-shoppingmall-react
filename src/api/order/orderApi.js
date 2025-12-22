import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = "/api/order";

export const registerOrder = async (dto, userId) => {
  // console.log("registerOrder 전달 데이터 => dto", dto);
  // console.log("registerOrder 전달 데이터 => userId", userId);
  const res = await axiosInstance.post(`${prefix}?userId=${userId}`, dto);
  // console.log("registerOrder => ", res.data);
  return res.data;
};

export const getOneOrder = async (orderId) => {
  const res = await axiosInstance.get(`${prefix}?orderId=${orderId}`);
  // console.log("getOneOrder => ", res.data);
  return res.data;
};

export const deleteOneOrder = async (orderId) => {
  const res = await axiosInstance.delete(`${prefix}?orderId=${orderId}`);
  // console.log("deleteOneOrder => ", res.data);
  return res.data;
};

export const getOrdersBySearch = async (condition, sort, page, size) => {
  const res = await axiosInstance.post(`${prefix}/search`, condition, {
    params: {
      sort: sort,
      page: page,
      size: size,
    },
  });
  // console.log("getOrdersBySearch => ", res.data);
  return res.data;
};

export const confirmOrder = async (orderId) => {
  const res = await axiosInstance.put(`${prefix}/confirm/${orderId}`);
  console.log("confirmOrder =>", res.data);
  return res.data;
};

export const changeOrderProductStatus = async (orderId, newStatus) => {
  const res = await axiosInstance.put(`${prefix}/${orderId}`, {
    status: newStatus,
  });
  console.log("changeOrderProductStatus => ", res.data);
  return res.data;
};

export const getOrderStatusSummary = async (userId, startDate, endDate) => {
  const res = await axiosInstance.get(`${prefix}/summary`, {
    params: {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    },
  });
  console.log("getOrderStatusSummary => ", res.data);
  return res.data;
};
