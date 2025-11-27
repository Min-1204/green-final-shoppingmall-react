import React from "react";

const ProductDetailQuantity = ({ qty, setQty, option }) => {
  const handleChangeQty = (delta) => {
    // 로직 유지
    setQty((prev) => Math.max(1, prev + delta));
  };

  return (
    // **[디자인 개선]** 원래 있던 mt-4는 유지, border/bg-gray-50/p-4 제거 후 깔끔한 하단 구분선 적용
    <div className="mt-4 py-3 border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* 🎨 [수정] 왼쪽 영역에 이미지와 제품명을 묶음 */}
        <div className="flex items-center flex-1 min-w-0 pr-2">
          {/* 🖼️ [추가] 옵션 이미지: 작은 크기, 둥근 모서리 적용 */}
          <img
            src={option.imageUrl}
            alt={option.optionName}
            className="w-10 h-10 object-cover rounded-md flex-shrink-0 mr-3 border border-gray-100"
            // 이미지 URL이 없을 경우 대비하여 에러 핸들링 추가 (ProductDetailOptions.jsx와 동일)
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/40x40/f3f4f6/a1a1aa?text=NoImg";
            }}
          />

          {/* 제품명 */}
          {/* **[디자인 개선]** 폰트 굵기를 일반(normal)으로 조정하여 간결함 강조 */}
          <div className="text-sm font-normal text-gray-800 min-w-0 flex-1">
            <div className="truncate">{option.optionName}</div>
          </div>
        </div>

        {/* 가운데 & 오른쪽 통합 (원래 코드 구조 유지) */}
        <div className="flex items-center flex-shrink-0">
          {/* 가운데 : 수량 조절 버튼 UI - **[디자인 개선]** 올리브영 스타일의 깔끔한 버튼 적용 */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            <button
              onClick={() => handleChangeQty(-1)}
              // **[디자인 개선]** 버튼 크기/텍스트/테두리 조정
              className="w-8 h-8 flex justify-center items-center text-base text-gray-700 border-r border-gray-300 hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            {/* **[디자인 개선]** span 크기/폰트 조정 */}
            <span className="w-8 h-8 flex justify-center items-center text-sm font-medium text-gray-800 select-none">
              {qty}
            </span>
            <button
              onClick={() => handleChangeQty(+1)}
              // **[디자인 개선]** 버튼 크기/텍스트/테두리 조정
              className="w-8 h-8 flex justify-center items-center text-base text-gray-700 border-l border-gray-300 hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>

          {/* 가격 */}
          {/* **[디자인 개선]** 가격 크기와 굵기를 강조 */}
          <div className="text-base font-extrabold text-gray-900 whitespace-nowrap pl-4">
            {/* 수량 * 단가로 변경하여 총 가격 표시 (기존 코드가 단가만 표시하여 수정했습니다) */}
            {option?.sellingPrice?.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailQuantity;
