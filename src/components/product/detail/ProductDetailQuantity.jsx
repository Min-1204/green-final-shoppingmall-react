import React from "react";

const ProductDetailQuantity = ({ qty, setQty, option }) => {
  // console.log("option", option);
  const handleChangeQty = (delta) => {
    // 로직 유지
    setQty((prev) => {
      const nextQty = prev + delta;

      // 1. 최소 수량 체크 (1 미만 방지)
      if (nextQty < 1) return 1;

      // 2. 재고 수량 체크
      if (nextQty > option.currentStock) {
        alert(`죄송합니다. 현재 남은 재고는 ${option.currentStock}개입니다.`);
        return prev;
      }

      return nextQty;
    });
  };

  return (
    <div className="mt-4 py-3 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0 pr-2">
          {/*  옵션 이미지*/}
          {option?.imageUrl && (
            <img
              src={option.imageUrl}
              alt={option.optionName}
              className="w-10 h-10 object-cover rounded-md flex-shrink-0 mr-3 border border-gray-100"
              // 이미지 URL이 없을 경우 대비하여 에러 핸들링 추가
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/f3f4f6/a1a1aa?text=NoImg";
              }}
            />
          )}

          {/* 제품명 */}
          <div className="text-sm font-normal text-gray-800 min-w-0 flex-1">
            <div className="truncate">{option.optionName}</div>
          </div>
        </div>

        <div className="flex items-center flex-shrink-0">
          {/*  수량 조절 버튼  */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => handleChangeQty(-1)}
              className="w-8 h-8 flex justify-center items-center text-base text-gray-700 border-r border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="w-8 h-8 flex justify-center items-center text-sm font-medium text-gray-800 select-none">
              {qty}
            </span>
            <button
              onClick={() => handleChangeQty(+1)}
              className="w-8 h-8 flex justify-center items-center text-base text-gray-700 border-l border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          {/* 가격 */}
          <div className="text-base font-extrabold text-gray-900 whitespace-nowrap pl-4">
            {/* 수량 */}
            {option?.sellingPrice?.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailQuantity;
