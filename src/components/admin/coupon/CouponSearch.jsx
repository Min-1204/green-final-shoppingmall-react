import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
} from "lucide-react";

export default function CouponSearch() {
  const [currentPage, setCurrentPage] = useState(1);

  const coupons = [
    {
      id: 1,
      name: "브리스 특가 쿠폰",
      code: "MSCP220901250924",
      useDate: "제한 없음",
      type: "사용",
      usage: "전체",
      issueMethod: "관리자 수동 발급",
      issueTarget: "전체 회원",
      amount: "3,000",
      discountType: "정액할인(원)",
      status: "본사",
      issuePeriod: "2022-09-01 00:00:00 ~ 2023-03-01 23:56:59",
      validPeriod: "3",
    },
    {
      id: 2,
      name: "특판가입 쿠폰",
      code: "MSCP220901134244",
      useDate: "2022-09-01 00:00:00 ~ 2023-03-01 23:56:59",
      type: "사용",
      usage: "전체",
      issueMethod: "관리자 수동 발급",
      issueTarget: "전체 회원",
      amount: "2,000",
      discountType: "정액할인(원)",
      status: "본사",
      issuePeriod: "2022-09-01 00:00:00 ~ 2023-03-01 23:56:59",
      validPeriod: "3",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <h1 className="text-lg font-semibold">
          쿠폰 리스트 (다른 조건 빼고 심플하게 쿠폰이름으로만 검색할 수도 있음)
        </h1>
        <button className="w-5 h-5 flex items-center justify-center border rounded text-xs">
          X
        </button>
      </div>

      {/* Search Filter Section */}
      <div className="border-b">
        <div className="p-4">
          {/* 검색 */}
          <div className="flex items-center mb-3">
            <div className="w-32 text-sm">검색</div>
            <div className="flex-1 flex items-center gap-2">
              <select className="px-3 py-2 border rounded w-48">
                <option>쿠폰 이름</option>
              </select>
              <input type="text" className="flex-1 px-3 py-2 border rounded" />
            </div>
          </div>

          {/* 등록 기간 */}
          <div className="flex items-center mb-3">
            <div className="w-32 text-sm">등록 기간</div>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  className="w-40 px-3 py-2 border rounded pr-8"
                />
                <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <span>~</span>
              <div className="relative">
                <input
                  type="text"
                  className="w-40 px-3 py-2 border rounded pr-8"
                />
                <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="flex gap-1 ml-2">
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  오늘
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  1주
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  15일
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  1개월
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  3개월
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  6개월
                </button>
              </div>
            </div>
          </div>

          {/* 쿠폰 종류 and 쿠폰 사용범위 */}
          <div className="flex items-center mb-3">
            <div className="w-32 text-sm">쿠폰 종류</div>
            <div className="flex-1 flex items-center gap-8">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">상품쿠폰</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">장바구니 쿠폰</span>
                </label>
              </div>
            </div>
          </div>

          {/* 할인 타입 and 발급 방식 */}
          <div className="flex items-center mb-3">
            <div className="w-32 text-sm">할인 타입</div>
            <div className="flex-1 flex items-center gap-8">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">정률할인(%)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">정액할인(원)</span>
                </label>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm">발급 방식</span>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">관리자 수동 발급</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">특정 조건 자동 발급</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">고객 다운로드</span>
                </label>
              </div>
            </div>
          </div>

          {/* 발급 대상 and 쿠폰 사용여부 */}
          <div className="flex items-center mb-4">
            <div className="w-32 text-sm">발급 대상</div>
            <div className="flex-1 flex items-center gap-8">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">전체 회원</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">회원 그룹</span>
                </label>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm">쿠폰 사용여부</span>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">사용</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">사용(발급불가)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">사용불가</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-2">
            <button className="px-8 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
              검색
            </button>
            <button className="px-8 py-2 border rounded hover:bg-gray-50 cursor-pointer">
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm">
          목록<span className="text-green-500">(총 2개)</span>
        </div>
        <select className="px-3 py-1 border rounded text-sm">
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-t border-b">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                관리
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                쿠폰 이름
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                쿠폰 번호
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                쿠폰 설명
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                사용 기간
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                쿠폰 사용여부
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                쿠폰 사용범위
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                발급 방식
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                발급 대상
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                할인 정보
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                할인 타입
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                할인 부담
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                발급 기간
              </th>
              <th className="px-4 py-3 text-sm font-medium text-center border-b whitespace-nowrap">
                발급 인원
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-center">
                  <div className="flex gap-1 justify-center">
                    <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer">
                      수정
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer">
                      삭제
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer">
                      발급
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.name}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.code}
                </td>
                <td className="px-4 py-3 text-sm text-center"></td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.useDate}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.type}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.usage}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.issueMethod}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.issueTarget}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.amount}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.discountType}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.status}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.issuePeriod}
                </td>
                <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                  {coupon.validPeriod}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 p-6">
        <button className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
          <ChevronsLeft size={16} />
        </button>
        <button className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
          <ChevronLeft size={16} />
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer">
          1
        </button>
        <button className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
          <ChevronRight size={16} />
        </button>
        <button className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}
