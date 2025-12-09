import React, { useState } from "react";
import OrderSearchResultTable from "./OrderSearchResultTable";
import CheckboxGroup from "../CheckboxGroup";
import dayjs from "dayjs";

const AdminOrderMgrComponent = () => {
  const [selectedSearchType, setSelectedSearchType] = useState("주문번호");
  const [orderNumber, setOrderNumber] = useState(""); // 주문번호
  const [ordererName, setOrdererName] = useState(""); // 주문자명
  const [productName, setProductName] = useState(""); // 상품명
  //날짜
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPreStatuses, setSelectedPreStatuses] = useState([]); //주문상태
  const [selectedPostStatuses, setSelectedPostStatuses] = useState([]); //배송상태
  const [selectedDelivery, setSelectedDelivery] = useState([]); //배송방법 state
  const [selectedPayment, setSelectedPayment] = useState([]); //주문결제 state
  const [selectedOrderType, setSelectedOrderType] = useState([]); //주문유형 state
  // const [selectedPaymentStatus, setSelectedPaymentStatus] = useState([]); //결제상태 state

  const allPreStatuses = [
    "주문접수",
    "결제확인",
    "주문취소",
    "취소 신청",
    "취소 완료",
    "교환 신청",
    "교환 완료",
    "반품/환불 신청",
    "반품/환불 완료",
    "전체",
  ];
  const allPostStatuses = ["배송준비중", "배송중", "배송완료", "전체"];
  const allDelivery = ["대한통운", "우체국", "직접입력"];
  const allPayment = [
    "신용/체크카드",
    "카카오페이",
    "네이버페이",
    "PAYCO",
    "휴대폰 결제",
    "계좌이체",
    "전체",
  ];
  // const allOrderType = ["고객주문", "관리자주문"];
  // const allPaymentStatus = [
  //   "무통장입금 대기",
  //   "카드결제입금 대기",
  //   "소액결제입금 대기",
  //   "무통장입금완료",
  //   "카드결제완료",
  //   "소액결제완료",
  // ];

  const dateHandler = (label) => {
    let today = dayjs(); //오늘 기준
    let start;

    if (label === "오늘") {
      start = today;
    } else if (label === "1주일") {
      start = today.subtract(6, "day"); //오늘 포함 1주일
    } else if (label === "14일") {
      start = today.subtract(13, "day");
    } else if (label === "1개월") {
      start = today.subtract(1, "month");
    } else if (label === "3개월") {
      start = today.subtract(3, "month");
    } else if (label === "6개월") {
      start = today.subtract(6, "month");
    } else {
      start = today;
    }

    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(today.format("YYYY-MM-DD"));
  };

  const changeHandler = (value) => {
    // 모든 state를 초기화 (선택이 바뀌었을 경우 이전 값 제거)
    setOrderNumber("");
    setProductName("");
    setOrdererName("");

    // 현재 선택된 검색 기준에 따라 해당 state에 값 저장
    if (selectedSearchType === "주문번호") {
      setOrderNumber(value);
      console.log("주문번호", orderNumber);
    } else if (selectedSearchType === "주문자명") {
      setOrdererName(value);
      console.log("주문자명", ordererName);
    } else if (selectedSearchType === "상품명") {
      setProductName(value);
      console.log("상품명", productName);
    }
  };

  const searchHandler = () => {
    const request = {
      orderNumber: orderNumber,
      ordererName: ordererName,
      productName: productName,
      startDate: startDate,
      endDate: endDate,
      selectedPreStatuses: selectedPreStatuses,
      selectedPostStatuses: selectedPostStatuses,
      selectedDelivery: selectedDelivery,
      selectedPayment: selectedPayment,
      selectedOrderType: selectedOrderType,
    };
  };

  const resetFiltersHandler = () => {
    setSelectedSearchType("주문번호");
    setOrderNumber("");
    setOrdererName("");
    setProductName("");
    setStartDate("");
    setEndDate("");
    setSelectedPreStatuses([]);
    setSelectedPostStatuses([]);
    setSelectedDelivery([]);
    setSelectedPayment([]);
    setSelectedOrderType([]);
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter'] min-h-screen">
      {/* 헤더 */}
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6 flex justify-between items-center px-2">
        전체 주문 조회
        <div className="space-x-2 text-sm">
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-700 cursor-pointer hover:bg-gray-100 transition shadow-sm">
            엑셀 다운로드
          </button>
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-700 cursor-pointer hover:bg-gray-100 transition shadow-sm">
            프린트 설정
          </button>
        </div>
      </h2>

      {/* 필터 영역 */}

      <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
        {/* 검색어 */}
        <div className="flex border-b border-gray-300">
          <div className="w-40 bg-gray-50 border-r border-gray-300 font-semibold text-gray-700 flex items-center justify-center p-2 min-h-[44px]">
            검색어
          </div>
          <div className="p-2 flex items-center flex-wrap flex-grow gap-x-3">
            <select
              className="border border-gray-300 p-1 mr-2 bg-white cursor-pointer h-[32px] rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => setSelectedSearchType(e.target.value)} // 선택된 값을 selectedSearchType에 저장
              value={selectedSearchType} // 현재 선택된 값 표시
            >
              <option>주문번호</option>
              <option>주문자명</option>
              <option>상품명</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="border border-gray-300 p-1 w-80 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={(e) => changeHandler(e.target.value)}
              value={
                selectedSearchType === "주문번호"
                  ? orderNumber
                  : selectedSearchType === "주문자명"
                  ? ordererName
                  : selectedSearchType === "상품명"
                  ? productName
                  : ""
              }
            />
            {/* <label className="ml-2 flex items-center select-none cursor-pointer text-gray-600 hover:text-gray-800 transition">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 mr-1 border border-gray-400 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />{" "}
              부분검색
            </label> */}
          </div>
        </div>

        {/* 날짜 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 font-semibold text-gray-700 flex items-center justify-center p-2 min-h-[44px]">
            날짜
          </div>
          <div className="p-2 flex items-center flex-wrap flex-grow gap-x-3">
            <select className="border border-gray-300 p-1 mr-2 bg-white cursor-pointer h-[32px] rounded-md focus:ring-blue-500 focus:border-blue-500 transition">
              <option>주문일</option>
              <option>결제일</option>
            </select>
            <div className="flex items-center gap-1">
              <input
                type="date"
                value={startDate}
                className="border border-gray-300 p-1 bg-white cursor-pointer h-[32px] rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                value={endDate}
                className="border border-gray-300 p-1 bg-white cursor-pointer h-[32px] rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex gap-1 ml-2">
              {["오늘", "1주일", "14일", "1개월", "3개월", "6개월"].map(
                (label) => (
                  <button
                    key={label}
                    className="border border-gray-300 bg-white px-2 py-1 text-gray-700 text-xs cursor-pointer rounded-md hover:bg-blue-50 hover:border-blue-500 transition"
                    onClick={() => dateHandler(label)}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* 체크박스 그룹 */}
        <CheckboxGroup
          title="주문상태"
          options={allPreStatuses}
          selectedOptions={selectedPreStatuses}
          setSelectedOptions={setSelectedPreStatuses}
          showAll={true}
        />
        <CheckboxGroup
          title="배송상태"
          options={allPostStatuses}
          selectedOptions={selectedPostStatuses}
          setSelectedOptions={setSelectedPostStatuses}
          showAll={true}
        />
        <CheckboxGroup
          title="배송방법"
          options={allDelivery}
          selectedOptions={selectedDelivery}
          setSelectedOptions={setSelectedDelivery}
        />
        <CheckboxGroup
          title="주문결제"
          options={allPayment}
          selectedOptions={selectedPayment}
          setSelectedOptions={setSelectedPayment}
        />
        {/* <CheckboxGroup
          title="주문유형"
          options={allOrderType}
          selectedOptions={selectedOrderType}
          setSelectedOptions={setSelectedOrderType}
        /> */}
        {/* <CheckboxGroup
          title="결제상태"
          options={allPaymentStatus}
          selectedOptions={selectedPaymentStatus}
          setSelectedOptions={setSelectedPaymentStatus}
        /> */}
      </div>

      {/* 검색 버튼 */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-md shadow-md hover:bg-blue-700 transition font-semibold"
          onClick={() => searchHandler()}
        >
          검색
        </button>
        <button
          className="border border-gray-300 bg-white px-8 py-2 text-gray-700 cursor-pointer rounded-md shadow-md hover:bg-gray-100 transition font-semibold"
          onClick={() => resetFiltersHandler()}
        >
          초기화
        </button>
      </div>

      <OrderSearchResultTable />
    </div>
  );
};

export default AdminOrderMgrComponent;
