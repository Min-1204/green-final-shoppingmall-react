import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/review`;

export const reviewList = async (productId, sort) => {
  const { data } = await axios.get(`${prefix}/product/${productId}`, {
    params: {
      sort: sort,
    },
  });
  console.log("API 요청 data => ", data, "productId => ", productId);
  return data;
};

export const getMyReviews = async (userId) => {
  const { data } = await axios.get(`${prefix}/user/${userId}`);
  console.log("아이디 => ", userId);
  console.log("내 리뷰 => ", data);
  return data;
};

export const reviewAdd = async (review) => {
  const { data } = await axios.post(`${prefix}/add`, review);
  console.log("data => ", data);
  return data;
};

export const reviewModify = async (reviewId, updatedReview) => {
  const { data } = await axios.put(
    `${prefix}/modify/${reviewId}`,
    updatedReview
  );
  console.log("reviewId => ", reviewId);
  return data;
};

export const reviewDelete = async (reviewId) => {
  const { data } = await axios.delete(`${prefix}/delete/${reviewId}`);
  console.log("delete reviewId => ", reviewId);
  return data;
};

export const reviewAvgRating = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/avg`);
  console.log("제품 리뷰 평균 별점 => ", data);
  return data;
};

export const reviewCount = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/count`);
  console.log("제품 리뷰 개수 => ", data);
  return data;
};

export const reviewRatingByCount = async (productId, rating) => {
  const { data } = await axios.get(
    `${prefix}/product/${productId}/${rating}/count`
  );
  console.log("제품 리뷰 별점별 개수 => ", data);
  return data;
};

export const reviewPositive = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/positive`);
  console.log("긍정적 리뷰 개수 => ", data);
  return data;
};
