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
    <div className="bg-[#f0f7ff] min-h-screen font-sans pb-20">
        {/* 완료 메시지 */}
        <div className="w-full h-64 bg-gradient-to-b from-[#d0e7ff] to-[#f0f7ff] flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <svg
              className="w-10 h-10 text-[#4a89b7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-[32px] font-bold text-[#4a7ab5] tracking-tight">
            주문이 완료되었습니다
          </h1>
          <p className="text-[15px] text-[#7da0ca] mt-2">
            고객님의 주문이 정상적으로 접수되었습니다.
          </p>
          </div>

          <div className="max-w-[850px] mx-auto -mt-6 px-4 space-y-8">
            <div className="flex justify-center mt-6">
            <div className="bg-white border border-[#e1efff] px-8 py-3 rounded-full shadow-sm flex items-center gap-4">
            <span className="text-[13px] font-bold text-[#9db7db] uppercase tracking-wider">주문번호</span>
            <span className="text-[17px] font-extrabold text-[#4a6b9d]">
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* 주문 상품 */}
        <section className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden
        border border-[#e1efff]">
          <div className="bg-[#f8fbff] px-8 py-5 border-b border-[#f0f7ff]">
            <h2 className="text-[18px] font-bold text-[#4a6b9d] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#99c8ff] rounded-full"></span>
              주문 상품
            </h2>
          </div>
          <div className="px-8 py-2 divide-y divide-[#f5f9ff]">
            {order.orderProducts.map((item) => (
              <div
                key={item.id + item.productName}
                className="flex justify-between items-center py-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-[80px] h-[80px] flex-shrink-0 bg-white rounded-[15px] border border-[#f0f7ff] overflow-hidden shadow-sm">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[12px] text-[#9db7db] font-bold">
                      [{item.brandName}]
                    </p>
                    <p className="text-[15px] font-semibold text-[#44526b]">
                      {item.productName} - {item.optionName}
                    </p>
                    <p className="text-[13px] text-[#869ab8]">
                      {item.purchasedPrice.toLocaleString()}원 × {item.quantity}개
                    </p>
                  </div>
                </div>
                <p className="text-[17px] font-bold text-[#4a6b9d]">
                  {(
                    Number(item.purchasedPrice) * Number(item.quantity)
                  ).toLocaleString()}
                  원
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 배송 정보 */}
        <section className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-[#e1efff]">
          <div className="bg-[#f8fbff] px-8 py-5 border-b border-[#f0f7ff]">
            <h2 className="text-[18px] font-bold text-[#4a6b9d]">배송 정보</h2>
          </div>
          <div className="px-8 py-7 space-y-5">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-[#9db7db] uppercase">
                받는 사람
              </span>
              <span className="text-[15px] text-[#44526b] font-medium">
                {order.receiverName}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-[#9db7db] uppercase">
                연락처
              </span>
              <span className="text-[15px] text-[#44526b] font-medium">
                {order.receiverPhone}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-bold text-[#9db7db] uppercase">
                주소
              </span>
              <span className="text-[15px] text-[#44526b] font-medium leading-relaxed">
                ({order.postalCode}) {order.streetAddress}{" "}
                {order.detailedAddress}
              </span>
            </div>
            {order.deliveryRequest && (
              <div className="flex flex-col gap-1 pt-2 border-t border-[#f5f9ff]">
                <span className="text-[12px] font-bold text-[#9db7db] uppercase">
                  배송 요청사항
                </span>
                <span className="text-[14px] text-[#7da0ca] italic">
                  {order.deliveryRequest}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 결제 내역 */}
        <section className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-[#e1efff]">
          <div className="bg-[#f8fbff] px-8 py-5 border-b border-[#f0f7ff]">
            <h2 className="text-[18px] font-bold text-[#4a6b9d]">결제 내역</h2>
          </div>
          <div className="px-8 py-7 space-y-4">
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-[#8ba4c7]">결제수단</span>
              <span className="font-bold text-[#4a6b9d] bg-[#f0f7ff] px-3 py-1 rounded-md">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-[#8ba4c7]">총 상품금액</span>
              <span className="font-medium text-[#44526b]">
                {order.totalProductAmount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center text-[14px]">
              <span className="text-[#8ba4c7]">배송비</span>
              <span className="font-medium text-[#44526b]">
                {order.deliveryFee > 0
                  ? `${order.deliveryFee.toLocaleString()}원`
                  : "무료"}
              </span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#8ba4c7]">
                  쿠폰 할인 ({order.orderCoupon.userCouponName})
                </span>
                <span className="font-bold text-[#ff8080]">
                  - {order.discountAmount.toLocaleString()}원
                </span>
              </div>
            )}

            {order.usedPoints > 0 && (
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#8ba4c7]">포인트 사용</span>
                <span className="font-bold text-[#ff8080]">
                  - {order.usedPoints.toLocaleString()}원
                </span>
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-[#f0f7ff] flex justify-between items-center">
              <span className="text-[16px] font-bold text-[#44526b]">
                최종 결제금액
              </span>
              <span className="text-[24px] font-black text-[#4a89d7]">
                {order.finalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </section>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link
            to="/mypage/orders"
            className="px-10 py-4 bg-white border border-[#c2dfff] text-[#4a89d7] rounded-[18px] text-[16px] font-bold hover:bg-[#f8fbff] transition-all text-center shadow-sm"
          >
            주문 내역 보기
          </Link>
          <Link
            to="/"
            className="px-10 py-4 bg-[#4a89d7] text-white rounded-[18px] text-[16px] font-bold hover:bg-[#3d76bc] transition-all text-center shadow-lg shadow-blue-100"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>

  );
};

export default OrderCompleteComponent;
