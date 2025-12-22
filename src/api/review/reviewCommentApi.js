import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/comment";

export const reviewCommentGetList = async (reviewId) => {
  const { data } = await axiosInstance.get(`${prefix}/${reviewId}`);
  return data;
};

export const reviewCommentAdd = async (reviewId, content) => {
  const { data } = await axiosInstance.post(`${prefix}/add`, {
    reviewId,
    content,
  });
  return data;
};

export const reviewCommentModify = async (commentId, content) => {
  const { data } = await axiosInstance.put(`${prefix}/modify/${commentId}`, {
    content,
  });
  return data;
};

export const reviewCommentDelete = async (commentId) => {
  const { data } = await axiosInstance.delete(`${prefix}/delete/${commentId}`);
  return data;
};
