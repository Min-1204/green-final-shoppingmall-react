import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  reviewAvgRating,
  reviewCount,
  reviewRatingByCount,
  reviewPositive,
} from "../../api/review/reviewApi";

const ReviewRatingComponent = ({ productId }) => {
  const [avgRating, setAvgRating] = useState(0);
  const [reviewTotalCount, setReviewTotalCount] = useState(0);
  const [ratingByCount, setRatingByCount] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [positivePercent, setPositivePercent] = useState(0);

  // 리뷰 평균 별점
  useEffect(() => {
    if (!productId) return;
    const productReviewAvgRating = async () => {
      const data = await reviewAvgRating(productId);
      setAvgRating(data);
    };
    productReviewAvgRating();
  }, [productId]);

  // 리뷰 개수
  useEffect(() => {
    if (!productId) return;
    const productReviewCount = async () => {
      const data = await reviewCount(productId);
      setReviewTotalCount(data);
    };
    productReviewCount();
  }, [productId]);

  // 별점별 리뷰(5,4,3,2,1) 개수
  useEffect(() => {
    if (!productId) return;
    const productReviewRatingByCount = async () => {
      const counts = {};
      for (let rating = 1; rating <= 5; rating++) {
        const data = await reviewRatingByCount(productId, rating);
        counts[rating] = data;
      }
      setRatingByCount(counts);
    };
    productReviewRatingByCount();
  }, [productId]);

  // 긍정적 리뷰(5,4) 비율
  useEffect(() => {
    if (!productId) return;
    const productReviewPositive = async () => {
      const positive = await reviewPositive(productId);
      const total = await reviewCount(productId);

      let percent = 0;
      if (total === 0) {
        percent = 0;
      } else {
        percent = Math.trunc((positive / total) * 100);
      }
      setPositivePercent(percent);
    };
    productReviewPositive();
  }, [productId]);

  // 그래프 너비 계산
  const maxCount = Math.max(...Object.values(ratingByCount));
  const barWidth = (count) => {
    if (maxCount === 0) return "0%";
    return `${(count / maxCount) * 100}%`;
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg mb-6 bg-white">
      <p className="text-center text-xs text-gray-500 mb-6">
        ※ 리뷰는 주문 개수 상관없이 주문 건당 상품별 1회 작성 가능합니다.
      </p>

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* 평균 점수 */}
        <div className="flex flex-col items-center justify-center lg:w-1/3 py-4 border-b lg:border-b-0 lg:border-r border-gray-200 mb-6 lg:mb-0">
          <div className="flex items-center space-x-2 text-6xl font-extrabold text-gray-900 mb-2">
            <FaStar className="w-12 h-12 text-yellow-500" />
            <span className="text-5xl">{Math.trunc(avgRating)}</span>
          </div>
          <p className="text-sm text-gray-700 font-medium mt-3">
            <span className="font-bold text-blue-600">{positivePercent}%</span>
            의 구매자가 이 상품을 좋아합니다.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            (총 {reviewTotalCount}개 리뷰)
          </p>
        </div>

        {/* 별점 그래프 */}
        <div className="flex-1 lg:w-2/3 space-y-3 pt-4">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center text-sm">
              <div className="w-30 text-gray-700 font-medium">
                {"★".repeat(rating)}
              </div>
              <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all duration-700 ease-out rounded-full"
                  style={{
                    width: barWidth(ratingByCount[rating]),
                  }}
                ></div>
              </div>
              <div className="w-10 text-right text-sm text-gray-600 font-semibold">
                {ratingByCount[rating]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewRatingComponent;
