import { useEffect, useRef, useState } from "react";
import ReviewRatingComponent from "./ReviewRatingComponent";
import { reviewList } from "../../api/review/reviewapi";
import { Database } from "lucide-react";

const ReviewListComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // 'sort', 'option', null
  const [showComments, setShowComments] = useState({}); //리뷰 댓글의 열림/닫힘(on/off) 여부
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedOption, setSelectedOption] = useState("옵션");
  const sortRef = useRef();
  const optionRef = useRef();

  const sortOptions = ["최신순", "좋아요순", "높은별점순", "낮은별점순"];
  const options = ["옵션1", "옵션2", "옵션3", "옵션4"];

  const initialComments = [
    {
      id: 1,
      author: "판매자",
      content: "고객님, 소중한 후기 정말 감사합니다!",
      date: "1일 전",
      isSeller: true,
    },
    {
      id: 2,
      author: "유저아이디A",
      content: "저도 이거 샀는데 핏 진짜 좋아요!",
      date: "1시간 전",
      isSeller: false,
    },
    {
      id: 3,
      author: "유저아이디B",
      content: "상세 리뷰 감사합니다!",
      date: "30분 전",
      isSeller: false,
    },
  ];

  //리뷰 목록 조회
  useEffect(() => {
    const getReviews = async () => {
      const reviews = await reviewList(1);
      console.log("상품 리뷰 => ", reviews);
      setReviews(reviews);
    };
    getReviews();
  }, []);

  //정렬, 옵션 드롭다운
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setOpenDropdown((prev) => (prev === "sort" ? null : prev));
      }
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setOpenDropdown((prev) => (prev === "option" ? null : prev));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //리뷰별 댓글 열기/닫기
  const toggleComments = (reviewId) => {
    setShowComments((current) => {
      const isOpen = current[reviewId] || false; //현재 상태 확인, 없으면 false
      return {
        ...current,
        [reviewId]: !isOpen, //클릭한 리뷰만 반전
      };
    });
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full mx-auto my-6">
        <ReviewRatingComponent />

        {/* 드롭다운 영역 */}
        <div className="flex items-center space-x-3 py-4 text-sm text-gray-600">
          {/* 정렬 */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "sort" ? null : "sort")
              }
              className="px-2 py-0.5 text-xs bg-white border border-gray-300 rounded-md text-gray-700 cursor-pointer hover:border-gray-400 transition focus:outline-none flex items-center justify-between min-w-[90px]"
            >
              <span>{selectedSort}</span>
              <span className="ml-2 text-gray-600 text-lg">▾</span>
            </button>

            {openDropdown === "sort" && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs transition-colors"
                    onClick={() => {
                      setSelectedSort(option);
                      setOpenDropdown(null);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 옵션 */}
          <div className="relative" ref={optionRef}>
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "option" ? null : "option")
              }
              className="px-2 py-0.5 text-xs bg-white border border-gray-300 rounded-md text-gray-700 cursor-pointer hover:border-gray-400 transition focus:outline-none flex items-center justify-between min-w-[90px]"
            >
              <span>{selectedOption}</span>
              <span className="ml-2 text-gray-600 text-lg">▾</span>
            </button>
            {openDropdown === "option" && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden">
                {options.map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-xs transition-colors"
                    onClick={() => {
                      setSelectedOption(option);
                      setOpenDropdown(null);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 mb-4"></div>

        {/* 리뷰 목록 */}
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white pb-4 mb-4 border-b border-gray-300"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-900 font-semibold text-base">
                      {review.userName || "유저아이디"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {review.createdAt?.slice(0, 10).replace(/-/g, ".") ||
                        "날짜"}
                    </span>
                  </div>
                  <div className="text-yellow-500 text-sm">
                    <span>{"★".repeat(review.rating)}</span>
                  </div>
                </div>

                <div className="mb-2 text-sm text-gray-500">
                  <p>{review.option || "구매옵션"}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                  <div className="w-full sm:w-64 sm:flex-shrink-0">
                    <div className="aspect-square bg-gray-300 flex items-center justify-center rounded">
                      <span className="text-gray-600 text-sm">
                        리뷰 이미지 (Placeholder)
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed sm:flex-1">
                    {review.content}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-4 text-sm text-gray-500 pt-3">
                  <button className="flex items-center space-x-1 cursor-pointer hover:text-gray-900 transition duration-150">
                    <span>👍 도움이 돼요 1</span>
                  </button>

                  <button
                    onClick={() => toggleComments(review.id)}
                    className={`flex items-center space-x-1 cursor-pointer transition duration-150 ${
                      showComments[review.id]
                        ? "text-blue-600 font-semibold"
                        : "text-gray-900 hover:text-blue-600"
                    }`}
                  >
                    <span>💬 댓글 {initialComments.length}</span>
                  </button>
                </div>

                {/* 댓글 영역 (더미) */}
                {showComments[review.id] && (
                  <div className="mt-4 border-t border-gray-200 pt-3">
                    {initialComments.map((comment) => {
                      const nameColor = comment.isSeller
                        ? "text-blue-600"
                        : "text-gray-900";

                      return (
                        <div
                          key={comment.id}
                          className="py-3 border-b border-gray-100"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`${nameColor} font-semibold text-sm`}
                              >
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.date}
                              </span>
                            </div>
                            <div className="flex space-x-2 text-xs text-gray-500">
                              <button className="cursor-pointer hover:text-gray-800 transition duration-150">
                                수정
                              </button>
                              <span className="text-gray-300">|</span>
                              <button className="cursor-pointer hover:text-red-500 transition duration-150">
                                삭제
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 leading-normal">
                            {comment.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}

        {/* 페이지네이션 (임시) */}
        <div className="flex justify-center space-x-1 mt-8 pb-10 text-sm">
          <button className="px-3 py-2 text-gray-500 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
            이전
          </button>
          <button className="px-3 py-2 text-white bg-gray-800 rounded-md font-semibold shadow-md cursor-pointer transition duration-150">
            1
          </button>
          <button className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
            2
          </button>
          <button className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
            3
          </button>
          <span className="px-3 py-2 text-gray-400">...</span>
          <button className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
            10
          </button>
          <button className="px-3 py-2 text-gray-500 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-150">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewListComponent;
