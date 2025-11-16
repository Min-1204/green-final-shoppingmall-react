import React from "react";
import { Heart, ShoppingCart, Trash2, Check } from "lucide-react";

export default function WishListRow({
  checked,
  onCheck,
  onRemove,
  onAddToCart,
  item
}) {
  const { name, subtitle, price, originalPrice, thumb } = item;

  // 할인율
  const discountRate = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      <div className="flex gap-4">
        {/* 체크박스 */}
        <div className="flex items-start pt-1">
          <button
            type="button"
            onClick={onCheck}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
              checked
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {checked && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>

        {/* 이미지 */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shrink-0 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
          {thumb ? (
            <img src={thumb} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-gray-300" />
            </div>
          )}
          {discountRate > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
              {discountRate}%
            </div>
          )}
        </div>

        {/* 상품 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* 가격 정보 */}
            <div className="mt-3 flex items-end justify-between">
              <div>
                {originalPrice && (
                  <div className="text-sm text-gray-400 line-through mb-1">
                    ₩{Number(originalPrice).toLocaleString()}
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    ₩{Number(price).toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-sm">~</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onRemove}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md font-medium text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">담기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
