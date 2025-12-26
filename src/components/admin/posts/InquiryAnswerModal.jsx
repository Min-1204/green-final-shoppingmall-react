import React from "react";

const INQUIRY_TYPES = {
  DELIVERY: "배송문의",
  ORDER: "주문/결제",
  RETURN: "반품/교환/취소",
  MEMBER_INFO: "회원정보",
  MEMBER_POINT: "적립금/쿠폰",
  ETC: "기타문의",
};

export default function InquiryAnswerModal({
  isOpen,
  onClose,
  inquiry,
  answerContent,
  setAnswerContent,
  onSave,
}) {
  if (!isOpen || !inquiry) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            1:1 문의 {inquiry.answered ? "답변 수정" : "답변 등록"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-gray-50 border rounded-xl">
            <div className="flex justify-between items-start mb-3">
              <span className="px-2 py-0.5 bg-white border border-indigo-200 text-indigo-600 text-[10px] font-bold rounded">
                {INQUIRY_TYPES[inquiry.inquiryType]}
              </span>
              <div className="text-right text-[11px] text-gray-400 space-y-0.5">
                <p>문의 작성: {new Date(inquiry.createdAt).toLocaleString()}</p>
                {inquiry.answerCreatedAt && (
                  <p className="text-blue-500 font-medium">
                    최종 답변:{" "}
                    {new Date(inquiry.answerCreatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">
              Q. {inquiry.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              {inquiry.content}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 ml-1 italic">
              A. 관리자 답변 작성
            </label>
            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              rows={8}
              className="w-full border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-blue-500 outline-none resize-none transition-all"
              placeholder="고객님께 정중한 답변을 남겨주세요..."
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm text-gray-500 hover:bg-gray-200 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            {inquiry.answered ? "수정 완료" : "답변 등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
