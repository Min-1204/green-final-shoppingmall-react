import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getOneOrder } from "../../api/order/orderApi";

const OrderCompleteComponent = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  // ✅ 만약 데이터 없이 직접 접근한 경우 → 홈으로 이동시키기
  if (!orderId) {
    return (
      <div className="max-w-4xl mx-auto text-center mt-20">
        <p className="text-lg">잘못된 접근입니다.</p>
        <Link to="/" className="text-blue-600 underline mt-4 block">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  console.log("orderId", orderId);

  const [order, setOrder] = useState();
  // const {
  //   items,
  //   receiverName,
  //   streetAddress,
  //   postalCode,
  //   detailedAddress,
  //   receiverPhone,
  //   couponDiscount,
  //   shippingFee,
  //   couponName,
  //   usePoint,
  //   paymentMethod,
  //   orderNumber,
  //   deliveryRequest,
  // } = order;

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOneOrder(orderId);
      setOrder(data);
    };
    fetchOrder();
  }, [orderId]);

  // console.log("order=> ", order);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto text-center mt-20">
        <p className="text-lg">주문 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-[900px] mx-auto px-4 py-12">
        {/* 완료 메시지 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#ff6e18] rounded-full mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-[32px] font-bold text-[#111] mb-3">
            주문이 완료되었습니다
          </h1>
          <p className="text-[15px] text-[#666] mb-6">
            고객님의 주문이 정상적으로 접수되었습니다.
          </p>
          <div className="inline-block bg-white border border-[#e5e5e5] px-6 py-3 rounded">
            <span className="text-[13px] text-[#888]">주문번호</span>
            <span className="text-[16px] font-bold text-[#111] ml-3">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* 주문 상품 */}
        <section className="bg-white border border-[#e5e5e5] shadow-sm mb-6">
          <div className="border-b border-[#e5e5e5] px-6 py-4">
            <h2 className="text-[18px] font-bold text-[#111]">주문 상품</h2>
          </div>
          <div className="px-6 py-5 space-y-4">
            {order.orderProducts.map((item) => (
              <div
                key={item.id + item.productName}
                className="flex justify-between items-start py-4 border-b border-[#f0f0f0] last:border-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-[80px] h-[80px] flex-shrink-0 bg-[#f8f8f8] rounded overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-[11px] text-[#999] font-medium tracking-wide">
                      [{item.brandName}]
                    </p>
                    <p className="text-[14px] font-medium text-[#111] leading-snug">
                      {item.productName} - {item.optionName}
                    </p>
                    <p className="text-[13px] text-[#666] mt-2">
                      {item.purchasedPrice.toLocaleString()}원 × {item.quantity}
                      개
                    </p>
                  </div>
                </div>
                <p className="text-[15px] font-bold text-[#111] pt-1">
                  {(
                    Number(item.purchasedPrice) * Number(item.quantity)
                  ).toLocaleString()}
                  원
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 배송 정보 */}
        <section className="bg-white border border-[#e5e5e5] shadow-sm mb-6">
          <div className="border-b border-[#e5e5e5] px-6 py-4">
            <h2 className="text-[18px] font-bold text-[#111]">배송 정보</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            <div className="flex py-2">
              <span className="text-[13px] text-[#888] w-24 flex-shrink-0">
                받는 사람
              </span>
              <span className="text-[14px] text-[#111]">
                {order.receiverName}
              </span>
            </div>
            <div className="flex py-2">
              <span className="text-[13px] text-[#888] w-24 flex-shrink-0">
                연락처
              </span>
              <span className="text-[14px] text-[#111]">
                {order.receiverPhone}
              </span>
            </div>
            <div className="flex py-2">
              <span className="text-[13px] text-[#888] w-24 flex-shrink-0">
                주소
              </span>
              <span className="text-[14px] text-[#111]">
                ({order.postalCode}) {order.streetAddress}{" "}
                {order.detailedAddress}
              </span>
            </div>
            {order.deliveryRequest && (
              <div className="flex py-2">
                <span className="text-[13px] text-[#888] w-24 flex-shrink-0">
                  배송 요청사항
                </span>
                <span className="text-[14px] text-[#111]">
                  {order.deliveryRequest}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 결제 내역 */}
        <section className="bg-white border border-[#e5e5e5] shadow-sm mb-8">
          <div className="border-b border-[#e5e5e5] px-6 py-4">
            <h2 className="text-[18px] font-bold text-[#111]">결제 내역</h2>
          </div>
          <div className="px-6 py-5 space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-[13px] text-[#888]">결제수단</span>
              <span className="text-[14px] text-[#111] font-medium">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[13px] text-[#888]">총 상품금액</span>
              <span className="text-[14px] text-[#111] font-medium">
                {order.totalProductAmount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[13px] text-[#888]">배송비</span>
              <span className="text-[14px] text-[#111] font-medium">
                {order.deliveryFee > 0
                  ? `${order.deliveryFee.toLocaleString()}원`
                  : "무료"}
              </span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-[13px] text-[#888]">
                  쿠폰 할인 ({order.orderCoupon.userCouponName})
                </span>
                <span className="text-[14px] text-[#ff6e18] font-medium">
                  - {order.discountAmount.toLocaleString()}원
                </span>
              </div>
            )}

            {order.usedPoints > 0 && (
              <div className="flex justify-between items-center py-2">
                <span className="text-[13px] text-[#888]">포인트 사용</span>
                <span className="text-[14px] text-[#ff6e18] font-medium">
                  - {order.usedPoints.toLocaleString()}원
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 mt-4 border-t border-[#e5e5e5]">
              <span className="text-[16px] font-bold text-[#111]">
                최종 결제금액
              </span>
              <span className="text-[24px] font-bold text-[#ff6e18]">
                {order.finalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </section>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-3 mt-10">
          <Link
            to="/mypage/orders"
            className="px-8 py-4 bg-white border border-[#d5d5d5] text-[#111] text-[15px] font-medium hover:border-[#111] transition-colors"
          >
            주문 내역 보기
          </Link>
          <Link
            to="/"
            className="px-8 py-4 bg-[#111] text-white text-[15px] font-medium hover:bg-black transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleteComponent;
