import React from "react";

const InquiryReadCard = ({
  inquiry,
  isOpened,
  onToggle,
  onStartEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  inquiry.answered
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {inquiry.answered ? "✓ 답변완료" : "⏱ 답변대기"}
              </span>
              <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs">
                {inquiry.inquiryTypeName}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {inquiry.title}
            </h3>
            <div className="text-sm text-slate-500">
              {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")} |
              문의번호 #{inquiry.id}
            </div>
          </div>

          {/* 토글*/}
          <div
            className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform ${
              isOpened ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 상세 내용 */}
      {isOpened && (
        <div className="border-t border-slate-100 bg-slate-50 p-6">
          <div className="flex justify-between mb-4">
            <h4 className="font-semibold">문의 내용</h4>
            <div className="flex gap-2">
              {/* 답변 완료되지 않은 경우만 수정 가능 */}
              {!inquiry.answered && (
                <button
                  onClick={(e) => {
                    onStartEdit();
                  }}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
                >
                  ✏️ 수정
                </button>
              )}
              <button
                onClick={(e) => {
                  onDelete();
                }}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50"
              >
                🗑️ 삭제
              </button>
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="bg-white rounded-xl p-5 border">
            <p className="whitespace-pre-wrap">{inquiry.content}</p>
          </div>

          {/* 답변 */}
          {inquiry.answered && inquiry.answerContent ? (
            <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  CS
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-2">고객센터</div>
                  <p className="whitespace-pre-wrap">{inquiry.answerContent}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  ⏱
                </div>
                <div>
                  <p className="font-semibold text-yellow-900">
                    답변 대기 중입니다
                  </p>
                  <p className="text-sm text-yellow-700">
                    빠른 시일 내에 답변드리겠습니다!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InquiryReadCard;
