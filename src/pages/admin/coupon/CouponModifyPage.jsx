import React, { useEffect, useState } from "react";
import {
  fetchCouponById,
  modifyCoupon,
} from "../../../api/admin/coupon/couponApi";
import { useNavigate, useParams } from "react-router-dom";
import CouponBasicInfoModify from "../../../components/admin/coupon/modify/CouponBasicInfoModify";
import DiscountSettingModify from "../../../components/admin/coupon/modify/DiscountSettingModify";
import IssueSettingModify from "../../../components/admin/coupon/modify/IssueSettingModify";
import PeriodSettingModify from "../../../components/admin/coupon/modify/PeriodSettingModify";

const initState = {
  basicInfo: { couponName: "", couponDescription: "", availability: "USABLE" },
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
  if (day) {
    let startDay = new Date(day);
    startDay.setUTCHours(0, 0, 0, 0);
    return startDay.toISOString();
  }
};

const getEndTimeOfDay = (day) => {
  if (day) {
    let endDay = new Date(day);
    endDay.setUTCHours(23, 59, 59, 999);
    return endDay.toISOString();
  }
};

const CouponModifyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [couponModifyForm, setCouponModifyForm] = useState({
    ...initState,
  });

  useEffect(() => {
    const loadCouponData = async () => {
      const data = await fetchCouponById(id);
      setCouponModifyForm({ ...data });
      console.log("couponData : ", data);
    };
    loadCouponData();
  }, [id]);

  useEffect(() => {
    console.log("couponModifyForm : ", couponModifyForm);
  }, [couponModifyForm]);

  const submitHandler = () => {
    const modify = async () => {
      const result = await modifyCoupon({
        ...couponModifyForm,
        validFrom: getStartTimeOfDay(couponModifyForm.validFrom),
        validTo: getEndTimeOfDay(couponModifyForm.validTo),
        issuableStartDate: getStartTimeOfDay(
          couponModifyForm.issuableStartDate
        ),
        issuableEndDate: getEndTimeOfDay(couponModifyForm.issuableEndDate),
      });
      console.log("result : ", result);
    };
    modify();
    navigate(`/admin/coupon/search`);
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-8 pb-40">
        <CouponBasicInfoModify
          basicInfo={{
            couponName: couponModifyForm.couponName,
            couponDescription: couponModifyForm.couponDescription,
            availability: couponModifyForm.availability,
          }}
          onChangeForm={(data) =>
            setCouponModifyForm((prev) => ({ ...prev, ...data }))
          }
        />
        <DiscountSettingModify
          discountSetting={{
            discountType: couponModifyForm.discountType,
            fixedDiscountAmount: couponModifyForm.fixedDiscountAmount,
            discountPercentage: couponModifyForm.discountPercentage,
            hasLimitMinOrder: couponModifyForm.hasLimitMinOrder,
            minOrderAmount: couponModifyForm.minOrderAmount,
            hasLimitMaxDiscount: couponModifyForm.hasLimitMaxDiscount,
            maxDiscountAmount: couponModifyForm.maxDiscountAmount,
          }}
          onChangeForm={(data) =>
            setCouponModifyForm((prev) => ({
              ...prev,
              ...data,
            }))
          }
        />
        <IssueSettingModify
          issueSetting={{
            issueType: couponModifyForm.issueType,
            couponCode: couponModifyForm.couponCode,
            autoIssueType: couponModifyForm.autoIssueType,
            autoIssueTrigger: couponModifyForm.autoIssueTrigger,
            totalQuantity: couponModifyForm.totalQuantity,
          }}
          onChangeForm={(data) =>
            setCouponModifyForm((prev) => ({ ...prev, ...data }))
          }
        />
        <PeriodSettingModify
          periodSetting={{
            hasLimitUsagePeriod: couponModifyForm.hasLimitUsagePeriod,
            validFrom: couponModifyForm.validFrom
              ? couponModifyForm.validFrom.split("T")[0]
              : "",
            validTo: couponModifyForm.validTo
              ? couponModifyForm.validTo.split("T")[0]
              : "",
            issuableStartDate: couponModifyForm.issuableStartDate
              ? couponModifyForm.issuableStartDate.split("T")[0]
              : "",
            issuableEndDate: couponModifyForm.issuableEndDate
              ? couponModifyForm.issuableEndDate.split("T")[0]
              : "",
          }}
          onChangeForm={(data) =>
            setCouponModifyForm((prev) => ({ ...prev, ...data }))
          }
        />
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCouponModifyForm({ ...initState })}
              className="px-6 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={submitHandler}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              쿠폰 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModifyPage;
