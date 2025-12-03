import React from "react";

export default function CouponBasicInfo({ basicInfo, onChangeForm }) {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...basicInfo, [name]: value });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">기본 정보</h2>
      </div>

      <div>
        <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
          {/* 쿠폰 이름 */}
          <div className="flex border-b border-gray-300 items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              쿠폰 이름
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-2">
              <input
                type="text"
                name="couponName"
                onChange={onChangeHandler}
                value={basicInfo.couponName}
                className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                placeholder="고객에게 노출되는 명칭입니다."
              />
            </div>
          </div>

          {/* 쿠폰 사용 가능 여부 */}
          <div className="flex items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              사용 가능 여부
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value="USABLE"
                  onChange={onChangeHandler}
                  checked={basicInfo.availability === "USABLE"}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>사용가능</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value="USABLE_BUT_UNISSUABLE"
                  onChange={onChangeHandler}
                  checked={basicInfo.availability === "USABLE_BUT_UNISSUABLE"}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>사용가능(발급불가)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  value="UNUSABLE"
                  onChange={onChangeHandler}
                  checked={basicInfo.availability === "UNUSABLE"}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>사용불가</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
