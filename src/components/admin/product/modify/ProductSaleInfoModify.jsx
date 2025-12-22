import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const init = {
  saleStatus: "ON_SALE",
  exposureStatus: "EXPOSURE",
  isCancelable: true,
  useRestockNoti: false,
};

export default function ProductSaleInfoModify({ existingData, onChangeForm }) {
  // useState 로 관리 안하도록 변경
  const saleInfo = existingData || init;

  // 데이터가 로드되기 전에는 렌더링하지 않음
  if (!existingData) {
    return <div>Loading...</div>;
  }

  const onCheckBoxChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedSaleInfo = {
      ...saleInfo,
      [name]: type === "checkbox" ? checked : value,
    };
    onChangeForm(updatedSaleInfo);
  };

  const onCancelableHandler = (e) => {
    const { name, value } = e.target;

    const updatedSaleInfo = {
      ...saleInfo,
      [name]: value === "true" ? true : false,
    };
    onChangeForm(updatedSaleInfo);
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">판매 정보</h2>
      </div>

      {
        <div>
          {/* 필터 전체 영역 */}
          <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
            {/* 판매 상태 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                판매 상태
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2 gap-3">
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saleStatus"
                      onChange={onCheckBoxChangeHandler}
                      value="ON_SALE"
                      checked={saleInfo?.saleStatus === "ON_SALE"}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>판매중</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saleStatus"
                      onChange={onCheckBoxChangeHandler}
                      value="SOLD_OUT"
                      checked={saleInfo?.saleStatus === "SOLD_OUT"}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>품절</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saleStatus"
                      onChange={onCheckBoxChangeHandler}
                      value="STOP_SALE"
                      checked={saleInfo?.saleStatus === "STOP_SALE"}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>판매중지</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="saleStatus"
                      onChange={onCheckBoxChangeHandler}
                      value="RESTOCK"
                      checked={saleInfo?.saleStatus === "RESTOCK"}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>재입고 상품</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="useRestockNoti"
                      onChange={onCheckBoxChangeHandler}
                      checked={saleInfo?.useRestockNoti}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>안전 재고 미만으로 떨어질 시 재입고 알림 사용</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 노출 여부 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                노출 여부
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="exposureStatus"
                    value="EXPOSURE"
                    onChange={onCheckBoxChangeHandler}
                    checked={saleInfo?.exposureStatus === "EXPOSURE"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>노출</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="exposureStatus"
                    value="HIDDEN"
                    onChange={onCheckBoxChangeHandler}
                    checked={saleInfo?.exposureStatus === "HIDDEN"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>미노출</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="exposureStatus"
                    value="SCHEDULED"
                    onChange={onCheckBoxChangeHandler}
                    checked={saleInfo?.exposureStatus === "SCHEDULED"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>노출 예약</span>
                </label>
              </div>
            </div>

            {/* 청약철회 */}
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                청약철회
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isCancelable"
                    value="true"
                    onChange={onCancelableHandler}
                    checked={saleInfo?.isCancelable}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>가능</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isCancelable"
                    value="false"
                    onChange={onCancelableHandler}
                    checked={!saleInfo?.isCancelable}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>불가 (취소/교환/반품 불가)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
