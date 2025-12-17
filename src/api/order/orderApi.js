import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/order`;

export const registerOrder = async (dto, userId) => {
  // console.log("registerOrder 전달 데이터 => dto", dto);
  // console.log("registerOrder 전달 데이터 => userId", userId);
  const res = await axios.post(`${prefix}?userId=${userId}`, dto);
  // console.log("registerOrder => ", res.data);
  return res.data;
};

export const getOneOrder = async (orderId) => {
  const res = await axios.get(`${prefix}?orderId=${orderId}`);
  // console.log("getOneOrder => ", res.data);
  return res.data;
};

// export const getOrderList = async (userId, sort, page = 1, size = 10) => {
//   const res = await axios.get(`${prefix}/list/${userId}`, {
//     params: {
//       sort: sort,
//       page: page,
//       size: size,
//     },
//   });
//   console.log("getOrderList => ", res.data);
//   return res.data;
// };

export const deleteOneOrder = async (orderId) => {
  const res = await axios.delete(`${prefix}?orderId=${orderId}`);
  // console.log("deleteOneOrder => ", res.data);
  return res.data;
};

export const getOrdersBySearch = async (condition, sort, page, size) => {
  const res = await axios.post(`${prefix}/search`, condition, {
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
  const res = await axios.put(`${prefix}/confirm/${orderId}`);
  console.log("confirmOrder =>", res.data);
  return res.data;
};

export const changeOrderProductStatus = async (orderId, status) => {
  const res = await axios.put(`${prefix}/${orderId}`, status);
  console.log("changeOrderProductStatus => ", res.data);
  return res.data;
};
