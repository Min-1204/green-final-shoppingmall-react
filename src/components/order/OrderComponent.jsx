import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  completeOrder,
  getOneOrder,
  registerOrder,
} from "../../api/order/orderApi";
import { getActivePoints } from "../../api/point/pointApi";
import CouponModal from "./CouponModal";
import { getUserProfileThunk } from "../../redux/slices/features/user/authSlice";

// Helper function to format price with commas and '원'
const formatPrice = (price) => {
  return `${Number(price).toLocaleString()}원`;
};

const OrderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const passedItems = location.state?.items || [];

  const { user, profile } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  console.log("user", user);
  console.log("profile", profile);

  const [cartItems, setCartItems] = useState(
    passedItems.length > 0 ? passedItems : []
  );

  // console.log("cartItems", cartItems);

  // const [showAddressModal, setShowAddressModal] = useState(false);

  // 쿠폰모달
  const [showCouponModal, setShowCouponModal] = useState(false);
  // 선택한 쿠폰
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 배송지명
  const [addressName, setAddressName] = useState("");
  // 주문자 정보와 동일 토글
  const [useOrdererInfo, setUseOrdererInfo] = useState(false);
  // 수령인
  const [receiverName, setReceiverName] = useState("");
  // 수령인 전화번호
  const [receiverPhone, setReceiverPhone] = useState("");
  // 도로명 주소
  const [streetAddress, setStreetAddress] = useState("");
  // 우편번호
  const [postalCode, setPostalCode] = useState("");
  // 상세주소
  const [detailedAddress, setDetailedAddress] = useState("");
  //기본 배송지인지 여부
  const [defaultAddress, setDefaultAddress] = useState(false);
  // 배송 요청 사항
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [customDeliveryRequest, setCustomDeliveryRequest] = useState("");

  const [pointBalance, setPointBalance] = useState(0); // 보유 포인트
  const [usePoint, setUsePoint] = useState(0); // 사용할 포인트
  const [earnedPoints, setEarnedPoints] = useState(0);

  const paymentMethods = [
    { id: "card", label: "신용/체크카드" },
    { id: "kakao", label: "카카오페이" },
    { id: "naver", label: "네이버페이" },
    { id: "payco", label: "PAYCO" },
    { id: "phone", label: "휴대폰 결제" },
    { id: "bank", label: "계좌이체" },
  ];
  const [selectedPayment, setSelectedPayment] = useState("card");

  const paymentMethod = paymentMethods.find(
    (m) => m.id === selectedPayment
  ).label;

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreePurchase, setAgreePurchase] = useState(false);
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeDelegate, setAgreeDelegate] = useState(false);

  const [ordererInfo, setOrdererInfo] = useState({
    name: null,
    phone: null,
  });

  useEffect(() => {
    //로그인 유저는 있는데 프로필이 null이라면 다시 요청
    if (user && !profile) {
      dispatch(getUserProfileThunk(user.loginId));
    }
  }, [user, profile, dispatch]);

  // 약관 전체 동의 상태 업데이트
  useEffect(() => {
    if (agreePurchase && agreePersonal && agreeDelegate) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreePurchase, agreePersonal, agreeDelegate]);

  useEffect(() => {
    // console.log("profile", profile);
    const newOrdererInfo = {
      name: profile?.name,
      phone: profile?.phoneNumber,
    };
    setOrdererInfo(newOrdererInfo);
  }, [profile]);

  const fetchPoints = async (userId) => {
    const data = await getActivePoints(userId);
    setPointBalance(data);
  };

  useEffect(() => {
    fetchPoints(user.id);
  }, []);

  useEffect(() => {
    // 포인트는 가격의 1%를 합산하여 구함
    const sumPoints = cartItems.reduce(
      (sum, item) =>
        sum +
        Math.floor(Number(item.sellingPrice) * Number(item.quantity) * 0.01),
      0
    );
    setEarnedPoints(sumPoints);
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.sellingPrice) * Number(item.quantity),
    0
  );

  // console.log("totalPrice", totalPrice);

  const shippingFee =
    totalPrice >= cartItems[0]?.deliveryPolicy?.freeConditionAmount
      ? 0
      : cartItems[0]?.deliveryPolicy?.basicDeliveryFee;

  // console.log("shippingFee", shippingFee);

  const couponDiscount = selectedCoupon
    ? (selectedCoupon.coupon.discountType = "FIXED"
        ? selectedCoupon.coupon.fixedDiscountAmount
        : (totalPrice * selectedCoupon.coupon.discountPercentage) / 100)
    : 0;
  // console.log("couponDiscount", couponDiscount);
  // 최종 결제금액 계산: (총 상품금액 + 배송비) - 쿠폰할인 - 포인트사용
  const finalPrice = totalPrice + shippingFee - couponDiscount - usePoint;
  // console.log("finalPrice", finalPrice);
  const couponName = selectedCoupon ? selectedCoupon.coupon.couponName : null;

  const handleOrderCompleteClick = async () => {
    // 필수 약관 동의 확인 (디자인 변경이지만, 결제 로직에 필수적이므로 유지)
    if (!(agreePurchase && agreePersonal && agreeDelegate)) {
      alert("필수 동의 항목에 동의해 주세요.");
      return;
    }

    if (selectedPayment === "naver") {
      alert("해당 결제 수단은 사업자 정보가 필요하여 미구현합니다.");
      return;
    }

    if (selectedPayment !== "kakao") {
      alert("해당 결제 수단은 실제 금액이 빠져나가는 이유로 미구현합니다. ");
      return;
    }

    if (
      !receiverName ||
      !receiverPhone ||
      !postalCode ||
      !streetAddress ||
      !detailedAddress
    ) {
      alert("배송지 정보를 모두 입력해 주세요.");
      return;
    }

    try {
      const orderProducts = cartItems.map((item) => ({
        productOptionId: item.productOptionId,
        quantity: item.quantity,
      }));
      console.log("orderProducts", orderProducts);

      const dto = {
        paymentMethod: selectedPayment,
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        postalCode: postalCode,
        streetAddress: streetAddress,
        detailedAddress: detailedAddress,
        deliveryRequest:
          deliveryRequest === "직접입력"
            ? customDeliveryRequest
            : deliveryRequest,
        userId: user?.id,
        userCouponId: selectedCoupon ? selectedCoupon?.id : null,
        usedPoints: usePoint,
        earnedPoints: earnedPoints,
        orderProducts: orderProducts,
      };

      // 1. 주문 생성(결제 전)
      const resultOrderId = await registerOrder(dto, user.id);
      console.log("백엔드로부터 받은 주문 id", resultOrderId);

      const resultOrder = await getOneOrder(resultOrderId);
      console.log("백엔드로부터 받은 주문", resultOrder);

      // 🛑 수정 핵심: 서버에서 계산한 finalAmount를 결제 금액으로 사용
      // const serverFinalAmount = resultOrder.finalAmount; // 💡 서버가 계산한 정확한 금액!

      // console.log("serverFinalAmount", serverFinalAmount);

      // 2. 결제 진행
      // 아임포트 객체 destructuring
      const { IMP } = window;
      if (!IMP) {
        alert("결제 모듈 로딩에 실패했습니다. 페이지를 새로고침해주세요.");
        return;
      }

      // SDK 초기화
      IMP.init("imp62835818");

      // 결제 수단에 따른 PG 및 pay_method 매핑
      const getPgCode = (method) => {
        const pgMap = {
          card: "html5_inicis.INIpayTest", // KG이니시스 테스트 (자동취소)
          kakao: "kakaopay.TC0ONETIME", // 카카오페이 테스트
          payco: "payco.PARTNERTEST", // 페이코 테스트
          phone: "danal.A010002002", // 다날 테스트 (자동취소)
          bank: "html5_inicis.INIpayTest", // 계좌이체 테스트
        };
        return pgMap[method];
      };

      const getPayMethod = (method) => {
        const payMethodMap = {
          card: "card",
          bank: "trans",
          phone: "phone",
          kakao: "kakaopay",
          payco: "payco",
        };
        return payMethodMap[method];
      };

      IMP.request_pay(
        {
          pg: "kakaopay.TC0ONETIME", // PG사 설정 추가 // 카카오페이 테스트
          pay_method: "kakaopay", //선택한 결제 수단 반영
          merchant_uid: resultOrder.orderNumber, // 주문 고유 번호
          digital: true,
          name:
            cartItems.length > 1
              ? `${cartItems[0].productName} 외 ${cartItems.length - 1}건`
              : cartItems[0].productName,

          amount: 1, // 최종 결제 금액
          buyer_email: "user@example.com", //실제 사용자 이메일로 변경 필요
          buyer_name: receiverName,
          buyer_tel: receiverPhone,
          buyer_addr: `${streetAddress} ${detailedAddress}`,
          buyer_postcode: postalCode,
        },
        async (response) => {
          console.log("결제 응답:", response);
          if (response.success === false) {
            setSelectedCoupon(null);
            setUsePoint(0);

            await fetchPoints(user.id);

            return alert(
              `결제에 실패하였습니다. 에러 내용: ${response.error_msg}`
            );
          }
          if (response.success) {
            console.log("결제 성공(검증 전)! imp_uid:", response.imp_uid);
            completeOrder(response.imp_uid, response.merchant_uid);
            navigate("/order/complete", {
              state: { orderId: resultOrderId },
            });
            // try {
            //   const verificationResponse = await verifyPaymentAndCompleteOrder(
            //     response.imp_uid,
            //     response.merchant_uid
            //   );
            //   if (verificationResponse.status === 200) {
            //     //서버 검증까지 최종 성공 시 페이지 이동
            //     console.log("결제 및 서버 검증이 완료되었습니다.");
            //     navigate("/order/complete", {
            //       state: { orderId: resultOrderId },
            //     });
            //   }
            // } catch (error) {
            //   alert("서버 검증 실패:", error);
            //   if (error.response) {
            //     // 서버가 응답을 보냈지만 에러 상태 (400,500 등)
            //     alert(
            //       `결제는 성공했지만 서버 검증 실패: ${error.response.data}`
            //     );
            //   } else if (error.request) {
            //     //요청은 보냈지만 응답이 없음 (네트워크 오류)
            //     alert("서버와 통신할 수 없습니다. 네트워크를 확인해주세요.");
            //   } else {
            //     //요청 설정 중 오류
            //     alert("요청 중 오류가 발생했습니다: " + error.message);
            //   }
            // }
          }
        }
      );
    } catch (error) {
      console.error("주문 생성 중 오류:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  const handleOrdererInfoChange = (e) => {
    const check = e.target.checked;
    setUseOrdererInfo(check);
    if (check) {
      setReceiverName(ordererInfo.name);
      setReceiverPhone(ordererInfo.phone);
    } else {
      setReceiverName("");
      setReceiverPhone("");
    }
  };

  const execDaumPostcode = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        //팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분

        //도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        //내려오는 변수가 값이 없는 경우엔 공백('') 값을 가지므로, 이를 참고하여 분기 한다.
        setStreetAddress(data.roadAddress); //도로명 주소 변수
        setPostalCode(data.zonecode); // 우편번호 변수
      },
    }).open();
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <div className="max-w-[1200px] mx-auto py-10 px-4">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#111] tracking-tight">
            주문/결제
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 좌측 메인 콘텐츠 */}
          <div className="flex-1 space-y-6">
            {/* 1. 주문 상품 정보 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">
                  주문상품 정보
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <colgroup>
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                  </colgroup>
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                      <th className="text-left px-6 py-3 text-[13px] font-medium text-[#666]">
                        상품정보
                      </th>
                      <th className="text-center px-3 py-3 text-[13px] font-medium text-[#666]">
                        수량
                      </th>
                      <th className="text-center px-3 py-3 text-[13px] font-medium text-[#666]">
                        판매금액
                      </th>
                      <th className="text-center px-6 py-3 text-[13px] font-medium text-[#666]">
                        적립예정
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#f0f0f0] last:border-b-0"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-start gap-4">
                            <div className="w-[80px] h-[80px] flex-shrink-0 bg-[#f8f8f8] rounded overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-1 pt-1">
                              <p className="text-[11px] text-[#999] font-medium tracking-wide">
                                [{item.brandName}]
                              </p>
                              <p className="text-[14px] text-[#111] font-medium leading-snug">
                                {item.productName}{" "}
                                {item.optionName &&
                                item.optionName != item.productName
                                  ? `- ${item.optionName}`
                                  : null}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-5 text-center text-[14px] text-[#111]">
                          {item.quantity}
                        </td>
                        <td className="px-3 py-5 text-center text-[15px] font-bold text-[#111]">
                          {formatPrice(
                            Number(item.sellingPrice) * Number(item.quantity)
                          )}
                        </td>

                        <td className="px-6 py-5 text-center text-[14px] font-medium text-[#ff6e18]">
                          {Math.floor(
                            Number(item.sellingPrice) *
                              Number(item.quantity) *
                              0.01
                          )}
                          P
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. 배송지 정보 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">
                  배송지 정보
                </h2>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="flex gap-2 items-center">
                  <button
                    className="px-5 py-2.5 border border-[#d5d5d5] bg-white text-[#111] text-[13px] font-medium hover:border-[#111] transition-colors"
                    onClick={() => {
                      setAddressName("집");
                      setReceiverName(profile?.name || "");
                      setReceiverPhone(profile?.phoneNumber || "");
                      setPostalCode(profile?.postalCode || "");
                      setStreetAddress(profile?.address || "");
                      setDetailedAddress(profile?.addressDetail || "");
                    }}
                  >
                    기본 배송지
                  </button>
                  <button
                    className="px-5 py-2.5 border border-[#d5d5d5] bg-white text-[#111] text-[13px] font-medium hover:border-[#111] transition-colors"
                    onClick={() => {
                      setAddressName("");
                      setReceiverName("");
                      setReceiverPhone("");
                      setPostalCode("");
                      setStreetAddress("");
                      setDetailedAddress("");
                    }}
                  >
                    신규 배송지
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="배송지명 (예: 우리집)"
                    value={addressName}
                    onChange={(e) => setAddressName(e.target.value)}
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useOrdererInfo}
                        onChange={(e) => handleOrdererInfoChange(e)}
                        className="w-4 h-4"
                      />
                      <span className="text-[13px] text-[#111]">
                        주문자 정보와 동일
                      </span>
                    </label>
                  </div>

                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="받는 사람"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                  />

                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="연락처 (- 제외)"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <input
                      className="flex-1 px-4 py-3 border border-[#d5d5d5] bg-[#f8f8f8] text-[13px] text-[#111]"
                      placeholder="우편번호"
                      value={postalCode}
                      readOnly
                    />
                    <button
                      className="px-6 py-3 bg-white border border-[#111] text-[#111] text-[13px] font-medium hover:bg-[#111] hover:text-white transition-colors"
                      onClick={() => execDaumPostcode()}
                    >
                      우편번호 찾기
                    </button>
                  </div>

                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="기본 주소"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />

                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="상세 주소"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 3. 배송 요청사항 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">
                  배송 요청사항
                </h2>
              </div>

              <div className="px-6 py-6 space-y-3">
                <select
                  className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] bg-white focus:outline-none focus:border-[#111] transition-colors"
                  value={deliveryRequest}
                  onChange={(e) => setDeliveryRequest(e.target.value)}
                >
                  <option value="">배송 요청사항을 선택해주세요</option>
                  <option value="문 앞에 놓아주세요.">
                    문 앞에 놓아주세요.
                  </option>
                  <option value="배송 전에 미리 연락 바랍니다.">
                    배송 전에 미리 연락 바랍니다.
                  </option>
                  <option value="부재 시 경비실에 맡겨주세요.">
                    부재 시 경비실에 맡겨주세요.
                  </option>
                  <option value="부재 시 전화/문자 남겨 주세요.">
                    부재 시 전화/문자 남겨 주세요.
                  </option>
                  <option value="직접입력">직접입력</option>
                </select>

                {deliveryRequest === "직접입력" && (
                  <input
                    className="w-full px-4 py-3 border border-[#d5d5d5] text-[13px] placeholder-[#999] focus:outline-none focus:border-[#111] transition-colors"
                    placeholder="배송 요청사항을 입력해주세요"
                    value={customDeliveryRequest}
                    onChange={(e) => setCustomDeliveryRequest(e.target.value)}
                  />
                )}
              </div>
            </section>

            {/* 4. 쿠폰 할인 */}
            <section className="bg-white shadow-sm border border-[#e5e5e5] overflow-hidden">
              <div className="border-b border-[#e5e5e5] px-6 py-4 bg-gray-50/50">
                <h2 className="text-[17px] font-bold text-[#111] flex items-center gap-2">
                  쿠폰 할인
                </h2>
              </div>

              <div className="px-6 py-6">
                <div
                  className={`relative transition-all duration-200 rounded-lg border-2 p-5 ${
                    selectedCoupon
                      ? "border-orange-500 bg-orange-50/30"
                      : "border-dashed border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] text-gray-500 font-medium">
                        {selectedCoupon ? "적용된 혜택" : "쿠폰 적용"}
                      </span>
                      <span className="text-[15px] text-[#111] font-bold">
                        {selectedCoupon ? (
                          <span className="flex items-center gap-2">
                            <span className="text-orange-600">
                              [{couponName}]
                            </span>
                          </span>
                        ) : (
                          "사용 가능한 쿠폰이 있습니다"
                        )}
                      </span>
                    </div>

                    {selectedCoupon ? (
                      <button
                        onClick={() => setSelectedCoupon(null)}
                        className="px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-red-500 border border-gray-300 rounded bg-white transition-colors"
                      >
                        해제
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowCouponModal(true)}
                        className="px-4 py-2 text-[13px] font-bold text-white bg-[#111] rounded hover:bg-gray-800 transition-all shadow-sm"
                      >
                        쿠폰 선택
                      </button>
                    )}
                  </div>

                  {/* 할인 금액 표시부 */}
                  {selectedCoupon && (
                    <div className="mt-4 pt-4 border-t border-orange-200 flex justify-between items-center">
                      <span className="text-[13px] text-gray-600 font-medium">
                        할인 금액
                      </span>
                      <span className="text-[18px] text-[#ff6e18] font-black">
                        - {formatPrice(couponDiscount)}
                      </span>
                    </div>
                  )}
                </div>

                {!selectedCoupon && (
                  <p className="mt-3 text-[12px] text-gray-400">
                    * 쿠폰은 주문당 1개만 사용 가능합니다.
                  </p>
                )}
              </div>
            </section>

            {/* 5. 포인트 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">포인트</h2>
              </div>

              <div className="px-6 py-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      className="w-[140px] px-4 py-3 border border-[#d5d5d5] text-[13px] text-right pr-8 focus:outline-none focus:border-[#111] transition-colors"
                      placeholder="0"
                      value={usePoint}
                      onChange={(e) => {
                        const value = Math.floor(Number(e.target.value));
                        if (value <= pointBalance && value >= 0) {
                          setUsePoint(value);
                        } else if (value < 0) {
                          setUsePoint(0);
                        } else if (value > pointBalance) {
                          setUsePoint(pointBalance);
                        }
                      }}
                      min="0"
                      max={pointBalance}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-[#999]">
                      P
                    </span>
                  </div>
                  <span className="text-[13px] text-[#666]">
                    보유 {pointBalance.toLocaleString()}P
                  </span>
                  <button
                    className="ml-auto px-5 py-2.5 border border-[#d5d5d5] bg-white text-[#111] text-[13px] font-medium hover:border-[#111] transition-colors"
                    onClick={() => setUsePoint(pointBalance)}
                  >
                    전액사용
                  </button>
                </div>
                <p className="text-[12px] text-[#999]">
                  ※ 최소 사용 포인트 제한 없음 (최종 결제금액 1원 이상)
                </p>
              </div>
            </section>

            {/* 6. 결제수단 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">결제수단</h2>
              </div>

              <div className="px-6 py-6">
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedPayment(m.id)}
                      className={`px-4 py-3.5 text-[13px] font-medium border transition-colors ${
                        selectedPayment === m.id
                          ? "bg-[#ff6e18] text-white border-[#ff6e18]"
                          : "bg-white text-[#111] border-[#d5d5d5] hover:border-[#111]"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. 약관 동의 */}
            <section className="bg-white rounded-none shadow-sm border border-[#e5e5e5]">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <h2 className="text-[18px] font-bold text-[#111]">주문 동의</h2>
              </div>

              <div className="px-6 py-6 space-y-4">
                <label className="flex items-center gap-3 pb-4 border-b border-[#e5e5e5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setAgreeAll(checked);
                      setAgreePurchase(checked);
                      setAgreePersonal(checked);
                      setAgreeDelegate(checked);
                    }}
                    className="w-5 h-5"
                  />
                  <span className="text-[14px] font-bold text-[#111]">
                    전체 동의 (필수)
                  </span>
                </label>

                <div className="space-y-3">
                  {[
                    {
                      id: "purchase",
                      label: "구매조건 확인 및 결제대행 서비스 약관 동의",
                      state: agreePurchase,
                      setter: setAgreePurchase,
                    },
                    {
                      id: "personal",
                      label: "개인정보 수집 및 이용 동의",
                      state: agreePersonal,
                      setter: setAgreePersonal,
                    },
                    {
                      id: "delegate",
                      label: "개인정보 제공 및 위탁 동의",
                      state: agreeDelegate,
                      setter: setAgreeDelegate,
                    },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={item.state}
                        onChange={(e) => item.setter(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-[13px] text-[#666]">
                        {item.label} (필수)
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* 우측 결제 정보 박스 */}
          <div className="lg:w-[360px]">
            <div className="sticky top-6 bg-white border border-[#e5e5e5] shadow-sm">
              <div className="bg-[#111] px-6 py-4">
                <h3 className="text-[18px] font-bold text-white">결제정보</h3>
              </div>

              <div className="px-6 py-6 space-y-4">
                <div className="space-y-3 pb-4 border-b border-[#e5e5e5]">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-[#666]">주문금액</span>
                    <span className="text-[14px] text-[#111] font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[13px] text-[#666]">배송비</span>
                    <span className="text-[14px] text-[#111] font-medium">
                      {shippingFee > 0
                        ? `+ ${formatPrice(shippingFee)}`
                        : "무료"}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[#666]">쿠폰 할인</span>
                      <span className="text-[14px] text-[#ff6e18] font-medium">
                        - {formatPrice(couponDiscount)}
                      </span>
                    </div>
                  )}

                  {usePoint > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] text-[#666]">
                        포인트 사용
                      </span>
                      <span className="text-[14px] text-[#ff6e18] font-medium">
                        - {formatPrice(usePoint)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-[16px] font-bold text-[#111]">
                    총 결제금액
                  </span>
                  <span className="text-[24px] font-bold text-[#ff6e18]">
                    {formatPrice(finalPrice)}
                  </span>
                </div>

                <div className="pt-2 space-y-1 text-[12px] text-[#999]">
                  <p>• 결제금액 {formatPrice(finalPrice)} (VAT 포함)</p>
                  <p>• 결제수단: {paymentMethod}</p>
                  <p>• 적립 예정 포인트: {earnedPoints}P</p>
                </div>

                <button
                  className={`w-full py-4 text-[15px] font-bold transition-colors mt-4 ${
                    agreePurchase && agreePersonal && agreeDelegate
                      ? "bg-[#ff6e18] text-white hover:bg-[#e55d0f]"
                      : "bg-[#e5e5e5] text-[#999] cursor-not-allowed"
                  }`}
                  disabled={!(agreePurchase && agreePersonal && agreeDelegate)}
                  onClick={handleOrderCompleteClick}
                >
                  {formatPrice(finalPrice)} 결제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCouponModal && (
        <CouponModal
          onClose={() => setShowCouponModal(false)}
          onSelect={(coupon) => {
            setSelectedCoupon(coupon);
            setShowCouponModal(false);
          }}
          userId={user.id}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default OrderComponent;
