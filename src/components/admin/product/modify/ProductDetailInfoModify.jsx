import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const init = {
  capacity: "",
  skinType: "",
  usagePeriod: "",
  usageMethod: "",
  manufacturer: "",
  madeInCountry: "",
  ingredients: "",
  functionalCertification: "",
  caution: "",
  qualityGuarantee: "",
  customerServiceNumber: "",
};

function ProductDetailInfoModify({ existingData, onChangeForm }) {
  const [isOpen, setIsOpen] = useState(true);
  const [productDetailInfo, setProductDetailInfo] = useState(init);

  useEffect(() => {
    if (existingData) {
      setProductDetailInfo({ ...existingData });
    }
  }, [existingData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    const updatedInfo = { ...productDetailInfo, [name]: value };
    setProductDetailInfo({ ...updatedInfo });
    onChangeForm({ ...updatedInfo });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-3 border-b cursor-pointer"
      >
        <h2 className="text-lg font-semibold text-gray-800">상품 상세 정보</h2>

        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* 안내 메시지 */}
          <div className="mb-4 mt-4 px-2">
            <p className="text-sm text-gray-500">
              * 화장품법에 따른 표시·광고 준수사항을 입력해 주세요.
            </p>
          </div>

          {/* 필터 전체 영역 */}
          <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
            {/* 용량 또는 중량 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                용량 또는 중량
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="capacity"
                  onChange={onChangeHandler}
                  value={productDetailInfo.capacity || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 50ml, 100g"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.capacity || "").length} / 255
                </span>
              </div>
            </div>

            {/* 피부 타입 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                피부 타입
              </div>
              <div className="flex items-center grow p-2 gap-2">
                <input
                  type="text"
                  name="skinType"
                  onChange={onChangeHandler}
                  value={productDetailInfo.skinType || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 모든 피부, 민감성 피부"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.skinType || "").length} / 255
                </span>
              </div>
            </div>

            {/* 사용기한 또는 개봉후 사용기간 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                사용기한
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="usagePeriod"
                  onChange={onChangeHandler}
                  value={productDetailInfo.usagePeriod || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 개봉 후 12개월, 제조일로부터 3년"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.usagePeriod || "").length} / 255
                </span>
              </div>
            </div>

            {/* 사용방법 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                사용방법
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2">
                <textarea
                  name="usageMethod"
                  onChange={onChangeHandler}
                  value={productDetailInfo.usageMethod || ""}
                  placeholder="사용 방법을 상세히 입력하세요"
                  className="border border-gray-300 p-2 w-full max-w-lg rounded-md min-h-[80px] resize-y"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {(productDetailInfo.usageMethod || "").length} / 1000
                </span>
              </div>
            </div>

            {/* 화장품책임판매업자/제조업자 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                제조업자/판매업자
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="manufacturer"
                  onChange={onChangeHandler}
                  value={productDetailInfo.manufacturer || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="책임판매업자 또는 제조업자명"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.manufacturer || "").length} / 255
                </span>
              </div>
            </div>

            {/* 제조국 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                제조국
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="madeInCountry"
                  onChange={onChangeHandler}
                  value={productDetailInfo.madeInCountry || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 대한민국, 프랑스"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.madeInCountry || "").length} / 255
                </span>
              </div>
            </div>

            {/* 화장품법에 따라 기재해야 하는 모든 성분 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                전성분
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2">
                <textarea
                  name="ingredients"
                  onChange={onChangeHandler}
                  value={productDetailInfo.ingredients || ""}
                  placeholder="화장품법에 따른 전성분을 입력하세요"
                  className="border border-gray-300 p-2 w-full max-w-lg rounded-md min-h-[120px] resize-y"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {(productDetailInfo.ingredients || "").length} / 2000
                </span>
              </div>
            </div>

            {/* 기능성 화장품 심사필 유무 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                기능성 화장품 심사
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="functionalCertification"
                  onChange={onChangeHandler}
                  value={productDetailInfo.functionalCertification || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 심사필, 해당없음"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.functionalCertification || "").length} /
                  255
                </span>
              </div>
            </div>

            {/* 사용 시 주의사항 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                사용 시 주의사항
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2">
                <textarea
                  name="caution"
                  onChange={onChangeHandler}
                  value={productDetailInfo.caution || ""}
                  placeholder="사용 시 주의사항을 입력하세요"
                  className="border border-gray-300 p-2 w-full max-w-lg rounded-md min-h-[100px] resize-y"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {(productDetailInfo.caution || "").length} / 1000
                </span>
              </div>
            </div>

            {/* 품질보증기준 */}
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                품질보증기준
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex flex-col flex-grow p-2">
                <textarea
                  name="qualityGuarantee"
                  onChange={onChangeHandler}
                  value={productDetailInfo.qualityGuarantee || ""}
                  placeholder="품질보증기준을 입력하세요"
                  className="border border-gray-300 p-2 w-full max-w-lg rounded-md min-h-[80px] resize-y"
                />
                <span className="text-xs text-gray-500 mt-1">
                  {(productDetailInfo.qualityGuarantee || "").length} / 1000
                </span>
              </div>
            </div>

            {/* 소비자 상담 관련 전화번호 */}
            <div className="flex items-stretch">
              <div className="w-48 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                소비자 상담 전화번호
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="customerServiceNumber"
                  onChange={onChangeHandler}
                  value={productDetailInfo.customerServiceNumber || ""}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="예: 1588-1234"
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(productDetailInfo.customerServiceNumber || "").length} / 255
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// React.memo를 사용하여 prop이 변경되었을 때만 리렌더링하도록 설정
export default React.memo(ProductDetailInfoModify);
