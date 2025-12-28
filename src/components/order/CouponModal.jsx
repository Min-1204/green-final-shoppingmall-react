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

  // console.log("coupons", coupons);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-[400px] shadow-2xl overflow-hidden border border-[#e1efff]">
        
        <div className="bg-gradient-to-r from-[#d0e7ff] to-[#f0f7ff] px-6 py-5 border-b border-[#e1efff]">
        <h3 className="font-bold text-[18px] text-[#4a6b9d] flex items-center gap-2">
          <span className="w-2 h-5 bg-[#4a89d7] rounded-full"></span>
          보유 쿠폰
        </h3>
        </div>

        <div className="p-6 max-h-[450px] overflow-y-auto bg-[#f8fbff] space-y-3">
        {coupons.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <svg className="w-8 h-8 text-[#9db7db]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M2112a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-[#8ba4c7] font-medium">보유한 쿠폰이 없습니다.</h2>
          </div>
        ) : (
          coupons.map((coupon)=> {
            const isLimit = coupon.coupon.hasLimitMinOrder === true;
            const isMetMinOrder = isLimit && totalPrice >= coupon.coupon.minOrderAmount;
            const isSelectable = !isLimit || isMetMinOrder;

            return (
              <div
              key={coupon.coupon.id}
              onClick={() => isSelectable && onSelect(coupon)}
              className={`relative group border p-4 rounded-[18px] transition-all duration-200 ${
                isSelectable
                ? "bg-white border-[#c2dfff] cursor-pointer hover:border-[#4a89d7] hover:shadow-md"
                : "bg-[#f1f5f9] border-gray-200 cursor-not-allowed opacity-70"
              }`}
              >
              {/* 왼쪽 포인트 장식 (쿠폰 느낌) */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${isSelectable ? 
                'bg-[#4a89d7]' : 'bg-gray-300'}`}></div>
              
              <div className="flex justify-between items-start mb-2">
                <div className={`font-bold text-[15px] ${isSelectable ? "text-[#44526b]":"text-gray-400"}`}>
                  {coupon.coupon.couponName}
                </div>
                {isSelectable && (
                  <span className="text-[10px] bg-[#eef6ff] text-[#4a89d7] px-2 py-0.5 rounded-full font-bold
                  border border-[#d0e7ff]">
                    사용가능
                  </span>
                )}
                </div>

                <div className="space-y-1">
                {/* 금액/할인율 표시 */}
                {coupon.coupon.discountType === "FIXED" ? (
                  <div className={`text-[17px] font-black ${isSelectable ? "text-[#4a89d7]":"text-gray-400"}`}>
                    - {coupon.coupon.fixedDiscountAmount.toLocaleString()}원
                  </div>
                ) : (
                  <div className={`text-[17px] font-black ${isSelectable ? "text-[#4a89b7]":"text-gray-400"}`}>
                    {coupon.coupon.discountPercentage}% 할인
                  </div>
                )}

                {/* 조건 설명 */}
                <div className={`text-[12px] ${isSelectable ? "text-[#8ba4c7]":"text-gray-400"}`}>
                  {isLimit ? (
                    <span>최소 주문 금액: {coupon.coupon.minOrderAmount.toLocaleString()}원</span>
                  ) : (
                    <span>조건 없음</span>
                  )}
                </div>
              </div>

              {!isSelectable && isLimit && (
                <div className="mt-2 pt-2 border-t border-gray-200 text-[11px] text-[#ff8080] font-medium">
                  금액 부족 ({(coupon.coupon.minOrderAmount - totalPrice).toLocaleString()}원 더 필요)
                </div>
              )}
              </div>
            )
          })
        )}
        </div>

        {/* 푸터 영역 */}
        <div className="p-5 bg-white border-t border-[#f0f7ff]">
          <button
          className="w-full py-3.5 border border-[#c2dfff] text-[#4a89d7] rounded-[15px] text-[15px] font-bold
          hover:bg-[#f8fbff] transition-all"
          onClick={onClose}
          >
            닫기
          </button>
          </div>
          </div>
          </div>
  );
};

export default CouponModal;
