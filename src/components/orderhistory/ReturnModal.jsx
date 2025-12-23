import { useState } from "react";

export default function ReturnModal({
  selectedOrder,
  item,
  onConfirm,
  closeModal,
}) {
  // 반품 사유 상태(선택한 사유)
  const [selectedReason, setSelectedReason] = useState("");
  // 반품 사유 상태(직접 입력한 사유)
  const [customReason, setCustomReason] = useState("");

  const totalItemsCount = selectedOrder.orderProducts?.length || 1;
  const isMultiple = totalItemsCount > 1;

  // 사유 입력 확인 후 컨펌 호출
  const handleConfirmClick = () => {
    let finalReason = selectedReason;

    if (selectedReason === "기타") {
      finalReason = customReason;
    }

    if (!finalReason.trim()) {
      alert("반품 사유를 입력하거나 선택해 주세요.");
      return;
    }

    // 부모 컴포넌트의 handleChangeStatus 호출
    onConfirm(selectedOrder.id, finalReason);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* 헤더 */}
        <div className="p-6 text-center border-b border-gray-50">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            반품/환불 신청 안내
          </h2>
        </div>

        {/* 본문 내용 */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            고객님, 신청하신 상품을 포함하여{" "}
            <span className="font-bold text-orange-600">주문 건 전체 반품</span>
            으로 접수됩니다. 상품 상태를 확인하신 후 신청해 주세요.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
            <div className="flex items-start gap-3">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-12 h-12 rounded object-cover border bg-white"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {item.productName} - {item.productOptionName}
                </p>
                {isMultiple && (
                  <p className="text-xs text-blue-600 mt-1 font-semibold">
                    외 {totalItemsCount - 1}건의 상품이 함께 접수됩니다.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 반품 사유 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              반품 사유
            </label>
            <select
              className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-black outline-none bg-white"
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
                if (e.target.value !== "기타") setCustomReason("");
              }}
            >
              <option value="">사유를 선택해주세요</option>
              <option value="단순 변심">단순 변심 (배송비 고객 부담)</option>
              <option value="상품 불량/파손">상품 불량/파손</option>
              <option value="오배송">상품이 다르게 배송됨</option>
              <option value="기타">기타 (직접 입력)</option>
            </select>

            {selectedReason === "기타" && (
              <textarea
                className="w-full p-3 border rounded-xl text-sm mt-2 outline-none focus:ring-2 focus:ring-black min-h-[100px]"
                placeholder="상세한 반품 사유를 입력해주세요."
                value={customReason}
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
            onClick={handleConfirmClick}
          >
            반품 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
