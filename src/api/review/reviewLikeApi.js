import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/like";

export const reviewLikeToggleTrueFalse = async (reviewId) => {
  const { data } = await axiosInstance.post(`${prefix}/${reviewId}`);
  return data;
};

export const reviewLikeCount = async (reviewId) => {
  const { data } = await axiosInstance.get(`${prefix}/${reviewId}/count`);
  return data;
};
