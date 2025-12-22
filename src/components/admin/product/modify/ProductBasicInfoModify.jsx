import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProductBasicInfoModify({ existingData, onChangeForm }) {
  const [productBasicInfo, setProductBasicInfo] = useState({
    productName: "",
    searchKeywords: "",
    description: "",
  });

  useEffect(() => {
    setProductBasicInfo({
      productName: existingData?.productName,
      searchKeywords: existingData?.searchKeywords,
      description: existingData?.description,
    });
  }, [existingData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    const updatedBasicInfo = {
      ...productBasicInfo,
      [name]: value,
    };

    setProductBasicInfo(updatedBasicInfo);
    onChangeForm(updatedBasicInfo);
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">기본 정보</h2>
      </div>

      {
        <div>
          {/* 필터 전체 영역 */}
          <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
            {/* 상품명 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                상품명
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="productName"
                  onChange={onChangeHandler}
                  value={productBasicInfo?.productName}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="상품명을 입력하세요"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {productBasicInfo?.productName?.length} / 255
                </span>
              </div>
            </div>

            {/* 검색어 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                검색어
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="searchKeywords"
                  onChange={onChangeHandler}
                  value={productBasicInfo?.searchKeywords}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="검색어를 입력하세요"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {productBasicInfo?.searchKeywords?.length} / 255
                </span>
              </div>
            </div>

            {/* 간략 설명 */}
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                간략 설명
              </div>
              <div className="flex flex-col flex-grow p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="description"
                    onChange={onChangeHandler}
                    value={productBasicInfo?.description}
                    placeholder="간략한 상품 설명을 적어주세요"
                    className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  />
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {productBasicInfo?.description?.length} / 255
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * 구글 쇼핑 및 페이스북 픽셀 연동 시 필수 입력 항목입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
