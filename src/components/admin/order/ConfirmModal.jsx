import React from "react";

const ConfirmModal = ({
  confirmModalData,
  requestStatus,
  onConfirm,
  onClose,
}) => {
  const getOrderStatusName = (status) => {
    switch (status) {
      case "PENDING_PAYMENT":
        return "주문접수";
      case "PAID":
        return "결제완료";
      case "PREPARING":
        return "배송준비중";
      case "SHIPPING":
        return "배송중";
      case "DELIVERED":
        return "배송완료";
      case "RETURN_REQUESTED":
        return "반품/환불 신청";
      case "RETURNED":
        return "반품/환불 완료";
      default:
        return status; // 정의되지 않은 상태는 그대로 반환
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[22rem]">
        <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span className="text-orange-500">⚠️</span> 상태 변경 확인
        </h3>

        <div className="space-y-3 mb-6">
          <p className="text-gray-600">
            주문 상태를{" "}
            <span className="font-bold text-blue-600 underline underline-offset-4">
              [{getOrderStatusName(requestStatus)}]
            </span>
            (으)로 변경하시겠습니까?
          </p>

          {/* 강조 문구 구역 */}
          <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
            <p className="text-sm text-orange-800 leading-relaxed">
              <strong>안내:</strong> 이 변경은 해당 주문(번호:{" "}
              {confirmModalData?.orderNumber})에 포함된
              <span className="font-bold text-orange-600">
                {" "}
                모든 상품의 상태
              </span>
              에 동일하게 적용됩니다.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium transition"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(confirmModalData, requestStatus)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm transition"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
