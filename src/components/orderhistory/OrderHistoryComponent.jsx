import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  changeOrderProductStatus,
  confirmOrder,
  deleteOneOrder,
  getOrdersBySearch,
  getOrderStatusSummary,
} from "../../api/order/orderApi";
import { earnPoint, getActivePoints } from "../../api/point/pointApi";
import Pagination from "../pagination/Pagination";
import ReviewAddComponent from "../review/ReviewAddComponent";
import CancleModal from "./CancleModal";
import ConfimPurchaseModal from "./ConfimPurchaseModal";
import ConfirmPurchaseCompleteModal from "./ConfirmPurchaseCompleteModal";
import DeliveryModal from "./DeliveryModal";
import ReturnModal from "./ReturnModal";
import { refundPayment } from "../../api/payment/paymentApi";
import dayjs from "dayjs";

export default function OrderHistoryComponent() {
  const statusClass = (s) =>
    s === "배송중"
      ? "text-blue-600"
      : s === "배송완료"
      ? "text-green-600"
      : "text-[#ff5c00]";

  const orderStatusMap = {
    PENDING_PAYMENT: "주문접수",
    PAID: "결제완료",
    PREPARING: "배송준비중",
    SHIPPING: "배송중",
    DELIVERED: "배송완료",
    CONFIRMED: "구매확정",
    CANCEL_REQUESTED: "취소신청",
    EXCHANGE_REQUESTED: "교환신청",
    RETURN_REQUESTED: "반품신청",
  };

  const [selectedPeriod, setSelectedPeriod] = useState("1개월");
  const [reviewModal, setReviewModal] = useState(false);
  const [countStatus, setCountStatus] = useState({
    주문접수: 0,
    결제완료: 0,
    배송준비중: 0,
    배송중: 0,
    배송완료: 0,
  });
  // 백엔드로부터 받아오는 주문 페이지네이션 정보 저장
  const [pageResponseDTO, setPageResponseDTO] = useState({});
  // 주문 내역 리스트(백엔드로부터 받아오는 데이터)
  const [orderList, setOrderList] = useState([]);
  // 배송 조회 모달
  const [deliveryModal, setDeliveryModal] = useState(false);
  // 구매 확정 모달
  const [confirmPurchaseModal, setConfirmPurchaseModal] = useState(false);
  // 구매 확정 모달, 취소 신청 모달에 전달되는 주문 정보
  const [selectedOrder, setSelectedOrder] = useState({});
  // 구매 확정 완료 모달
  const [confirmPurchaseCompleteModal, setConfirmPurchaseCompleteModal] =
    useState(false);

  // 사용가능한 포인트(구매 확정 완료 모달에 전달, 페이지 상단에 표시하는 용도)
  const [activePoints, setActivePoints] = useState(0);

  // 취소 신청 모달
  const [cancleModal, setCancleModal] = useState(false);

  // 반품 신청 모달
  const [returnModal, setReturnModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});

  // 상품 리뷰 작성
  const [selectedProduct, setSelectedProduct] = useState({});

  // 검색을 눌렀는지 여부
  const [hasSearched, setHasSearched] = useState(false);

  // 오늘 날짜 가져오기
  const today = dayjs();
  const oneMonthAgo = dayjs().subtract(1, "month");

  // //오늘 날짜의 연, 월, 일 저장
  // const todayYear = today.getFullYear();
  // // 0부터 시작하므로 +1 해줘야함
  // const todayMonth = today.getMonth() + 1;
  // const todayDay = today.getDate();

  // 시작 날짜 상태
  const [startYear, setStartYear] = useState(oneMonthAgo.year());
  const [startMonth, setStartMonth] = useState(oneMonthAgo.month() + 1);
  const [startDay, setStartDay] = useState(oneMonthAgo.date());

  // 종료 날짜 상태
  const [endYear, setEndYear] = useState(today.year());
  const [endMonth, setEndMonth] = useState(today.month() + 1);
  const [endDay, setEndDay] = useState(today.date());

  const handleSelectPeriod = (month) => {
    const past = dayjs().subtract(month, "month");

    setStartYear(past.year());
    setStartMonth(past.month() + 1);
    setStartDay(past.date());

    setSelectedPeriod(`${month}개월`);
  };

  const { user } = useSelector((state) => state.authSlice);

  // console.log("user", user);

  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리에서 숫자 값을 읽어오는 함수
  const getNum = (param, defaultValue) => {
    if (!param) return defaultValue;
    return parseInt(param, 10);
  };

  useEffect(() => {
    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);
    const sort = queryParams.get("sort");
    //URL에서 현재 페이지와 사이즈 정보 읽어옴

    const start = `${startYear}-${String(startMonth).padStart(2, "0")}-${String(
      startDay
    ).padStart(2, "0")}`;

    const end = `${endYear}-${String(endMonth).padStart(2, "0")}-${String(
      endDay
    ).padStart(2, "0")}`;

    const condition = {
      userId: user?.id,
      startDate: start,
      endDate: end,
    };

    const fetchOrderList = async () => {
      const data = await getOrdersBySearch(condition, sort, page, size);
      setPageResponseDTO(data);
    };

    if (hasSearched) {
      fetchOrderList();
    }
  }, [queryParams]);

  useEffect(() => {
    console.log("pageResponseDTO", pageResponseDTO);
    setOrderList(pageResponseDTO?.dtoList);
  }, [pageResponseDTO]);

  useEffect(() => {
    const newCountState = {
      주문접수: 0,
      결제완료: 0,
      배송준비중: 0,
      배송중: 0,
      배송완료: 0,
    };

    const start = `${startYear}-${String(startMonth).padStart(2, "0")}-${String(
      startDay
    ).padStart(2, "0")}`;
    const end = `${endYear}-${String(endMonth).padStart(2, "0")}-${String(
      endDay
    ).padStart(2, "0")}`;

    const fetchOrderStatusSummary = async () => {
      const result = await getOrderStatusSummary(user.id, start, end);
      newCountState["주문접수"] = result["PENDING_PAYMENT"]
        ? result["PENDING_PAYMENT"]
        : 0;
      newCountState["결제완료"] = result["PAID"] ? result["PAID"] : 0;
      newCountState["배송준비중"] = result["PREPARING"]
        ? result["PREPARING"]
        : 0;
      newCountState["배송중"] = result["SHIPPING"] ? result["SHIPPING"] : 0;
      newCountState["배송완료"] = result["DELIVERED"] ? result["DELIVERED"] : 0;
      if (hasSearched) {
        setCountStatus(newCountState);
      }
    };
    fetchOrderStatusSummary();
  }, [orderList]);

  // const handleSelectPeriod = (month) => {
  //   const now = new Date();
  //   const past = new Date();

  //   past.setMonth(past.getMonth() - month);

  //   setStartYear(past.getFullYear());
  //   setStartMonth(past.getMonth() + 1);
  //   setStartDay(past.getDate());

  //   setSelectedPeriod(`${month}개월`);
  // };

  const handleSearch = async () => {
    const page = 1;
    const size = getNum(queryParams.get("size"), 10);
    const sort = queryParams.get("sort");
    const start = `${startYear}-${String(startMonth).padStart(2, "0")}-${String(
      startDay
    ).padStart(2, "0")}`;

    const end = `${endYear}-${String(endMonth).padStart(2, "0")}-${String(
      endDay
    ).padStart(2, "0")}`;

    console.log("조회 요청 날짜:", start, "~", end);

    const condition = {
      userId: user.id,
      startDate: start,
      endDate: end,
    };
    const data = await getOrdersBySearch(condition, sort, page, size);
    setPageResponseDTO(data);

    const newParams = new URLSearchParams(queryParams.toString());
    newParams.set("page", page);
    navigate({ pathname: location.pathname, search: newParams.toString() });
    setHasSearched(true);
  };

  const handlePurchaseConfirm = async (userId, order) => {
    const pointEarnReq = {
      userId: userId,
      orderId: order.id,
      pointValue: order.earnedPoints,
    };
    // 포인트 적립(백엔드)
    await earnPoint(pointEarnReq);
    // 사용가능한 포인트 불러오기(백엔드)
    const result = await getActivePoints(userId);
    // 구매 확정 처리
    await confirmOrder(order.id);
    setActivePoints(result);

    // 화면에 보여지는 주문 목록 상태(orderList) 즉시 업데이트
    setOrderList((prevOrderList) =>
      prevOrderList.map((prevOrder) => {
        if (prevOrder.id === order.id) {
          const updatedProducts = prevOrder.orderProducts.map((product) => {
            return { ...product, orderProductStatus: "CONFIRMED" };
          });
          return { ...prevOrder, orderProducts: updatedProducts };
        }
        return prevOrder;
      })
    );

    setConfirmPurchaseCompleteModal(true);
  };

  const handleConfirmCancel = async (orderId, reason) => {
    if (reason === "결제 전 취소") {
      await deleteOneOrder(orderId);
    } else {
      const result = await refundPayment(orderId, reason);
      console.log("refundPayment 호출 결과 =>", result);
    }
    // 서버 요청이 성공적이라면 (보통 result가 존재하거나 성공 코드를 반환할 때)
    // 화면의 orderList 상태에서 방금 취소한 orderId를 가진 주문만 제외시킵니다.
    setOrderList((prevList) =>
      prevList.filter((order) => order.id !== orderId)
    );

    setCancleModal(false);

    // (선택사항) 사용자 피드백
    alert("주문이 성공적으로 취소되었습니다.");
  };

  const handleChangeStatus = async (orderId, reason) => {
    try {
      await changeOrderProductStatus(orderId, "RETURN_REQUESTED", reason);
      alert("반품/환불 신청이 완료됐습니다.");

      setOrderList((prevList) => {
        return prevList.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              orderProducts: order.orderProducts.map((op) => ({
                ...op,
                orderProductStatus: "RETURN_REQUESTED",
              })),
            };
          } else {
            return order;
          }
        });
      });
    } catch (error) {
      console.error(error);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-10 bg-white border border-gray-400 rounded-2xl shadow-sm text-[#333]">
      {/* 헤더 */}
      <div className="mb-8 ml-2">
        <h1 className="text-2xl font-medium mb-1">Order History</h1>
        <p className="text-sm text-gray-500">주문 / 배송 조회</p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {["주문접수", "결제완료", "배송준비중", "배송중", "배송완료"].map(
          (label, idx) => (
            <div
              key={label}
              className="bg-white border border-gray-400 p-5 text-center rounded-xl"
            >
              <p className="text-3xl font-normal mb-2 text-[#333]">
                {countStatus[label]}
              </p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          )
        )}
      </div>

      {/* 구매기간 필터 */}
      <div className="bg-white border border-gray-400 p-6 mb-6 rounded-xl">
        <p className="text-xs text-gray-600 mb-3 uppercase tracking-wide">
          PURCHASE PERIOD
        </p>
        <div className="flex gap-2 mb-4">
          {[1, 3, 6, 12].map((m) => (
            <button
              key={m}
              onClick={() => handleSelectPeriod(m)}
              className={`px-5 py-2 text-sm transition-all ${
                selectedPeriod === `${m}개월`
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-400 hover:border-gray-500"
              }`}
            >
              {`${m}개월`}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          ※ 최근 1년 내 구매내역만 조회 가능합니다.
        </p>
      </div>

      {/* 날짜 직접 입력 */}
      <div className="bg-white border border-gray-400 p-6 mb-6 rounded-xl">
        <p className="text-xs text-gray-600 mb-3 uppercase tracking-wide">
          DATE RANGE
        </p>
        <div className="flex items-center gap-3">
          {/* 시작 날짜 */}
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <span className="text-sm text-gray-500">년</span>

            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">월</span>

            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">일</span>
          </div>
          {/* 구분선 */}
          <span className="text-gray-400">~</span>

          {/* 종료 날짜 */}
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            >
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <span className="text-sm text-gray-500">년</span>

            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">월</span>

            <select
              className="px-3 py-2 border border-gray-400 text-sm bg-white hover:border-gray-500"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">일</span>
          </div>

          {/* 조회 버튼 */}
          <button
            className="ml-4 px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
            onClick={() => handleSearch()}
          >
            조회
          </button>
        </div>
      </div>

      {/* 주문 목록 테이블 */}
      <div className="bg-white border border-gray-400 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white border-b border-gray-400">
            <tr className="h-12">
              <th className="w-40 text-xs uppercase tracking-wide text-gray-500 font-normal">
                ORDER DATE
              </th>
              <th className="w-20"></th>
              <th className="text-left text-xs uppercase tracking-wide text-gray-500 font-normal">
                PRODUCT INFO
              </th>
              <th className="w-16 text-xs uppercase tracking-wide text-gray-500 font-normal">
                QTY
              </th>
              <th className="w-24 text-xs uppercase tracking-wide text-gray-500 font-normal">
                PRICE
              </th>
              <th className="w-24 text-xs uppercase tracking-wide text-gray-500 font-normal">
                STATUS
              </th>
              <th className="w-32 text-xs uppercase tracking-wide text-gray-500 font-normal">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-400">
            {/* 주문 내역이 있는 경우 */}
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <Fragment key={order.id}>
                  {order.orderProducts.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      {index === 0 && (
                        <td
                          rowSpan={order.orderProducts.length}
                          className="text-center align-top p-5 border-r border-gray-400 bg-white"
                        >
                          <div className="text-sm mb-1">{order.orderDate}</div>
                          <div className="text-xs text-gray-400">
                            {order.orderNumber}
                          </div>
                          {orderStatusMap[item.orderProductStatus] ===
                            "배송완료" && (
                            <button
                              className="text-xs px-3 py-1 border bg-black text-white hover:bg-gray-800 transition-colors w-full"
                              onClick={() => {
                                setConfirmPurchaseModal(true);
                                setSelectedOrder(order);
                                console.log(selectedOrder);
                              }}
                            >
                              구매 확정
                            </button>
                          )}
                        </td>
                      )}

                      <td className="py-5 px-3">
                        <Link
                          to={`/product/${item.productId}`}
                          className="block w-14 h-14 bg-gray-100 overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={item.imageUrl}
                            className="w-full h-full object-cover"
                            alt={item.productName}
                          />
                        </Link>
                      </td>
                      <td className="py-5 text-left">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-sm text-gray-800 hover:underline hover:text-blue-600 transition-colors"
                        >
                          {item.productName} - {item.productOptionName}
                        </Link>
                      </td>
                      <td className="text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="text-right pr-5 text-gray-800">
                        {item.totalAmount.toLocaleString()}원
                      </td>
                      <td className="text-center">
                        <div
                          className={`text-sm mb-2 ${statusClass(
                            orderStatusMap[item.orderProductStatus]
                          )}`}
                        >
                          {orderStatusMap[item.orderProductStatus]}
                        </div>
                        <div className="flex flex-col gap-1.5 items-center">
                          {(orderStatusMap[item.orderProductStatus] ===
                            "배송중" ||
                            orderStatusMap[item.orderProductStatus] ===
                              "배송완료") && (
                            <button
                              className="text-xs px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors"
                              onClick={() => {
                                setDeliveryModal(!deliveryModal);
                                setSelectedItem(item);
                              }}
                            >
                              배송조회
                            </button>
                          )}
                          {orderStatusMap[item.orderProductStatus] ===
                            "구매확정" && (
                            <button
                              className="text-xs px-3 py-1 bg-black text-white hover:bg-gray-800 transition-colors"
                              onClick={() => {
                                setSelectedProduct({
                                  ...item,
                                  orderProductId: item.id,
                                });
                                setReviewModal(true);
                              }}
                            >
                              리뷰작성
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="text-center px-3">
                        <div className="flex flex-col gap-1.5 items-center">
                          {(orderStatusMap[item.orderProductStatus] ===
                            "주문접수" ||
                            orderStatusMap[item.orderProductStatus] ===
                              "결제완료") && (
                            <button
                              className="text-xs px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors w-full"
                              onClick={() => {
                                setCancleModal(!cancleModal);
                                setSelectedItem(item);
                                setSelectedOrder(order);
                              }}
                            >
                              취소신청
                            </button>
                          )}

                          {orderStatusMap[item.orderProductStatus] ===
                            "배송완료" && (
                            <button
                              className="text-xs px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors w-full"
                              onClick={() => {
                                setReturnModal(true);
                                setSelectedItem(item);
                                setSelectedOrder(order);
                              }}
                            >
                              반품/환불신청
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))
            ) : (
              // 주문 내역이 없는 경우 표시될 행
              <tr>
                <td
                  colSpan="7"
                  className="py-20 text-center text-gray-500 bg-white"
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg mb-2">📦</span>
                    <p>주문 내역이 없습니다.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 컴포넌트 */}
      {pageResponseDTO && <Pagination pageResponseDTO={pageResponseDTO} />}

      {/* 모달들 */}
      {reviewModal && (
        <ReviewAddComponent
          closeModal={() => setReviewModal(false)}
          orderItem={selectedProduct}
        />
      )}
      {deliveryModal && selectedItem && (
        <DeliveryModal
          item={selectedItem}
          closeModal={() => setDeliveryModal(false)}
        />
      )}
      {returnModal && selectedItem && (
        <ReturnModal
          selectedOrder={selectedOrder}
          item={selectedItem}
          closeModal={() => setReturnModal(false)}
          onConfirm={handleChangeStatus}
        />
      )}
      {cancleModal && selectedOrder && selectedItem && (
        <CancleModal
          selectedOrder={selectedOrder}
          item={selectedItem}
          closeModal={() => setCancleModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
      {confirmPurchaseModal && selectedOrder && (
        <ConfimPurchaseModal
          order={selectedOrder}
          userId={user.id}
          closeModal={() => setConfirmPurchaseModal(false)}
          onConfirm={(userId, order) => handlePurchaseConfirm(userId, order)}
        />
      )}
      {confirmPurchaseCompleteModal && selectedOrder && (
        <ConfirmPurchaseCompleteModal
          order={selectedOrder}
          totalPoints={activePoints}
          closeModal={() => setConfirmPurchaseCompleteModal(false)}
        />
      )}
    </div>
  );
}
