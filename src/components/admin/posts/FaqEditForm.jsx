import React from "react";

const INQUIRY_TYPE_OPTIONS = [
  { value: "DELIVERY", label: "배송문의" },
  { value: "ORDER", label: "주문/결제" },
  { value: "RETURN", label: "반품/교환/취소" },
  { value: "MEMBER_INFO", label: "회원정보" },
  { value: "MEMBER_POINT", label: "적립금/쿠폰" },
  { value: "ETC", label: "기타문의" }
];

export default function FaqEditForm({
  formData,
  setFormData,
  onSave,
  onCancel
}) {
  return (
    <tr className="bg-blue-50">
      <td colSpan="6" className="px-8 py-6 border-y border-blue-200">
        <div className="space-y-4 max-w-5xl mx-auto">
          <h4 className="text-sm font-bold text-gray-800 mb-3">FAQ 수정</h4>

          <div className="flex gap-3">
            <select
              value={formData.inquiryType}
              onChange={(e) =>
                setFormData({ ...formData, inquiryType: e.target.value })
              }
              className="border border-gray-300 p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
            >
              {INQUIRY_TYPE_OPTIONS.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="질문 제목"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="flex-1 border border-gray-300 p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              답변 내용
            </label>
            <textarea
              placeholder="답변 내용"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              rows={6}
              className="w-full border border-gray-300 p-3 rounded-lg text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              수정 완료
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
