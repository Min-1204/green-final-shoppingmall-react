import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = API_SERVER_HOST;
const prefix = `${host}/api/like`;

export const reviewLikeToggleTrueFalse = async (reviewId, userId) => {
  console.log("좋아요 토글하려는 리뷰 Id => ", reviewId);
  console.log("리뷰 좋아요 토글한 유저 Id => ", userId);
  const { data } = await axios.post(`${prefix}/${reviewId}`, { userId });
  return data;
};

export const reviewLikeCount = async (reviewId) => {
  console.log("좋아요 개수를 보려는 리뷰 Id => ", reviewId);
  const { data } = await axios.get(`${prefix}/${reviewId}/count`);
  return data;
};
