import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CouponSearchList({ coupons }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const handleSelectAll = (e) => {
    setSelectedCoupons(e.target.checked ? coupons.map((c) => c.id) : []);
  };

  const handleSelectCoupon = (id) => {
    setSelectedCoupons((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const goToModifyPage = (id) => {
    navigate(`/admin/coupon/modify/${id}`);
  };

  return (
    <div className="w-full bg-white text-sm">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-700">
          목록 <span className="text-blue-600">(총 {coupons.length}개)</span>
        </div>
        <select
          className="border border-gray-300 px-3 py-1 rounded-md text-sm bg-white cursor-pointer"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={25}>25개씩 보기</option>
          <option value={50}>50개씩 보기</option>
          <option value={100}>100개씩 보기</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700 font-semibold text-sm">
              <th className="px-4 py-3 text-center border-r border-gray-300 w-12">
                <input
                  type="checkbox"
                  checked={selectedCoupons.length === coupons.length}
                  onChange={handleSelectAll}
                  className="cursor-pointer accent-blue-600"
                />
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                관리
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                쿠폰 이름
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                쿠폰 코드
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                사용 기간
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                사용 가능 여부
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                발급 방식
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                발급 대상
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                할인 정보
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                할인 타입
              </th>
              <th className="px-4 py-3 text-center border-r border-gray-300 whitespace-nowrap">
                발급 기간
              </th>
              <th className="px-4 py-3 text-center whitespace-nowrap">
                발급 현황
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr
                key={coupon.id}
                className={`transition ${
                  coupon.deleted ? "bg-gray-100 opacity-60" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 text-center border-r border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedCoupons.includes(coupon.id)}
                    onChange={() => handleSelectCoupon(coupon.id)}
                    className="cursor-pointer accent-blue-600"
                  />
                </td>
                <td className="px-4 py-3 text-center border-r border-gray-200">
                  <div className="flex gap-1 justify-center">
                    <button
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 cursor-pointer transition shadow-sm"
                      onClick={() => goToModifyPage(coupon.id)}
                    >
                      수정
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {coupon.couponName}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap text-gray-600">
                  {coupon.couponCode}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {coupon.validFrom?.replace("T", " ")} ~{" "}
                  {coupon.validTo?.replace("T", " ")}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      coupon.availability === "USABLE"
                        ? "bg-green-100 text-green-700"
                        : coupon.availability === "USABLE_BUT_UNISSUABLE"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {coupon.availability === "USABLE"
                      ? "사용가능"
                      : coupon.availability === "USABLE_BUT_UNISSUABLE"
                      ? "사용가능(발급불가)"
                      : "사용불가"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {(() => {
                    switch (coupon.issueType) {
                      case "MANUAL":
                        return "관리자 발급";
                      case "AUTO":
                        return "자동 발급";
                      case "CODE":
                        return "쿠폰 코드 입력";
                    }
                  })()}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {(() => {
                    switch (coupon.autoIssueTrigger) {
                      case "LOGIN":
                        return "로그인 유저";
                      case "ALL_USER":
                        return "전체 유저";
                      default:
                        return "";
                    }
                  })()}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {coupon.discountType === "FIXED"
                    ? coupon.fixedDiscountAmount.toLocaleString()
                    : coupon.discountPercentage}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap">
                  {coupon.discountType === "FIXED"
                    ? "정액할인(원)"
                    : "정률할인(%)"}
                </td>
                <td className="px-4 py-3 text-sm text-center border-r border-gray-200 whitespace-nowrap text-gray-600">
                  {coupon.issuableStartDate?.replace("T", " ")} ~{" "}
                  {coupon.issuableEndDate?.replace("T", " ")}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.issueCount}개
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 py-6 border-t border-gray-200">
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
          <ChevronsLeft size={16} className="text-gray-600" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded font-semibold shadow-sm">
          {currentPage}
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
          <ChevronRight size={16} className="text-gray-600" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition">
          <ChevronsRight size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
