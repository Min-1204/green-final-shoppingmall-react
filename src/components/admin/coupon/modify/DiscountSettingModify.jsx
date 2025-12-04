import React from "react";

export default function DiscountSettingModify({
  discountSetting,
  onChangeForm,
}) {
  const disountTypeHandler = (e) => {
    const { name, value } = e.target;
    if (value === "PERCENTAGE") {
      onChangeForm({
        [name]: value,
        fixedDiscountAmount: 0,
        discountPercentage: 0,
        hasLimitMinOrder: false,
        minOrderAmount: 0,
        hasLimitMaxDiscount: false,
        maxDiscountAmount: 0,
      });
    } else {
      onChangeForm({
        [name]: value,
        fixedDiscountAmount: 0,
        discountPercentage: 0,
        hasLimitMinOrder: false,
        minOrderAmount: 0,
        hasLimitMaxDiscount: false,
        maxDiscountAmount: 0,
      });
    }
  };

  const discountValueHandler = (e) => {
    const { name, value } = e.target;
    if (Number(value) < 0) {
      value = 0;
    }
    if (name === "discountPercentage") {
      if (Number(value) > 100) {
        value = 100;
      }
    }
    onChangeForm({ ...discountSetting, [name]: value });
  };

  const hasLimitMinOrderHandler = (e) => {
    const { value } = e.target;
    const bool = value === "true";
    if (!bool) {
      onChangeForm({
        ...discountSetting,
        hasLimitMinOrder: bool,
        minOrderAmount: 0,
      });
    } else {
      onChangeForm({ ...discountSetting, hasLimitMinOrder: bool });
    }
  };

  const minOrderAmountHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...discountSetting, [name]: value });
  };

  const hasLimitMaxDiscountHandler = (e) => {
    const { value } = e.target;
    const bool = value === "true";
    if (!bool) {
      onChangeForm({
        ...discountSetting,
        hasLimitMaxDiscount: bool,
        maxDiscountAmount: 0,
      });
    } else {
      onChangeForm({ ...discountSetting, hasLimitMaxDiscount: bool });
    }
  };

  const maxDiscountAmountHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...discountSetting, [name]: value });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">할인 설정</h2>
      </div>
      <div>
        <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
          {/* 할인 타입 */}
          <div className="flex border-b border-gray-300 items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              할인 타입
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="discountType"
                  value="PERCENTAGE"
                  onChange={disountTypeHandler}
                  checked={discountSetting.discountType === "PERCENTAGE"}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>정률할인(%)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="discountType"
                  value="FIXED"
                  onChange={disountTypeHandler}
                  checked={discountSetting.discountType === "FIXED"}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>정액할인(원)</span>
              </label>
            </div>
          </div>

          {/* 정률 할인 퍼센테이지 */}
          {discountSetting.discountType === "PERCENTAGE" && (
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                정률 할인
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="number"
                  name={"discountPercentage"}
                  value={
                    discountSetting.discountPercentage
                      ? discountSetting.discountPercentage
                      : ""
                  }
                  onChange={discountValueHandler}
                  className="border border-gray-300 p-1 w-32 rounded-md text-right"
                />
                <span className="text-gray-700">%</span>
              </div>
            </div>
          )}

          {/* 고정할인 금액 */}
          {discountSetting.discountType === "FIXED" && (
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                고정 할인
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="number"
                  name={"fixedDiscountAmount"}
                  value={
                    discountSetting.fixedDiscountAmount
                      ? discountSetting.fixedDiscountAmount
                      : ""
                  }
                  onChange={discountValueHandler}
                  className="border border-gray-300 p-1 w-32 rounded-md text-right"
                />
                <span className="text-gray-700">원</span>
              </div>
            </div>
          )}

          {/* 최소 결제금액 설정 */}
          <div className="flex border-b border-gray-300 items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              최소 결제금액
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex flex-col flex-grow p-2 gap-3">
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isLimitMinOrder"
                    value="false"
                    onChange={hasLimitMinOrderHandler}
                    checked={!discountSetting.hasLimitMinOrder}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>제한 없음</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="isLimitMinOrder"
                    value="true"
                    onChange={hasLimitMinOrderHandler}
                    checked={discountSetting.hasLimitMinOrder}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>제한 있음</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">최소 결제금액</span>
                <input
                  type="number"
                  name="minOrderAmount"
                  value={
                    discountSetting.minOrderAmount
                      ? discountSetting.minOrderAmount
                      : ""
                  }
                  onChange={minOrderAmountHandler}
                  disabled={!discountSetting.hasLimitMinOrder}
                  className={`border p-1 w-32 rounded-md text-right ${
                    !discountSetting.hasLimitMinOrder
                      ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "border-gray-300"
                  }`}
                />
                <span
                  className={
                    discountSetting.hasLimitMinOrder
                      ? "text-gray-700"
                      : "text-gray-400"
                  }
                >
                  원 이상 결제시 적용 가능
                </span>
              </div>
            </div>
          </div>

          {/* 최대 할인금액 설정 */}
          {discountSetting.discountType === "PERCENTAGE" && (
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                최대 할인금액
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2 gap-3">
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isLimitMaxDiscount"
                      value="false"
                      onChange={hasLimitMaxDiscountHandler}
                      checked={!discountSetting.hasLimitMaxDiscount}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>제한 없음</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isLimitMaxDiscount"
                      value="true"
                      onChange={hasLimitMaxDiscountHandler}
                      checked={discountSetting.hasLimitMaxDiscount}
                      disabled={discountSetting.discountType === "FIXED"}
                      className="mr-2 accent-blue-600 cursor-pointer"
                    />
                    <span>제한 있음</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="maxDiscountAmount"
                    value={
                      discountSetting.maxDiscountAmount
                        ? discountSetting.maxDiscountAmount
                        : ""
                    }
                    onChange={maxDiscountAmountHandler}
                    disabled={!discountSetting.hasLimitMaxDiscount}
                    className={`border p-1 w-32 rounded-md text-right ${
                      !discountSetting.hasLimitMaxDiscount
                        ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                        : "border-gray-300"
                    }`}
                  />
                  <span
                    className={
                      discountSetting.isLimitMaxDiscount
                        ? "text-gray-700"
                        : "text-gray-400"
                    }
                  >
                    원까지 할인 가능
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
