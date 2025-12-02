import { useEffect, useState } from "react";
import ReviewModifyDelete from "../../review/ReviewModifyDelete";
import ReviewSee from "../../review/ReviewSee";
import { getMyReviews } from "../../../api/review/reviewApi";
import { useNavigate } from "react-router-dom";

const MyPageReviewList = () => {
  const [reviewModal, setReviewModal] = useState(false); //리뷰 수정용 모달
  const [reviewSeeModal, setReviewSeeModal] = useState(false); //리뷰 보기 모달
  const [selectedReviewEdit, setSelectedReviewEdit] = useState(null); //수정할 리뷰
  const [selectedReviewSee, setSelectedReviewSee] = useState(null); //리뷰 보기로 보려는 리뷰
  const [reviews, setReviews] = useState([]); //리뷰 목록
  const navigate = useNavigate();

  // 화면에 리뷰 목록 보이기
  useEffect(() => {
    const getReviews = async () => {
      const review = await getMyReviews(2);
      setReviews(review);
      console.log("review => ", review);
    };
    getReviews();
  }, []);

  //리뷰 수정(업데이트) 핸들러
  const reviewUpdatedHandler = (updatedReview) => {
    if (updatedReview.deleted) {
      //삭제일때
      setReviews((prev) =>
        prev.filter((review) => review.id !== updatedReview.id)
      );
      setSelectedReviewEdit(null);
    } else {
      //수정일때
      setReviews((prev) => {
        const update = prev.map((review) =>
          review.id === updatedReview.id ? updatedReview : review
        );
        console.log("업데이트된 review 배열 => ", update);
        return update;
      });
    }
  };

  // 리뷰 수정 모달 열기
  const reviewModifyModal = (id) => {
    const foundReview = reviews.find((r) => r.id === id);
    if (foundReview) {
      setSelectedReviewEdit(foundReview);
      setReviewModal(true);
    }
  };

  const productDetailPageHandler = (productId) => {
    navigate(`/product/${productId}`);
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
          {reviews.map((review) => (
            <div
              key={review.id}
              className="grid grid-cols-12 gap-4 py-6 items-start"
            >
              {/* 상품 정보 */}
              <div className="col-span-6 flex gap-4">
                <div
                  className="relative cursor-pointer"
                  onClick={() => productDetailPageHandler(review.productId)}
                >
                  <img
                    src={review.productImage}
                    alt="product"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-800 mb-1 font-bold">
                    {review.brandName}
                  </p>
                  <p
                    className="font-medium text-sm mb-2 cursor-pointer hover:text-zinc-900"
                    onClick={() => productDetailPageHandler(review.productId)}
                  >
                    {review.productName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>주문일자</span>
                  </div>
                </div>
              </div>

              {/* 리뷰 정보 */}
              <div className="col-span-3">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  {review.badge && (
                    <span className="ml-2 px-2 py-0.5 bg-zinc-100 text-zinc-600 text-xs rounded">
                      {review.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-700 line-clamp-2">
                  {review.content}
                </p>
              </div>

              {/* 작성일자 및 버튼 */}
              <div className="col-span-3 flex flex-col items-end gap-2">
                <div className="text-xs text-zinc-500 text-right">
                  <div>
                    작성일자 {review.createdAt?.slice(0, 10).replace(/-/g, ".")}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => reviewModifyModal(review.id)}
                    className="px-4 py-1.5 text-xs border border-zinc-300 rounded hover:bg-zinc-50 cursor-pointer"
                  >
                    리뷰수정
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReviewSee(review);
                      setReviewSeeModal(true);
                    }}
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
        {reviewModal && selectedReviewEdit && (
          <ReviewModifyDelete
            closeModal={() => {
              setReviewModal(false);
              setSelectedReviewEdit(null);
            }}
            review={selectedReviewEdit}
            update={reviewUpdatedHandler}
          />
        )}

        {/* ReviewSee 연결 */}
        {reviewSeeModal && selectedReviewSee && (
          <ReviewSee
            closeModal={() => setSelectedReviewSee(null)}
            review={selectedReviewSee}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageReviewList;
