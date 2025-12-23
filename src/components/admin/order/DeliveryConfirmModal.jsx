import React from "react";

const DeliveryConfirmModal = ({ selectedCount, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center mb-4 text-orange-600">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-xl font-bold">출고 처리 확인</h3>
        </div>

        <div className="mb-6 text-gray-600 space-y-2">
          <p>
            현재{" "}
            <span className="font-bold text-blue-600">{selectedCount}개</span>의
            상품이 선택되었습니다.
          </p>
          <p className="bg-orange-50 p-3 rounded-md text-sm text-orange-800 border border-orange-100">
            <strong>주의:</strong> 선택한 상품이 포함된 주문 건의{" "}
            <strong>모든 상품</strong>이 함께 배송준비중(출고) 상태로
            변경됩니다.
          </p>
          <p>계속하시겠습니까?</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
          >
            변경 확정
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmModal;
