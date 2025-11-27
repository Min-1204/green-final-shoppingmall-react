import React from "react";

export default function ProductPurchaseInfo({ detailInfo }) {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
        구매정보
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* 데스크톱 테이블 뷰 */}
        <table className="hidden md:table w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 w-56 font-semibold text-gray-700 text-left align-top">
                용량 또는 중량
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.capacity}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                피부타입
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.skinType}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                사용기한(또는 개봉 후 사용기간)
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.usagePeriod}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                사용방법
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.usageMethod}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                화장품제조업자,화장품책임판매업자 및 맞춤형화장품판매업자
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.manufacturer}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                제조국
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.madeInCountry}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                화장품법에 따라 기재해야 하는 모든 성분
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.ingredients}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                기능성 화장품 식품의약품안전처 심사필 여부
              </th>
              <td className="p-4 text-gray-600 leading-relaxed align-top">
                {detailInfo.functionalCertification}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                사용할 때의 주의사항
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.caution}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                품질보증기준
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.qualityGuarantee}
              </td>
            </tr>

            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <th className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 font-semibold text-gray-700 text-left align-top">
                소비자 상담 관련 전화번호
              </th>
              <td className="p-4 text-gray-600 align-top">
                {detailInfo.customerServiceNumber}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 모바일 카드 뷰 */}
        <div className="md:hidden divide-y divide-gray-100">
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              용량 또는 중량
            </div>
            <div className="text-gray-600 text-sm">{detailInfo.capacity}</div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              피부타입
            </div>
            <div className="text-gray-600 text-sm">{detailInfo.skinType}</div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              사용기한(또는 개봉 후 사용기간)
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.usagePeriod}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              사용방법
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.usageMethod}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              화장품제조업자,화장품책임판매업자 및 맞춤형화장품판매업자
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.manufacturer}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              제조국
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.madeInCountry}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              화장품법에 따라 기재해야 하는 모든 성분
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.ingredients}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              기능성 화장품 식품의약품안전처 심사필 여부
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">
              {detailInfo.functionalCertification}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              사용할 때의 주의사항
            </div>
            <div className="text-gray-600 text-sm">{detailInfo.caution}</div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              품질보증기준
            </div>
            <div className="text-gray-600 text-sm">
              {detailInfo.qualityGuarantee}
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="font-semibold text-gray-700 text-sm mb-2">
              소비자 상담 관련 전화번호
            </div>
            <div className="text-gray-600 text-sm">
              <a
                href="tel:080-080-1510"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {detailInfo.customerServiceNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
