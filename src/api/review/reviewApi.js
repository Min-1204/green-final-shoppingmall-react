import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/review`;

export const reviewList = async (productId, sort) => {
  const { data } = await axios.get(`${prefix}/product/${productId}`, {
    params: {
      sort: sort,
    },
  });
  console.log("리뷰 목록 => ", data, "제품 Id => ", productId);
  return data;
};

export const getMyReviews = async (userId) => {
  const { data } = await axios.get(`${prefix}/user/${userId}`);
  console.log("유저 아이디 => ", userId);
  console.log("내 리뷰 => ", data);
  return data;
};

export const reviewAdd = async (review) => {
  console.log("리뷰 등록 => ", review);
  const formData = new FormData();
  formData.append(
    "review",
    new Blob(
      [
        JSON.stringify({
          content: review?.content,
          rating: review?.rating,
          userId: review?.userId,
          loginId: review?.loginId,
          productId: review?.productId,
          orderId: review?.orderId,
        }),
      ],
      { type: "application/json" }
    )
  );

  for (let file of review?.images) {
    formData.append("reviewImage", file);
  }

  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const { data } = await axios.post(`${prefix}/add`, formData, header);
  console.log("data => ", data);
  return data;
};

export const reviewModify = async (reviewId, updatedReview) => {
  const formData = new FormData();
  formData.append(
    "review",
    new Blob(
      [
        JSON.stringify({
          content: updatedReview?.content,
          rating: updatedReview?.rating,
          deleteImgUrls: updatedReview?.deleteImgUrls,
        }),
      ],
      { type: "application/json" }
    )
  );

  for (let file of updatedReview.newImages) {
    formData.append("reviewImage", file);
  }

  const { data } = await axios.put(`${prefix}/modify/${reviewId}`, formData);
  console.log("수장하려는 리뷰 Id => ", reviewId);
  return data;
};

export const reviewDelete = async (reviewId) => {
  const { data } = await axios.delete(`${prefix}/delete/${reviewId}`);
  console.log("삭제한 리뷰 Id => ", reviewId);
  return data;
};

export const reviewAvgRating = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/avg`);
  // console.log("제품 리뷰 평균 별점 => ", data);
  return data;
};

export const reviewCount = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/count`);
  // console.log("제품 리뷰 개수 => ", data);
  return data;
};

export const reviewRatingByCount = async (productId, rating) => {
  const { data } = await axios.get(
    `${prefix}/product/${productId}/${rating}/count`
  );
  // console.log("제품 리뷰 별점별 개수 => ", data);
  return data;
};

export const reviewPositive = async (productId) => {
  const { data } = await axios.get(`${prefix}/product/${productId}/positive`);
  // console.log("긍정적 리뷰 개수 => ", data);
  return data;
};
