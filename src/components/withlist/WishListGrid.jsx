import React from "react";
import WishListRow from "./WishListRow";

export default function WishListGrid({
  items,
  selected,
  onToggleOne,
  onRemoveOne,
  onAddToCart
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <WishListRow
          key={item.id}
          checked={selected.has(item.id)}
          onCheck={() => onToggleOne(item.id)}
          onRemove={() => onRemoveOne(item.id)}
          onAddToCart={() => onAddToCart(item)}
          item={item}
        />
      ))}
    </div>
  );
}
