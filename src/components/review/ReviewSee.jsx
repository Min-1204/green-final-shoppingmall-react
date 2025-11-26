import { useEffect, useState } from "react";

const ReviewSee = ({ closeModal, review }) => {
  console.log("리뷰 보기 => ", review);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [images] = useState([1, 2, 3, 4, 5]); // 임시 이미지 데이터

  // 임시 상품 정보
  const productName = "스트라이덱스";
  const productOption = "[여드름/좁쌀] 스트라이덱스 맥스플러스패드 55매";
  const productPrice = "₩12,900";
  const reviewDate = "2025.09.02";

  useEffect(() => {
    if (review) {
      setCurrentRating(review.rating || 0);
      setReviewContent(review.content || "");
    }
  }, [review]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-4xl h-[80vh] overflow-y-auto space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center">
          리뷰 보기
          <button
            className="text-gray-400 text-3xl cursor-pointer"
            onClick={closeModal}
          >
            ×
          </button>
        </h2>

        {/* 상품 + 별점 */}
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
            이미지
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{productName}</p>
            <p className="text-xs text-gray-500 mt-1">{productOption}</p>
            <p className="text-xs text-gray-500 mt-0.5">{productPrice}</p>

            <div className="flex items-center space-x-4 mt-2">
              {/* 별점 */}
              <div className="flex items-center space-x-1 text-[15px]">
                {[1, 2, 3, 4, 5].map((star) => {
                  let starClass = "cursor-pointer transition text-gray-300";
                  if (currentRating >= star)
                    starClass = "transition text-yellow-500";
                  return (
                    <span key={star} className={starClass}>
                      {currentRating >= star ? "★" : "☆"}
                    </span>
                  );
                })}
              </div>
              {/* 작성일자 */}
              <span className="text-gray-500 text-sm">
                작성일자: {reviewDate}
              </span>
            </div>
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="w-full border border-gray-300 rounded-lg p-3 text-sm h-50 text-gray-700 overflow-y-auto">
          {reviewContent}
        </div>

        {/* 첨부 이미지: 가로 스크롤 */}
        <div className="flex gap-4 mt-4 overflow-x-auto py-2">
          {(images.length > 0 ? images : [1, 2, 3, 4, 5]).map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 h-40 rounded-md overflow-hidden border border-gray-300 flex items-center justify-center bg-gray-100"
            >
              {images.length > 0 ? (
                <img
                  src={img}
                  alt={`attachment-${idx}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-400 text-sm">이미지</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSee;
