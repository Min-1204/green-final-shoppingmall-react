import axios from "axios";
import { API_SERVER_HOST } from "./reviewApi";

const host = API_SERVER_HOST;
const prefix = `${host}/api/comment`;

export const reviewCommentGetList = async (reviewId) => {
  const { data } = await axios.get(`${prefix}/${reviewId}`);
  console.log("리뷰 댓글 목록 => ", data);
  return data;
};

export const reviewCommentAdd = async (userId, reviewId, content) => {
  console.log("reviewId => ", reviewId, "content => ", content);
  const { data } = await axios.post(`${prefix}/add`, {
    userId,
    reviewId,
    content,
  });
  console.log("리뷰 댓글 => ", data);
  return data;
};

export const reviewCommentModify = async (commentId, content) => {
  console.log("수정하려는 댓글 id => ", commentId, "수정 내용 => ", content);
  const { data } = await axios.put(`${prefix}/modify/${commentId}`, {
    content,
  });
  console.log("수정 내용 => ", data);
  return data;
};

export const reviewCommentDelete = async (commentId) => {
  console.log("삭제하려는 댓글 id => ", commentId);
  const { data } = await axios.delete(`${prefix}/delete/${commentId}`);
  console.log("삭제한 댓글 => ", data);
  return data;
};
