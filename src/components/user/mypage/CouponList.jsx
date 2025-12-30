import React from "react";

export default function CouponList({ coupons }) {
  return (
    <div className="space-y-3">
      {coupons.map((c) => (
        <div
          key={c?.id}
          className="border border-gray-400 rounded-xl p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{c?.coupon?.couponName}</p>
            <p className="bg-zinc-100 text-sm px-3 py-1 mb-1 mt-1 rounded-full w-fit">
              {c?.coupon?.couponDescription}
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              {c?.coupon?.validTo
                ? `유효기간: ${c.coupon.validTo.split("T")[0]} 까지`
                : `유효기간: 평생`}
            </p>
          </div>
          <span className="text-xs bg-zinc-100 px-3 py-1 rounded-full">
            {c?.coupon?.hasLimitMinOrder
              ? `${c?.coupon?.minOrderAmount?.toLocaleString()}원 이상 결제시 할인`
              : `최소금액 제한 없음`}
          </span>
        </div>
      ))}
    </div>
  );
}
