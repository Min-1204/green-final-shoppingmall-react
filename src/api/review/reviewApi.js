import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/review`;

// export const reviewList = async (productId) => {
//   const res = await axios.get(`${prefix}/product/${productId}`);
//   console.log("product review => ", productId);
//   return res.data;
// };

export const getAll = async () => {
  //임시 리뷰 목록보기
  const { data } = await axios.get(`${prefix}/all`);
  console.log("리뷰 전체 => ", data);
  return data;
};

export const reviewAdd = async (review) => {
  const { data } = await axios.post(`${prefix}/reviewAdd`, review);
  console.log("data => ", data);
  return data;
};

export const reviewModify = async (reviewId, updatedReview) => {
  const { data } = await axios.put(`${prefix}/${reviewId}`, updatedReview);
  console.log("reviewId => ", reviewId);
  return data;
};

export const reviewDelete = async (reviewId) => {
  const { data } = await axios.delete(`${prefix}/${reviewId}`);
  console.log("delete reviewId => ", reviewId);
  return data;
};
