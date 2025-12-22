import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/review";

export const reviewList = async (productId, sort, page = 1, size = 10) => {
  const { data } = await axiosInstance.get(`${prefix}/product/${productId}`, {
    params: {
      sort: sort,
      page: page,
      size: size,
    },
  });
  return data;
};

export const getMyReviews = async (page = 1, size = 10) => {
  const { data } = await axiosInstance.get(`${prefix}/user`, {
    params: { page: page, size: size },
  });
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
  const { data } = await axiosInstance.post(`${prefix}/add`, formData, header);
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

  const { data } = await axiosInstance.put(
    `${prefix}/modify/${reviewId}`,
    formData
  );
  return data;
};

export const reviewDelete = async (reviewId) => {
  const { data } = await axiosInstance.delete(`${prefix}/delete/${reviewId}`);
  return data;
};

export const reviewAvgRating = async (productId) => {
  const { data } = await axiosInstance.get(
    `${prefix}/product/${productId}/avg`
  );
  return data;
};

export const reviewCount = async (productId) => {
  const { data } = await axiosInstance.get(
    `${prefix}/product/${productId}/count`
  );
  return data;
};

export const reviewRatingByCount = async (productId, rating) => {
  const { data } = await axiosInstance.get(
    `${prefix}/product/${productId}/${rating}/count`
  );
  return data;
};

export const reviewPositive = async (productId) => {
  const { data } = await axiosInstance.get(
    `${prefix}/product/${productId}/positive`
  );
  return data;
};
