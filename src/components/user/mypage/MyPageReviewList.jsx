import { useEffect, useState } from "react";
import ReviewModifyDelete from "../../review/ReviewModifyDelete";
import ReviewSee from "../../review/ReviewSee";
import { getMyReviews } from "../../../api/review/reviewApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../../pagination/Pagination";

const MyPageReviewList = () => {
  const [reviewModal, setReviewModal] = useState(false); //리뷰 수정용 모달
  const [reviewSeeModal, setReviewSeeModal] = useState(false); //리뷰 보기 모달
  const [selectedReviewEdit, setSelectedReviewEdit] = useState(null); //수정할 리뷰
  const [selectedReviewSee, setSelectedReviewSee] = useState(null); //리뷰 보기로 보려는 리뷰

  const [pageResponse, setPageResponse] = useState(null);
  const reviews = pageResponse?.dtoList || [];

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { user } = useSelector((state) => state.authSlice); //로그인한 유저 정보

  const getNum = (param, defaultValue) => {
    if (!param) return defaultValue;
    return parseInt(param, 10);
  };

  useEffect(() => {
    if (!user) return; //로그인 안 됐으면 종료

    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);

    console.log("페이지 정보:", { page, size });

    const getReviews = async () => {
      const reviews = await getMyReviews(user.id, page, size);
      setPageResponse(reviews);
      console.log("reviews => ", reviews);
    };
    getReviews();
  }, [user, queryParams]);

  //리뷰 수정(업데이트) 핸들러
  const reviewUpdatedHandler = (updatedReview) => {
    if (updatedReview.deleted) {
      //삭제일때
      setPageResponse((prev) => ({
        ...prev,
        dtoList: prev.dtoList.filter(
          (review) => review.id !== updatedReview.id
        ),
        totalDataCount: prev.totalDataCount - 1,
      }));
      setSelectedReviewEdit(null);
    } else {
      //수정일때
      setPageResponse((prev) => {
        const update = prev.dtoList.map((review) => {
          if (review.id === updatedReview.id) {
            return updatedReview;
          }
          return review;
        });
        console.log("업데이트된 review 배열 => ", update);
        return {
          ...prev,
          dtoList: update,
        };
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
          누적 리뷰 건수{" "}
          <span className="text-red-500">{pageResponse?.totalDataCount}</span>{" "}
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
          {reviews.length > 0 ? (
            reviews.map((review) => {
              // 본인 리뷰인지 확인 (마이페이지에서는 모두 본인 리뷰지만 명시적으로)
              const myReview = user && review.userId === user.id;

              return (
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
                        onClick={() =>
                          productDetailPageHandler(review.productId)
                        }
                      >
                        {review.productName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>주문일자</span>
                        <span>
                          {review.purchaseDate.slice(0, 10).replace(/-/g, ".")}
                        </span>
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
                        작성일자{" "}
                        {review.createdAt?.slice(0, 10).replace(/-/g, ".")}
                      </div>
                    </div>
                    {/* 본인 리뷰만 수정/삭제 버튼 표시 */}
                    {myReview && (
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
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-500">
              작성한 리뷰가 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {pageResponse && <Pagination pageResponseDTO={pageResponse} />}

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
