import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = API_SERVER_HOST;
const prefix = `${host}/api/like`;

export const reviewLikeToggleTrueFalse = async (reviewId, userId) => {
  const { data } = await axios.post(`${prefix}/${reviewId}`, { userId });
  return data;
};

export const reviewLikeCount = async (reviewId) => {
  const { data } = await axios.get(`${prefix}/${reviewId}/count`);
  return data;
};
