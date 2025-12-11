import React, { useEffect, useState } from "react";
import { getUserCoupons } from "../../api/coupon/couponApi";

const CouponModal = ({ onClose, onSelect, userId, totalPrice }) => {
  const [coupons, setCoupons] = useState([]);

  // console.log("userId 제대로 전달되는지", userId);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getUserCoupons(userId);
      console.log("data", data);
      setCoupons(data);
    };
    fetchCoupons();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-80 shadow">
        <h3 className="font-semibold text-lg mb-4">보유 쿠폰</h3>

        {coupons &&
          coupons.map((coupon) => {
            // 1. 쿠폰 선택 가능 여부 판단
            const isLimit = coupon.coupon.hasLimitMinOrder === true;
            const isMetMinOrder =
              isLimit && totalPrice >= coupon.coupon.minOrderAmount;
            const isSelectable = !isLimit || isMetMinOrder;

            // 2. 선택 불가능한 쿠폰에 적용할 스타일
            const itemClass = `border p-3 rounded mb-2 ${
              isSelectable
                ? "cursor-pointer hover:bg-gray-50"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`;

            return (
              <div
                key={coupon.coupon.id}
                className={itemClass}
                onClick={() => {
                  if (isSelectable) {
                    onSelect(coupon);
                  }
                }}
              >
                <div className="font-medium">{coupon.coupon.couponName}</div>
                {!isMetMinOrder && (
                  <div>최소 주문 금액 : {coupon.coupon.minOrderAmount}</div>
                )}
                {isMetMinOrder &&
                  ((coupon.coupon.discountType == "FIXED" && (
                    <>
                      <div>
                        최소 주문 금액 :{" "}
                        {coupon.coupon.minOrderAmount.toLocaleString()}원
                      </div>
                      <div className="text-[#ff5c00] font-bold">
                        - {coupon.coupon.fixedDiscountAmount.toLocaleString()}원
                      </div>
                    </>
                  )) ||
                    (coupon.coupon.discountType == "PERCENTAGE" && (
                      <>
                        <div>{coupon.coupon.discountPercentage}% 할인</div>
                      </>
                    )))}

                {!isLimit &&
                  ((coupon.coupon.discountType == "FIXED" && (
                    <>
                      <div className="text-[#ff5c00] font-bold">
                        - {coupon.coupon.fixedDiscountAmount.toLocaleString()}원
                      </div>
                    </>
                  )) ||
                    (coupon.coupon.discountType == "PERCENTAGE" && (
                      <>
                        <div>{coupon.coupon.discountPercentage}% 할인</div>
                      </>
                    )))}

                {/* {coupon.coupon.hasLimitMinOrder coupon.coupon.discountType == "PERCENTAGE" && (
                <div className="text-[#ff5c00] font-bold">
                  {coupon.coupon.discountPercentage}% 할인
                </div>
              )} */}
              </div>
            );
          })}

        <button className="w-full mt-4 p-2 border rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CouponModal;
