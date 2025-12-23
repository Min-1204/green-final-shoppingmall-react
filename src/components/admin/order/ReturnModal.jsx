import React from "react";

const ReturnModal = ({ selectedOrder, selectedItem, onConfirm, onClose }) => {
  // 선택된 주문 정보 (데이터 구조에 따라 selectedOrder[0] 접근)
  const orderInfo = selectedOrder?.[0] || {};
  const orderNumber = orderInfo.orderNumber;

  // 선택된 상품들 중 대표 상품명 추출
  const representativeName = selectedItem[0]?.productName;
  const extraCount = selectedItem.length - 1;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-orange-500">⚠️</span> 반품/환불 처리 확정
          </h3>
        </div>

        {/* 본문 */}
        <div className="p-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              선택하신{" "}
              <span className="font-bold text-blue-600">
                [{representativeName}
                {extraCount > 0 && ` 외 ${extraCount}건`}]
              </span>{" "}
              상품을 포함하여,
              <br />
              해당 <span className="font-bold text-red-600">전체 주문</span>을
              반품/환불 완료 상태로 변경하시겠습니까?
            </p>

            {/* 강조 안내 구역 (ConfirmModal 스타일 적용) */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <p className="text-sm text-orange-800">
                <strong>주의:</strong> 이 변경은 주문번호{" "}
                <span className="font-bold">[{orderNumber}]</span>에 포함된
                <span className="font-bold text-orange-600">
                  {" "}
                  모든 상품의 상태
                </span>
                에 동일하게 적용됩니다.
              </p>
            </div>

            <p className="text-[12px] text-gray-400 text-center bg-gray-50 py-2 rounded">
              * 이 작업은 되돌릴 수 없으며, 고객에게 환불 안내가 발송될 수
              있습니다.
            </p>
          </div>
        </div>

        {/* 푸터 (버튼) */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-4 text-gray-600 hover:bg-gray-50 font-medium transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-4 bg-blue-600 text-white hover:bg-blue-700 font-bold transition shadow-inner"
          >
            반품/환불 확정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
