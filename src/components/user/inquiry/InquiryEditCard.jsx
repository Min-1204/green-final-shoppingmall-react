import React from "react";

const InquiryEditCard = ({
  inquiry,
  formData,
  onFormChange,
  onSave,
  onCancel,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              ✏️
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">수정 모드</h3>
              <p className="text-sm text-slate-600">문의번호 #{inquiry.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"
            >
              💾 저장
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
            >
              ✕ 취소
            </button>
          </div>
        </div>
      </div>

      {/* 수정 폼 */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            제목
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onFormChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            문의 유형
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={onFormChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">선택하세요</option>
            <option value="DELIVERY">배송문의</option>
            <option value="ORDER">주문문의</option>
            <option value="RETURN">반품/교환</option>
            <option value="MEMBER_INFO">회원정보</option>
            <option value="MEMBER_POINT">포인트</option>
            <option value="ETC">기타</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            문의 내용
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={onFormChange}
            rows={8}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="문의 내용을 입력하세요"
          />
        </div>

        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
          <p className="text-sm font-medium text-slate-700 mb-2">알림 설정</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="emailAgreement"
              checked={formData.emailAgreement}
              onChange={onFormChange}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">
              이메일로 답변 알림 받기
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="smsAgreement"
              checked={formData.smsAgreement}
              onChange={onFormChange}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">SMS로 답변 알림 받기</span>
          </label>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={onDelete}
            className="w-full px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-100 font-medium"
          >
            🗑️ 이 문의 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryEditCard;
