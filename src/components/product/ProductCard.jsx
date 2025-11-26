import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleClickDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    // **[디자인 개선]** 그림자 제거, 심플한 테두리 및 둥근 모서리 조정
    <div
      className="group cursor-pointer relative bg-white border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:border-gray-400"
      onClick={handleClickDetail}
    >
      {/* 이미지 영역 */}
      {/* **[디자인 개선]** 모서리 조정, 그림자 제거 */}
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-gray-50 mb-2">
        <img
          src={product.mainImages[0].imageUrl}
          alt="썸네일 이미지"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* 찜 버튼 - **[위치 및 디자인 수정]** */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          // **[위치]** 오른쪽 하단으로 이동 (bottom-2, right-2)
          // **[디자인]** 배경을 불투명 흰색으로, 아이콘을 강조하여 올리브영 스타일로 변경
          className="absolute bottom-2 right-2 p-1 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          {liked ? (
            <AiFillHeart className="text-red-500 text-xl" />
          ) : (
            // **[디자인]** 기본 상태 아이콘 색상을 검은색 테두리로 시인성 확보
            <AiOutlineHeart className="text-gray-500 text-xl" />
          )}
        </button>
      </div>

      {/* 상품 정보 */}
      {/* **[디자인 개선]** 패딩 조정 */}
      <div className="px-2 pb-3">
        {/* 브랜드 */}
        <p className="text-xs text-gray-500 font-normal mb-0.5 truncate">
          {product.brand.name}
        </p>

        {/* 상품명 */}
        {/* **[디자인 개선]** 폰트 굵기 조정 (semibold로 더 강조) */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.basicInfo.productName}
        </h3>

        {/* 가격 영역 */}
        {/* **[핵심 수정]** 가운데 정렬 유지, 상단 구분선 제거 */}
        <div className="text-center pt-2">
          {/* 단일 가격 */}
          {product.options.length === 1 && (
            <p className="text-base font-extrabold text-gray-900">
              {product.options[0].sellingPrice.toLocaleString()}
              <span className="text-sm font-medium">원</span>
            </p>
          )}

          {/* 옵션 최저가 */}
          {product.options && product.options.length > 1 && (
            <p className="text-base font-extrabold text-gray-900">
              {product.options[0].sellingPrice.toLocaleString()}
              <span className="text-sm font-medium">원~</span>
            </p>
          )}

          {/* 할인 정보가 있을 경우 - 기존 로직/주석 유지 */}
          {/* <div className="flex items-center gap-2 justify-center">
            <span className="text-base font-bold text-red-500">
              {product.discountRate}%
            </span>
            <p className="text-base font-bold text-gray-900">
              {product.discountPrice.toLocaleString()}
              <span className="text-sm font-normal">원</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 line-through mt-0.5">
            {product.price.toLocaleString()}원
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
