import { useEffect, useState } from "react";
import ReviewModifyDelete from "../../review/ReviewModifyDelete";
import ReviewSee from "../../review/ReviewSee";
import { getMyReviews } from "../../../api/review/reviewapi";

const MyPageReviewList = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [seeReviewModal, setSeeReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      const review = await getMyReviews(1);
      setReviews(review);
      console.log("review => ", review);
    };
    getReviews();
  }, []);

  useEffect(() => {
    if (selectedReview) {
      setSeeReviewModal(true);
    }
  }, [selectedReview]);

  const reviewUpdatedHandler = (updatedReview) => {
    if (updatedReview.deleted) {
      //삭제일때
      setReviews((prev) =>
        prev.filter((review) => review.id !== updatedReview.id)
      );
    } else {
      //수정일때
      setReviews((prev) =>
        prev.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        )
      );
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="px-8 pt-6 pb-8">
        {/* 누적 리뷰 건수 */}
        <h3 className="text-ml text-gray-800 font-semibold mb-6">
          누적 리뷰 건수 <span className="text-red-500">{reviews.length}</span>{" "}
          건
        </h3>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-12 gap-4 py-3 border-b border-zinc-200 text-sm text-zinc-600">
          <div className="col-span-6 pl-2">상품</div>
          <div className="col-span-3">리뷰</div>
          <div className="col-span-3"></div>
        </div>

        {/* 리뷰 목록 */}
        <div className="divide-y divide-zinc-200">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-6 items-start hover:bg-zinc-50 transition"
            >
              {/* 상품 정보 */}
              <div className="col-span-6 flex gap-4">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    {item.id}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                    <span>구매일자</span>
                    <span>{item.date}</span>
                    <span>| 매장</span>
                  </div>
                  <p className="font-medium text-sm mb-1">{item.productName}</p>
                  <p className="text-xs text-zinc-500">{item.option}</p>
                </div>
              </div>

              {/* 리뷰 정보 */}
              <div className="col-span-3">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= item.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-700 line-clamp-2">
                  {item.review}
                </p>
              </div>

              {/* 작성일자 및 버튼 */}
              <div className="col-span-3 flex flex-col items-end gap-2">
                <div className="text-xs text-zinc-500 text-right">
                  <div>작성일자 {item.writePeriod}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedReview(item);
                      setReviewModal(true);
                    }}
                    className="px-4 py-1.5 text-xs border border-zinc-300 rounded hover:bg-zinc-50 cursor-pointer"
                  >
                    리뷰수정
                  </button>
                  <button
                    onClick={() => setSelectedReview(item)}
                    className="px-4 py-1.5 text-xs border border-zinc-300 rounded hover:bg-zinc-50 cursor-pointer"
                  >
                    리뷰보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8">
          <button className="px-4 py-2 border border-zinc-300 rounded text-sm">
            1
          </button>
        </div>

        {/* ReviewModifyDelete 연결 */}
        {reviewModal && selectedReview && (
          <ReviewModifyDelete
            closeModal={() => setReviewModal(false)}
            review={selectedReview}
            update={reviewUpdatedHandler}
          />
        )}

        {/* ReviewSee 연결 */}
        {seeReviewModal && (
          <ReviewSee
            closeModal={() => setSeeReviewModal(false)}
            review={selectedReview}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageReviewList;
