import { useState } from "react";

export default function CancelModal({
  selectedOrder,
  item,
  onConfirm,
  closeModal,
}) {
  // 취소 사유 상태(선택한 사유)
  const [selectedReason, setSelectedReason] = useState("");
  // 취소 사유 상태(직접 입력한 사유)
  const [customReason, setCustomReason] = useState("");
  const totalItemsCount = selectedOrder.orderProducts?.length || 1;
  const isMultiple = totalItemsCount > 1;

  // 사유 입력 확인 후 컨펌 호출
  const handleConfirmClick = () => {
    // console.log("handleComfirmClick 호출");
    if (selectedReason != "기타") {
      // 선택한 사유가 '기타'가 아니었을 때
      if (!selectedReason.trim()) {
        alert("취소 사유를 입력하거나 선택해 주세요.");
        return;
      }
      onConfirm(selectedOrder.id, selectedReason);
    } else {
      // 선택한 사유가 기타였을 때 직접 입력한 사유를 전달
      if (!customReason.trim()) {
        alert("취소 사유를 입력하거나 선택해 주세요.");
        return;
      }
      onConfirm(selectedOrder.id, customReason);
    }
  };

  // console.log("item", item);
  // console.log("selectedOrder", selectedOrder);
  // console.log("orderProducts", selectedOrder.orderProducts);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* 경고 헤더 */}
        <div className="p-6 text-center border-b border-gray-50">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.34c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            주문 전체 취소 안내
          </h2>
        </div>

        {/* 본문 내용 */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            고객님, 본 주문은 묶음 결제된 상품으로{" "}
            <span className="font-bold text-red-600">부분 취소가 불가능</span>
            합니다. 취소 시 아래 상품을 포함한 주문 건 전체가 취소됩니다.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start gap-3">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-12 h-12 rounded object-cover border"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item.productName} - {item.productOptionName}
                </p>
                {isMultiple && (
                  <p className="text-xs text-blue-600 mt-1 font-semibold">
                    외 {totalItemsCount - 1}건의 상품이 함께 취소됩니다.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 취소 사유 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              취소 사유
            </label>
            <select
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-black outline-none"
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
                // 선택한 사유가 기타가 아니면 직접 입력한 사유는 초기화
                if (selectedReason != "기타") setCustomReason("");
              }}
            >
              <option value="">사유를 선택해주세요</option>
              <option value="단순 변심">단순 변심</option>
              <option value="주문 정보 실수">
                주문 정보 실수 (옵션/배송지 등)
              </option>
              <option value="재결제 예정">취소 후 재결제</option>
              <option value="기타">기타 (직접 입력)</option>
            </select>

            {selectedReason === "기타" && (
              <textarea
                className="w-full p-3 border rounded-xl text-sm mt-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="상세한 취소 사유를 입력해주세요."
                onChange={(e) => setCustomReason(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-2 p-4 bg-gray-50">
          <button
            className="flex-1 py-3 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            onClick={closeModal}
          >
            돌아가기
          </button>
          <button
            className="flex-1 py-3 text-sm font-semibold text-white bg-[#111] rounded-xl hover:bg-black transition-colors shadow-lg shadow-black/10"
            onClick={() => handleConfirmClick()}
          >
            전체 취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
