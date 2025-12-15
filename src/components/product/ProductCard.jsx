import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const price = Math.min(...product.options.map((o) => o.sellingPrice));

  const handleClickDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="group cursor-pointer relative bg-white border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:border-gray-400"
      onClick={handleClickDetail}
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-gray-50 mb-2">
        <img
          src={product.mainImages[0].imageUrl}
          alt="썸네일 이미지"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* 찜 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute bottom-2 right-2 p-1 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          {liked ? (
            <AiFillHeart className="text-red-500 text-xl" />
          ) : (
            <AiOutlineHeart className="text-gray-500 text-xl" />
          )}
        </button>
      </div>

      {/* 상품 정보 */}
      <div className="px-2 pb-3">
        {/* 브랜드 */}
        <p className="text-xs text-gray-500 font-normal mb-0.5 truncate">
          {product.brand.name}
        </p>

        {/* 상품명 */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.basicInfo.productName}
        </h3>

        {/* 가격 영역 */}
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
              {price.toLocaleString()}
              <span className="text-sm font-medium">원~</span>
            </p>
          )}

          {/* 할인 정보가 있을 경우 */}
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
