import React, { useEffect, useState } from "react";
import CouponBasicInfo from "../../../components/admin/coupon/CouponBasicInfo";
import DiscountSetting from "../../../components/admin/coupon/DiscountSetting";
import IssueSetting from "../../../components/admin/coupon/IssueSetting";
import PeriodSetting from "../../../components/admin/coupon/PeriodSetting";
import { registerCoupon } from "../../../api/admin/coupon/couponApi";
import { useNavigate } from "react-router-dom";

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

const getStartTimeOfDay = (day) => {
  let startDay = new Date(day);
  startDay.setUTCHours(0, 0, 0, 0);
  return startDay.toISOString();
};

const getEndTimeOfDay = (day) => {
  let endDay = new Date(day);
  endDay.setUTCHours(23, 59, 59, 999);
  return endDay.toISOString();
};

const CouponAddPage = () => {
  const navigate = useNavigate();
  const [couponRegisterForm, setCouponRegisterForm] = useState({
    ...initState,
  });

  useEffect(() => {
    console.log("couponRegisterForm : ", couponRegisterForm);
  }, [couponRegisterForm]);

  const validateRequiredField = () => {
    if (couponRegisterForm.basicInfo.couponName.trim() === "") {
      alert("쿠폰 이름은 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (
      couponRegisterForm.discountSetting.discountPercentage === 0 &&
      couponRegisterForm.discountSetting.fixedDiscountAmount === 0
    ) {
      alert("정률할인 % 또는 정액할인 금액을 입력하셔야 합니다.");
      return true;
    } else if (couponRegisterForm.issueSetting.totalQuantity === 0) {
      alert("최대발급 수량은 1이상 이어야 합니다.");
      return true;
    } else if (couponRegisterForm.periodSetting.hasLimitUsagePeriod) {
      if (couponRegisterForm.periodSetting.validFrom.trim() === "") {
        alert("사용기간 제한이 있다면 사용기간을 설정해 주셔야합니다.");
        return true;
      }
      if (couponRegisterForm.periodSetting.validTo.trim() === "") {
        alert("사용기간 제한이 있다면 사용기간을 설정해 주셔야합니다.");
        return true;
      }
    }

    return false;
  };

  const submitHandler = () => {
    if (validateRequiredField()) {
      return;
    }

    const register = async () => {
      const result = await registerCoupon({
        ...couponRegisterForm.basicInfo,
        ...couponRegisterForm.discountSetting,
        ...couponRegisterForm.issueSetting,
        ...couponRegisterForm.periodSetting,
        validFrom:
          couponRegisterForm.periodSetting.validFrom.trim() === ""
            ? ""
            : getStartTimeOfDay(couponRegisterForm.periodSetting.validFrom),
        validTo:
          couponRegisterForm.periodSetting.validTo.trim() === ""
            ? ""
            : getEndTimeOfDay(couponRegisterForm.periodSetting.validTo),
        issuableStartDate:
          couponRegisterForm.periodSetting.issuableStartDate.trim() === ""
            ? ""
            : getStartTimeOfDay(
                couponRegisterForm.periodSetting.issuableStartDate
              ),
        issuableEndDate:
          couponRegisterForm.periodSetting.issuableEndDate.trim() === ""
            ? ""
            : getEndTimeOfDay(couponRegisterForm.periodSetting.issuableEndDate),
      });
      console.log("result : ", result);
      if (result === "ok") {
        alert("쿠폰이 성공적으로 등록되었습니다.");
        navigate("/admin/coupon/search");
      }
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
