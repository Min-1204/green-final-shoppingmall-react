// src/components/user/mypage/InquiriesList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InquiriesList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // 더미 데이터
  const inquiries = [
    {
      id: 1,
      title: "[회원] 휴대폰 번호 변경하고 싶어요.",
      inquiry_type: "회원정보",
      content: "휴대폰 번호를 변경하고 싶습니다. 어떻게 해야 하나요?",
      is_answered: false,
      agree_email_contact: true,
      agree_sms_contact: false,
      created_at: "2025-11-03",
      answer_content: null,
      answer_created_at: null
    },
    {
      id: 2,
      title: "[배송] 배송지 주소를 잘못 입력했어요. 수정 가능할까요?",
      inquiry_type: "배송문의",
      content: "배송지 주소를 잘못 입력했습니다. 수정 가능한가요?",
      is_answered: false,
      agree_email_contact: true,
      agree_sms_contact: true,
      created_at: "2025-11-02",
      answer_content: null,
      answer_created_at: null
    },
    {
      id: 3,
      title: "[결제] 현금영수증 다시 발급 받을 수 있나요?",
      inquiry_type: "주문/결제",
      content: "현금영수증을 다시 받고 싶습니다.",
      is_answered: true,
      agree_email_contact: false,
      agree_sms_contact: true,
      created_at: "2025-11-02",
      answer_content: "네, 가능합니다. 고객센터로 연락주세요.",
      answer_created_at: "2025-11-02"
    },
    {
      id: 4,
      title: "[쿠폰] 장바구니 쿠폰이 결제창에서 안 보여요.",
      inquiry_type: "적립금/쿠폰",
      content: "장바구니에 쿠폰이 안 보입니다.",
      is_answered: true,
      agree_email_contact: true,
      agree_sms_contact: false,
      created_at: "2025-11-01",
      answer_content: "쿠폰 사용 조건을 확인해주세요.",
      answer_created_at: "2025-11-01"
    },
    {
      id: 5,
      title: "[환불] 부분환불 진행 상황 확인하고 싶어요.",
      inquiry_type: "반품/교환/취소",
      content: "부분환불이 진행되고 있는지 궁금합니다.",
      is_answered: true,
      agree_email_contact: true,
      agree_sms_contact: true,
      created_at: "2025-11-01",
      answer_content: "3일 내로 처리됩니다.",
      answer_created_at: "2025-11-01"
    }
  ];

  // 문의 상세보기 (추후 모달 또는 상세 페이지 연결)
  const handleViewDetail = (inquiry) => {
    console.log("문의 상세:", inquiry);
    // TODO: 모달 또는 상세 페이지 구현
  };

  // 새 문의 작성하기
  const handleWriteInquiry = () => {
    navigate("/helpcenter/inquiry");
  };

  return (
    <div className="w-full bg-white">
      <div className="px-8 pt-6 pb-8">
        {/* 누적 문의 건수 */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-ml text-gray-800 font-semibold">
            누적 1:1 문의{" "}
            <span className="text-red-500">{inquiries.length}</span> 건
          </h3>
          <button
            onClick={handleWriteInquiry}
            className="px-4 py-2 bg-slate-900 text-white text-sm rounded hover:bg-slate-800"
          >
            문의하기
          </button>
        </div>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-12 gap-4 py-3 border-b border-zinc-200 text-sm text-zinc-600">
          <div className="col-span-2 pl-2">문의유형</div>
          <div className="col-span-7">문의내용</div>
          <div className="col-span-3"></div>
        </div>

        {/* 문의 목록 */}
        <div className="divide-y divide-zinc-200">
          {inquiries.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-6 items-start hover:bg-zinc-50 transition"
            >
              {/* 문의유형 */}
              <div className="col-span-2 pl-2">
                <span className="inline-block px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
                  {item.inquiry_type}
                </span>
              </div>

              {/* 문의 정보 */}
              <div className="col-span-7">
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
                  {item.agree_sms_contact && (
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      SMS
                    </span>
                  )}
                  {item.agree_email_contact && (
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      Email
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-900 font-medium mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {item.content}
                </p>
                {item.is_answered && item.answer_content && (
                  <div className="mt-2 pl-3 border-l-2 border-green-200">
                    <p className="text-xs text-green-700 font-medium mb-0.5">
                      답변
                    </p>
                    <p className="text-xs text-zinc-600 line-clamp-2">
                      {item.answer_content}
                    </p>
                  </div>
                )}
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

export default InquiriesList;
