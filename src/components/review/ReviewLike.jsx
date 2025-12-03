import React, { useEffect, useState } from "react";
import {
  reviewLikeCount,
  reviewLikeToggleTrueFalse,
} from "../../api/review/reviewLikeApi";
import { useSelector } from "react-redux";

const ReviewLike = ({ reviewId }) => {
  const [like, setLike] = useState(false); // true=좋아요 상태, false=취소 상태
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수
  const { user } = useSelector((state) => state.authSlice);

  //리뷰 좋아요(도움이 돼요) 토글
  const reviewLikeToggleHandler = async () => {
    const data = await reviewLikeToggleTrueFalse(reviewId, user.id);
    console.log("리뷰 좋아요 데이터 확인 => ", data);
    setLike(data);

    //토글 후 좋아요 개수 다시 가져오기
    const count = await reviewLikeCount(reviewId);
    setLikeCount(count);
  };

  // 초기 좋아요 개수 불러오기
  useEffect(() => {
    const getReviewLikeCount = async () => {
      const count = await reviewLikeCount(reviewId);
      console.log("리뷰 좋아요 개수 => ", count);
      setLikeCount(count);
    };
    getReviewLikeCount();
  }, []);

  return (
    <div>
      <button
        onClick={reviewLikeToggleHandler}
        className="cursor-pointer hover:text-gray-900 transition"
      >
        👍 도움이 돼요 {likeCount}
      </button>
    </div>
  );
};

export default ReviewLike;
