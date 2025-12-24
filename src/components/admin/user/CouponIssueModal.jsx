import React, { useState, useEffect } from "react";
import {
  fetchManualCoupons,
  issueManualCoupons,
} from "../../../api/admin/coupon/couponApi";

const CouponIssueModal = ({ isOpen, onClose, selectedUsers }) => {
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    const loadCoupons = async () => {
      const data = await fetchManualCoupons();
      console.log("availableCoupons : ", data);
      setAvailableCoupons(data);
    };
    loadCoupons();
  }, []);

  // 모달이 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedCoupons([]);
    }
  }, [isOpen]);

  const handleCouponToggle = (couponId) => {
    setSelectedCoupons((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      } else {
        return [...prev, couponId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCoupons.length === availableCoupons.length) {
      // 모두 선택되어 있으면 모두 해제
      setSelectedCoupons([]);
    } else {
      // 모두 선택
      setSelectedCoupons(availableCoupons.map((coupon) => coupon.id));
    }
  };

  const handleIssue = async () => {
    if (selectedCoupons.length === 0) {
      alert("발급할 쿠폰을 선택해주세요.");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("선택된 회원이 없습니다.");
      return;
    }

    setLoading(true);

    try {
      // 부모 컴포넌트에서 전달된 발급 함수 호출
      await issueManualCoupons(
        selectedUsers.map((u) => u.id),
        selectedCoupons
      );

      // 성공 후 모달 닫기
      onClose();
      setSelectedCoupons([]);
    } catch (error) {
      console.error("쿠폰 발급 중 오류:", error);
      alert("쿠폰 발급 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 배경 오버레이 */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* 모달 컨테이너 */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* 모달 콘텐츠 */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-4xl">
          {/* 헤더 */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">쿠폰 발급</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              선택된 회원 {selectedUsers.length}명에게 쿠폰을 발급합니다.
            </p>
          </div>

          {/* 본문 */}
          <div className="px-6 py-4">
            {/* 검색창
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="쿠폰명 또는 코드로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
              </div>
            </div> */}
            {/* 선택 정보 */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-blue-700">
                    선택된 회원: {selectedUsers.length}명
                  </span>
                  <span className="ml-4 font-medium text-blue-700">
                    선택된 쿠폰: {selectedCoupons.length}개
                  </span>
                </div>
                {/* <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {selectedCoupons.length === availableCoupons.length
                    ? "전체 해제"
                    : "전체 선택"}
                </button> */}
              </div>

              {/* 선택된 회원 ID 목록 */}
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">회원 ID: </span>
                {selectedUsers
                  .slice(0, 5)
                  .map((user) => user.loginId)
                  .join(", ")}
                {selectedUsers.length > 5 &&
                  ` 외 ${selectedUsers.length - 5}명`}
              </div>
            </div>
            {/* 쿠폰 목록 */}
            <div className="max-h-96 overflow-y-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedCoupons.length === availableCoupons.length &&
                          availableCoupons.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      쿠폰 정보
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      할인 금액
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      유효기간
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {availableCoupons.length > 0 ? (
                    availableCoupons.map((coupon) => (
                      <tr
                        key={coupon.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedCoupons.includes(coupon.id)
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => handleCouponToggle(coupon.id)}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedCoupons.includes(coupon.id)}
                            onChange={() => handleCouponToggle(coupon.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">
                                {coupon.couponName}
                              </span>
                              {/* <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                {coupon.couponCode}
                              </span> */}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {coupon.couponDescription}
                            </p>
                            {coupon.minOrderAmount > 0 && (
                              <p className="text-xs text-gray-400 mt-1">
                                최소 구매금액:{" "}
                                {coupon.minOrderAmount.toLocaleString()}원
                              </p>
                            )}
                            {coupon.minOrderAmount === null && (
                              <p className="text-xs text-gray-400 mt-1">
                                최소 구매금액: 제한없음
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-blue-600">
                            {coupon.discountType === "PERCENTAGE" ? (
                              <>{coupon.discountPercentage}% 할인</>
                            ) : coupon.discountType === "SHIPPING" ? (
                              <>무료배송</>
                            ) : (
                              <>
                                {coupon.fixedDiscountAmount.toLocaleString()}원
                                할인
                              </>
                            )}
                            {coupon.maxDiscountAmount &&
                              coupon.discountType === "PERCENTAGE" && (
                                <div className="text-xs text-gray-500">
                                  (최대{" "}
                                  {coupon.maxDiscountAmount.toLocaleString()}원)
                                </div>
                              )}
                          </div>
                        </td>
                        <td className="px-1 py-3">
                          <div className="text-sm">
                            <span className="font-medium">
                              {coupon.validTo
                                ? `${coupon.validTo.split("T")[0]}`
                                : ""}
                            </span>
                            {coupon.validTo ? ` 까지` : `평생`}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* 선택된 쿠폰 미리보기 */}
            {selectedCoupons.length > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-700 mb-2">
                  선택된 쿠폰 ({selectedCoupons.length}개)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableCoupons
                    .filter((coupon) => selectedCoupons.includes(coupon.id))
                    .map((coupon) => (
                      <div
                        key={coupon.id}
                        className="px-3 py-1 bg-white border border-green-200 rounded-full text-sm"
                      >
                        <span className="font-medium">{coupon.couponName}</span>
                        <span className="ml-1 text-green-600">
                          (
                          {coupon.discountType === "PERCENTAGE"
                            ? `${coupon.discountPercentage}%`
                            : `${coupon.fixedDiscountAmount.toLocaleString()}원`}
                          )
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* 푸터 */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleIssue}
              disabled={loading || selectedCoupons.length === 0}
              className="px-6 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  발급 중...
                </span>
              ) : (
                `쿠폰 발급하기 (${selectedCoupons.length}개)`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponIssueModal;
