// src/components/user/mypage/wishlist/WishListToolbar.jsx
import React from "react";
import { ShoppingCart, Trash2, Check } from "lucide-react";

export default function WishListToolbar({
  allChecked,
  selectedCount,
  totalCount,
  onToggleAll,
  onRemoveSelected,
  onAddSelectedToCart
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onToggleAll}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                allChecked ? "bg-blue-600 border-blue-600" : "border-gray-300"
              }`}
            >
              {allChecked && <Check className="w-3 h-3 text-white" />}
            </div>
            전체선택
          </button>

          <button
            type="button"
            onClick={onAddSelectedToCart}
            disabled={selectedCount === 0}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 disabled:hover:bg-gray-300 transition-all shadow-sm disabled:shadow-none"
          >
            <ShoppingCart className="w-4 h-4" />
            장바구니 담기 ({selectedCount})
          </button>

          <button
            type="button"
            onClick={onRemoveSelected}
            disabled={selectedCount === 0}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border-2 border-red-200 text-red-600 disabled:border-gray-200 disabled:text-gray-400 hover:bg-red-50 hover:border-red-300 disabled:hover:bg-white transition-all"
          >
            <Trash2 className="w-4 h-4" />
            선택 삭제
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <span className="font-semibold text-blue-600">{selectedCount}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{totalCount}개 선택</span>
        </div>
      </div>
    </div>
  );
}
