// src/components/admin/posts/FaqRow.jsx
import React from "react";

// ========== 문의 유형 라벨 매핑 ==========
const INQUIRY_TYPE_LABELS = {
  DELIVERY: "배송문의",
  ORDER: "주문/결제",
  RETURN: "반품/교환/취소",
  MEMBER_INFO: "회원정보",
  MEMBER_POINT: "적립금/쿠폰",
  ETC: "기타문의",
};

// ========== 날짜 포맷팅 함수 ==========
const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// ========== FaqRow 컴포넌트 ==========
export default function FaqRow({ faq, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* 번호 */}
      <td className="px-4 py-5 text-center text-sm text-gray-400">{faq.id}</td>

      {/* 유형 */}
      <td className="px-4 py-5">
        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold border border-blue-100">
          {INQUIRY_TYPE_LABELS[faq.inquiryType] || faq.inquiryType}
        </span>
      </td>

      {/* 제목 */}
      <td className="px-4 py-5">
        <div className="text-sm font-semibold text-gray-800">{faq.title}</div>
      </td>

      {/* 작성일 */}
      <td className="px-4 py-5 text-center text-xs text-gray-500">
        {formatDate(faq.createdAt)}
      </td>

      {/* 수정일 */}
      <td className="px-4 py-5 text-center text-xs text-gray-500">
        {formatDate(faq.updatedAt)}
      </td>

      {/* 관리 버튼 */}
      <td className="px-4 py-5 text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(faq)}
            className="px-3 py-1 text-xs text-blue-600 font-bold hover:underline"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(faq.id)}
            className="px-3 py-1 text-xs text-red-600 font-bold hover:underline"
          >
            삭제
          </button>
        </div>
      </td>
    </tr>
  );
}
