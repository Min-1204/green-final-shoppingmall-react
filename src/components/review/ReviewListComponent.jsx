import { useEffect, useRef, useState } from "react";
import ReviewRatingComponent from "./ReviewRatingComponent";
import { reviewList } from "../../api/review/reviewApi";
import ReviewCommentMgr from "./ReviewCommentMgr";
import ReviewLike from "./ReviewLike";
import { useSearchParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const ReviewListComponent = ({ productId }) => {
  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "좋아요순", value: "like" },
    { label: "높은별점순", value: "ratingDesc" },
    { label: "낮은별점순", value: "ratingAsc" },
  ];

  const [pageResponse, setPageResponse] = useState(null); //백엔드 응답 저장할 상태(PageResponseDTO 저장)
  const reviews = pageResponse?.dtoList || []; //리뷰 데이터는 응답에서 가져옴
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const sortRef = useRef();
  const [modalImage, setModalImage] = useState(null);
  const [commentData, setCommentData] = useState({}); // 각 리뷰의 댓글 데이터 저장

  const [queryParams] = useSearchParams();

  // URL 쿼리에서 숫자 값을 읽어오는 함수
  const getNum = (param, defaultValue) => {
    if (!param) return defaultValue;
    return parseInt(param, 10);
  };

  // 리뷰 목록 조회
  useEffect(() => {
    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);
    //URL에서 현재 페이지와 사이즈 정보 읽어옴

    const getReviews = async () => {
      const reviews = await reviewList(
        productId,
        selectedSort.value,
        page,
        size
      );
      setPageResponse(reviews); //PageResponseDTO를 저장
    };
    getReviews();
  }, [selectedSort, productId, queryParams]);

  // 정렬 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpenDropdown((prev) => (prev === "sort" ? null : prev));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 댓글 토글
  const toggleComments = (reviewId) => {
    setShowComments((current) => ({
      ...current,
      [reviewId]: !current[reviewId],
    }));
  };

  //댓글 개수 계산 함수
  const getCommentCount = (reviewId) => {
    return commentData[reviewId]?.length || 0;
  };

  //댓글 데이터 업데이트 핸들러
  const commentDataUpdateHandler = (reviewId, comments) => {
    setCommentData((prev) => ({ ...prev, [reviewId]: comments }));
  };

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  return (
    <div className="w-full min-h-screen">
      <div className="w-full mx-auto my-6">
        <ReviewRatingComponent productId={productId} />

        {/* 정렬 드롭다운 */}
        <div className="flex items-center space-x-3 py-4 text-sm text-gray-600">
          <div className="relative" ref={sortRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "sort" ? null : "sort")
              }
              className="px-2 py-0.5 text-xs bg-white border border-gray-300 rounded-md text-gray-700 cursor-pointer hover:border-gray-400 transition flex items-center justify-between min-w-[90px]"
            >
              <span>{selectedSort.label}</span>
              <span className="ml-2 text-gray-600 text-lg">▾</span>
            </button>

            {openDropdown === "sort" && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden">
                {sortOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs transition-colors"
                    onClick={() => {
                      setSelectedSort(option);
                      setOpenDropdown(null);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        {/* 리뷰 목록 */}
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => {
            const commentCount = getCommentCount(review.id);

            return (
              <div
                key={review.id}
                className="bg-white pb-4 mb-4 border-b border-gray-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-900 font-semibold text-base">
                        {review.loginId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {review.createdAt?.slice(0, 10).replace(/-/g, ".")}
                      </span>
                    </div>
                    <div className="text-yellow-500 text-sm">
                      <span>{"★".repeat(review.rating)}</span>
                    </div>
                  </div>

                  <div className="mb-2 text-sm text-gray-500">
                    <p>{review.option || "구매 옵션"}</p>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {review.content}
                  </p>

                  {/* 이미지 */}
                  <div className="flex gap-2 mb-3">
                    {review.imageUrls.slice(0, 5).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="리뷰 이미지"
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() => openModal(img)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-end space-x-4 text-sm text-gray-500 pt-3">
                    {/* 리뷰 좋아요 컴포넌트 */}
                    <ReviewLike reviewId={review.id} />

                    {/* 댓글 보기 버튼 + 개수 */}
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleComments(review.id)}
                    >
                      <span className="mr-1">💬</span>
                      <span>댓글 보기</span>
                      <span className="ml-1 text-gray-600">
                        ({commentCount})
                      </span>
                    </div>

                    {/* 댓글 수 로딩용 */}
                    <div className="hidden">
                      <ReviewCommentMgr
                        reviewId={review.id}
                        commentUpdate={(comments) =>
                          commentDataUpdateHandler(review.id, comments)
                        }
                      />
                    </div>
                  </div>

                  {/* 댓글 컴포넌트 */}
                  {showComments[review.id] && (
                    <div className="mt-4 border-t border-gray-200 pt-3 space-y-3">
                      <ReviewCommentMgr
                        reviewId={review.id}
                        commentUpdate={(comments) =>
                          commentDataUpdateHandler(review.id, comments)
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>리뷰가 없습니다.</p>
        )}

        {/* 페이지네이션 컴포넌트 */}
        {pageResponse && <Pagination pageResponseDTO={pageResponse} />}

        {/* 모달 */}
        {modalImage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative max-w-2xl w-full">
              <img
                src={modalImage}
                alt="리뷰 확대 이미지"
                className="w-full h-auto object-contain rounded"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-300 text-2xl cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewListComponent;
