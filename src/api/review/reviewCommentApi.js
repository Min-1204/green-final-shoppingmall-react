import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/comment";

export const reviewCommentGetList = async (reviewId) => {
  const { data } = await axiosInstance.get(`${prefix}/${reviewId}`);
  console.log("리뷰 댓글 목록 => ", data);
  return data;
};

export const reviewCommentAdd = async (userId, reviewId, content) => {
  console.log("reviewId => ", reviewId, "content => ", content);
  const { data } = await axiosInstance.post(`${prefix}/add`, {
    userId,
    reviewId,
    content
  });
  console.log("리뷰 댓글 => ", data);
  return data;
};

export const reviewCommentModify = async (commentId, content, userId) => {
  console.log("수정하려는 댓글 id => ", commentId, "수정 내용 => ", content);
  const { data } = await axiosInstance.put(
    `${prefix}/modify/${commentId}`,
    {
      content
    },
    { params: { userId } }
  );
  console.log("수정 내용 => ", data);
  return data;
};

export const reviewCommentDelete = async (commentId, userId) => {
  console.log("삭제하려는 댓글 id => ", commentId);
  const { data } = await axiosInstance.delete(`${prefix}/delete/${commentId}`, {
    params: { userId: userId }
  });
  console.log("삭제한 댓글 => ", data);
  return data;
};
