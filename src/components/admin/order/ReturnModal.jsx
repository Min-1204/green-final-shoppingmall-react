import React from "react";

const ReturnModal = ({ selectedOrder, selectedItem, onConfirm, onClose }) => {
  // 1. 선택된 상품들이 속한 고유한 주문번호 목록 추출 (중복 제거)
  // 이미지 데이터 구조상 item.orderNumber가 존재하므로 이를 활용합니다.
  const uniqueOrderNumbers = [
    ...new Set(selectedItem.map((item) => item.orderNumber)),
  ];

  const orderCount = uniqueOrderNumbers.length;
  const representativeOrderNumber = uniqueOrderNumbers[0];

  // 2. 대표 상품명 및 수량 설정
  const representativeProductName = selectedItem[0]?.productName;
  const totalItemCount = selectedItem.length;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-orange-500">⚠️</span> 반품/환불 일괄 확정
          </h3>
        </div>

        {/* 본문 */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-2">
                선택하신{" "}
                <span className="font-bold text-blue-600">
                  {totalItemCount}개
                </span>
                의 상품(
                <span className="text-sm font-medium">
                  {representativeProductName} {totalItemCount > 1 && "외"}
                </span>
                )에 대하여
              </p>
              <p>
                연결된{" "}
                <span className="font-bold text-red-600">
                  총 {orderCount}건의 주문 전체
                </span>
                를 반품/환불 완료 상태로 변경하시겠습니까?
              </p>
            </div>

            {/* 강조 안내 구역: 여러 주문번호 대응 */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <div className="text-sm text-orange-800 space-y-1">
                <p>
                  <strong>주의:</strong> 선택 상품이 포함된 아래 주문의
                </p>
                <p className="font-bold text-orange-600 underline decoration-orange-300">
                  모든 구성 상품이 함께 처리됩니다.
                </p>
                <div className="mt-2 pt-2 border-t border-orange-200 text-[13px]">
                  <span className="font-semibold text-gray-700">
                    대상 주문번호:
                  </span>
                  <div className="mt-1 text-gray-600">
                    {orderCount > 1
                      ? `${representativeOrderNumber} 외 ${orderCount - 1}건`
                      : representativeOrderNumber}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[12px] text-gray-400 text-center">
              * 각 주문에 포함된 미선택 상품들도 모두 함께 처리됩니다.
            </p>
          </div>
        </div>

        {/* 푸터 (버튼) */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-4 text-gray-600 hover:bg-gray-50 font-medium transition cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-4 bg-blue-600 text-white hover:bg-blue-700 font-bold transition shadow-inner cursor-pointer"
          >
            일괄 확정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnModal;
