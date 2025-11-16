import { useMemo, useState } from "react";
import WishListEmpty from "./WishListEmpty";
import WishListToolbar from "./WishListToolbar";
import WishListGrid from "./WishListGrid";

export default function WishListContainer() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "밀잇",
      subtitle: "밀잇 식단관리 단백질쉐이크 40g 7종 택1",
      originalPrice: 5900,
      price: 3900,
      thumb: ""
    },
    {
      id: 2,
      name: "메디힐",
      subtitle:
        "[매] 메디힐 램핑 세럼 마스크 6종 택1 (마데카소사이드, PDRN, 콜라겐, 비타민C, 히알루론산, 티트)",
      originalPrice: 3000,
      price: 1440,
      thumb: ""
    },
    {
      id: 3,
      name: "보다나",
      subtitle: "[브러쉬 무선 고데기] 보다나 이지업 헤어 스타일러 파우더핑크",
      originalPrice: 109000,
      price: 89900,
      thumb: ""
    }
  ]);

  const [selected, setSelected] = useState(new Set());

  const allChecked = useMemo(
    () => items.length > 0 && selected.size === items.length,
    [items, selected]
  );

  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(items.map((i) => i.id)));
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeSelected = () => {
    if (selected.size === 0) return;
    setItems((prev) => prev.filter((it) => !selected.has(it.id)));
    setSelected(new Set());
    alert("선택한 상품이 찜목록에서 삭제되었습니다.");
  };

  const removeOne = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    alert("상품이 찜목록에서 삭제되었습니다.");
  };

  const handleAddToCart = (item) => {
    alert(`"${item.name}" 상품을 장바구니에 담는 기능은 개발 중입니다.`);
  };

  const addSelectedToCart = () => {
    if (selected.size === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    const selectedCount = selected.size;
    setSelected(new Set());
    alert(`${selectedCount}개 상품을 장바구니에 담는 기능은 개발 중입니다.`);
  };

  if (items.length === 0) return <WishListEmpty />;

  return (
    <div>
      <div className="mb-4">
        <WishListToolbar
          allChecked={allChecked}
          selectedCount={selected.size}
          totalCount={items.length}
          onToggleAll={toggleAll}
          onRemoveSelected={removeSelected}
          onAddSelectedToCart={addSelectedToCart}
        />
      </div>

      <WishListGrid
        items={items}
        selected={selected}
        onToggleOne={toggleOne}
        onRemoveOne={removeOne}
        onAddToCart={handleAddToCart}
      />

      <div className="mt-8 flex justify-center gap-2">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 bg-white"
          disabled
        >
          «
        </button>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 bg-white"
          disabled
        >
          ‹
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium shadow-sm">
          1
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 bg-white transition-colors">
          2
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 bg-white transition-colors">
          3
        </button>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 bg-white transition-colors"
        >
          ›
        </button>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 bg-white transition-colors"
        >
          »
        </button>
      </div>
    </div>
  );
}
