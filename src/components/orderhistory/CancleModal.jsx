export default function CancelModal({
  selectedOrder,
  item,
  onConfirm,
  closeModal,
}) {
  // orderProductGroup: 해당 주문 번호에 묶인 전체 상품 리스트 (배열)
  const totalItemsCount = selectedOrder.orderProducts?.length || 1;
  const isMultiple = totalItemsCount > 1;

  console.log("item", item);
  console.log("selectedOrder", selectedOrder);
  console.log("orderProducts", selectedOrder.orderProducts);

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

          <p className="text-[12px] text-gray-400 mt-4 text-center">
            취소 완료 후, 필요한 상품만 장바구니에 담아 다시 결제해 주세요.
          </p>
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
            onClick={() => onConfirm(selectedOrder.id)}
          >
            전체 취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
