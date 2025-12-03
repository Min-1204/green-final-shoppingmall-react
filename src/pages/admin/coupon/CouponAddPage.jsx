import React, { useEffect, useState } from "react";
import CouponBasicInfo from "../../../components/admin/coupon/CouponBasicInfo";
import DiscountSetting from "../../../components/admin/coupon/DiscountSetting";
import IssueSetting from "../../../components/admin/coupon/IssueSetting";
import PeriodSetting from "../../../components/admin/coupon/PeriodSetting";
import { registerCoupon } from "../../../api/admin/coupon/couponApi";

const initState = {
  basicInfo: { couponName: "", availability: "USABLE" },
  discountSetting: {
    discountType: "PERCENTAGE",
    fixedDiscountAmount: 0,
    discountPercentage: 0,
    hasLimitMinOrder: false,
    minOrderAmount: 0,
    hasLimitMaxDiscount: false,
    maxDiscountAmount: 0,
  },
  issueSetting: {
    issueType: "AUTO",
    couponCode: "",
    autoIssueType: "NEWUSER",
    autoIssueTrigger: "LOGIN",
    totalQuantity: 0,
  },
  periodSetting: {
    hasLimitUsagePeriod: true,
    validFrom: "",
    validTo: "",
    issuableStartDate: "",
    issuableEndDate: "",
  },
};

const CouponAddPage = () => {
  const [couponRegisterForm, setCouponRegisterForm] = useState({
    ...initState,
  });

  useEffect(() => {
    console.log("couponRegisterForm : ", couponRegisterForm);
  }, [couponRegisterForm]);

  const submitHandler = () => {
    const register = async () => {
      const result = await registerCoupon({
        ...couponRegisterForm.basicInfo,
        ...couponRegisterForm.discountSetting,
        ...couponRegisterForm.issueSetting,
        ...couponRegisterForm.periodSetting,
      });
      console.log("result : ", result);
    };
    register();
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-8 pb-40">
        <CouponBasicInfo
          basicInfo={couponRegisterForm?.basicInfo}
          onChangeForm={(data) =>
            setCouponRegisterForm((prev) => ({ ...prev, basicInfo: data }))
          }
        />
        <DiscountSetting
          discountSetting={couponRegisterForm?.discountSetting}
          onChangeForm={(data) =>
            setCouponRegisterForm((prev) => ({
              ...prev,
              discountSetting: data,
            }))
          }
        />
        <IssueSetting
          issueSetting={couponRegisterForm?.issueSetting}
          onChangeForm={(data) =>
            setCouponRegisterForm((prev) => ({ ...prev, issueSetting: data }))
          }
        />
        <PeriodSetting
          periodSetting={couponRegisterForm?.periodSetting}
          onChangeForm={(data) =>
            setCouponRegisterForm((prev) => ({ ...prev, periodSetting: data }))
          }
        />
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCouponRegisterForm({ ...initState })}
              className="px-6 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={submitHandler}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              상품 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponAddPage;
