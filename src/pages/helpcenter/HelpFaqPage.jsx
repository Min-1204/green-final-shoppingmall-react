import React, { useState, useEffect } from "react";
// 관리자 페이지에서 사용했던 API를 가져옵니다 (필요시 경로 조정)
import { faqListApi } from "../../api/admin/posts/faqApi";

// DB의 영문 카테고리 값을 한글로 매핑하기 위한 객체
const INQUIRY_TYPE_LABELS = {
  DELIVERY: "배송관련",
  ORDER: "주문/결제",
  RETURN: "반품/교환/취소",
  MEMBER_INFO: "회원관련",
  MEMBER_POINT: "적립금/쿠폰",
  ETC: "기타문의",
};

// 카테고리 탭 리스트 (표시용 한글 이름)
const faqCategories = [
  "전체",
  "회원관련",
  "주문/결제",
  "반품/교환/취소",
  "배송관련",
  "적립금/쿠폰",
  "기타문의",
];

export default function HelpFaqPage() {
  const [faqs, setFaqs] = useState([]); // DB에서 가져온 데이터를 담을 상태
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [keyword, setKeyword] = useState("");

  // 컴포넌트 마운트 시 데이터 호출
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await faqListApi();
      setFaqs(data);
    } catch (error) {
      console.error("FAQ 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 필터링 로직 (DB 필드명에 맞춰 수정: type -> inquiryType, question -> title)
  const filtered = faqs.filter((item) => {
    const categoryLabel =
      INQUIRY_TYPE_LABELS[item.inquiryType] || item.inquiryType;
    const matchCate =
      selectedCategory === "전체" ? true : categoryLabel === selectedCategory;

    const matchKeyword =
      keyword.trim() === ""
        ? true
        : item.title.toLowerCase().includes(keyword.toLowerCase());

    return matchCate && matchKeyword;
  });

  if (loading) return <div className="py-10 text-center">로딩 중...</div>;

  return (
    <div>
      {/* 1) 카테고리 탭 */}
      <div className="flex gap-6 text-sm mb-4 border-b border-gray-200 overflow-x-auto">
        {faqCategories.map((type) => {
          const on = type === selectedCategory;
          return (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`pb-2 -mb-[1px] border-b-2 transition cursor-pointer whitespace-nowrap ${
                on
                  ? "border-black text-black font-medium "
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* 2) 검색줄 */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 border border-gray-200 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="궁금하신 내용을 검색해주세요."
        />
        <button className="px-6 bg-black text-white rounded-sm text-sm hover:bg-black/80 cursor-pointer">
          검색
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">총 {filtered.length}건</p>

      {/* 4) 리스트 */}
      <div className="divide-y border-t border-gray-100">
        {filtered.length > 0 ? (
          filtered.map((faq) => (
            <div key={faq.id} className="py-3">
              <div className="flex items-start justify-between">
                <button
                  onClick={() =>
                    setActive((prev) => (prev === faq.id ? null : faq.id))
                  }
                  className="flex-1 flex items-center gap-3 text-left p-1 -m-1 cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full border border-gray-300 text-xs flex items-center justify-center text-gray-500 font-bold shrink-0">
                    Q
                  </span>
                  <span className="text-sm text-gray-900">
                    [{INQUIRY_TYPE_LABELS[faq.inquiryType] || faq.inquiryType}]{" "}
                    {faq.title}
                  </span>
                </button>
                <div className="flex items-center gap-2 ml-4 cursor-pointer">
                  <span
                    className={`text-xl text-gray-400 transition-transform ${
                      active === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </div>

              {active === faq.id && (
                <div className="pl-11 pr-4 mt-3 text-sm text-gray-600 bg-gray-50 rounded-md py-4 leading-relaxed animate-fadeIn">
                  {/* DB의 answer 필드 출력 */}
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-400 text-sm">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 mb-7 flex justify-center gap-2 text-sm">
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 cursor-not-allowed"
          disabled
        >
          «
        </button>

        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 cursor-not-allowed"
          disabled
        >
          ‹
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white">
          1
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
          2
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
          3
        </button>

        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          ›
        </button>

        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          »
        </button>
      </div>
    </div>
  );
}
