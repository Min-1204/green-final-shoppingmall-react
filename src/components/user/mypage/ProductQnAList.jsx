// src/components/user/mypage/ProductQnAList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductQnAList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // 더미 데이터
  const qnaList = [
    {
      id: 1,
      product_id: 101,
      product_name: "스트라이덱스 맥스플러스패드",
      product_brand: "스트라이덱스",
      product_thumbnail:
        "https://image.oliveyoung.co.kr/uploads/images/goods/10/0000/0018/A00000018761501ko.jpg",
      product_price: 15900,
      title: "Q. 재입고 언제 되나요?",
      content: "블랙 색상이 품절인데 재입고 예정이 있나요?",
      is_secret: false,
      is_answered: false,
      answer_content: null,
      created_at: "2025-11-03",
      answer_created_at: null
    },
    {
      id: 2,
      product_id: 102,
      product_name: "토론숲 로얄리 크라이먼 물라젠크림",
      product_brand: "토론숲",
      product_thumbnail:
        "https://image.oliveyoung.co.kr/uploads/images/goods/10/0000/0017/A00000017638510ko.jpg",
      product_price: 24900,
      title: "Q. 물이 강한가요?",
      content: "수분감이 어느 정도인지 궁금합니다.",
      is_secret: true,
      is_answered: false,
      answer_content: null,
      created_at: "2025-11-02",
      answer_created_at: null
    },
    {
      id: 3,
      product_id: 101,
      product_name: "스트라이덱스 맥스플러스패드",
      product_brand: "스트라이덱스",
      product_thumbnail:
        "https://image.oliveyoung.co.kr/uploads/images/goods/10/0000/0018/A00000018761501ko.jpg",
      product_price: 15900,
      title: "Q. 유통기한 문의 드려요",
      content: "유통기한이 얼마나 남았나요?",
      is_secret: false,
      is_answered: true,
      answer_content: "2026년 12월까지입니다.",
      created_at: "2025-11-02",
      answer_created_at: "2025-11-02"
    },
    {
      id: 4,
      product_id: 103,
      product_name: "토론숲 사우나진향 솔트스크럽",
      product_brand: "토론숲",
      product_thumbnail:
        "https://image.oliveyoung.co.kr/uploads/images/goods/10/0000/0015/A00000015241212ko.jpg",
      product_price: 19900,
      title: "Q. 지성 피부에 괜찮나요?",
      content: "지성 피부에 맞는 제품인가요?",
      is_secret: false,
      is_answered: true,
      answer_content: "네, 지성 피부에도 적합합니다.",
      created_at: "2025-10-30",
      answer_created_at: "2025-10-30"
    }
  ];

  // 상품 상세 페이지로 이동
  const handleGoToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // 문의 상세보기 (추후 모달 또는 상세 페이지 연결)
  const handleViewDetail = (qna) => {
    console.log("문의 상세:", qna);
    // TODO: 모달 또는 상세 페이지 구현
  };

  return (
    <div className="w-full bg-white">
      <div className="px-8 pt-6 pb-8">
        {/* 누적 문의 건수 */}
        <h3 className="text-ml text-gray-800 font-semibold mb-6">
          누적 상품 문의 <span className="text-red-500">{qnaList.length}</span>{" "}
          건
        </h3>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-12 gap-4 py-3 border-b border-zinc-200 text-sm text-zinc-600">
          <div className="col-span-6 pl-2">상품</div>
          <div className="col-span-3">문의</div>
          <div className="col-span-3"></div>
        </div>

        {/* 문의 목록 */}
        <div className="divide-y divide-zinc-200">
          {qnaList.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-6 items-start hover:bg-zinc-50 transition"
            >
              {/* 상품 정보 */}
              <div className="col-span-6 flex gap-4">
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleGoToProduct(item.product_id)}
                >
                  <img
                    src={item.product_thumbnail}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded border hover:opacity-80 transition"
                  />
                </div>
                <div className="flex-1">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleGoToProduct(item.product_id)}
                  >
                    <p className="text-xs text-zinc-500 mb-1">
                      {item.product_brand}
                    </p>
                    <p className="font-medium text-sm mb-1 hover:underline">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-zinc-700">
                      {item.product_price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>

              {/* 문의 정보 */}
              <div className="col-span-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.is_answered
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.is_answered ? "답변완료" : "답변대기"}
                  </span>
                  {item.is_secret && (
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      🔒
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-700 font-medium mb-1 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {item.content}
                </p>
              </div>

              {/* 작성일자 및 버튼 */}
              <div className="col-span-3 flex flex-col items-end gap-2">
                <div className="text-xs text-zinc-500 text-right">
                  <div>작성일자 {item.created_at}</div>
                  {item.is_answered && item.answer_created_at && (
                    <div>답변일자 {item.answer_created_at}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetail(item)}
                    className="px-4 py-1.5 text-xs border border-zinc-300 rounded hover:bg-zinc-50 cursor-pointer"
                  >
                    상세보기
                  </button>
                  {!item.is_answered && (
                    <button
                      onClick={() => console.log("문의 삭제:", item.id)}
                      className="px-4 py-1.5 text-xs border border-red-300 text-red-600 rounded hover:bg-red-50 cursor-pointer"
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-zinc-300 rounded text-sm hover:bg-zinc-50 disabled:opacity-50"
          >
            이전
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded text-sm">
            {currentPage}
          </button>
          <button className="px-4 py-2 border border-zinc-300 rounded text-sm hover:bg-zinc-50">
            2
          </button>
          <button className="px-4 py-2 border border-zinc-300 rounded text-sm hover:bg-zinc-50">
            3
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-2 border border-zinc-300 rounded text-sm hover:bg-zinc-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductQnAList;
