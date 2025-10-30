// DeliveryCharge.jsx
import React from "react";

export default function DeliveryCharge() {
  return (
    <div className="max-w-4xl mx-auto border border-gray-200 bg-white shadow-lg mt-6">
      {/* 섹션 헤더 */}
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">배송비 설정</h2>
        {/* Chevron 아이콘 (열림 상태 가정) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>

      {/* 배송비 유형 선택 */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-3 px-4 bg-gray-50 text-sm font-medium text-gray-800">
          배송비 유형
        </div>
        <div className="w-3/4 py-3 px-4">
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryType"
                value="paid"
                className="mr-2 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="text-sm text-gray-700">유료</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryType"
                value="free"
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">무료</span>
            </label>
          </div>
        </div>
      </div>

      {/* 기본 배송비 */}
      <div className="flex border-b border-gray-200">
        <div className="w-1/4 py-3 px-4 bg-gray-50 text-sm font-medium text-gray-800">
          기본 배송비
        </div>
        <div className="w-3/4 py-3 px-4">
          <div className="flex items-center space-x-2 max-w-xs">
            <input
              type="number"
              defaultValue="3000"
              className="border border-gray-300 rounded-sm p-2 w-32 focus:ring-blue-500 focus:border-blue-500"
              aria-label="기본 배송비"
            />
            <span className="text-sm text-gray-700">원</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * 제주/도서산간 지역은 추가 배송비가 발생할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}
