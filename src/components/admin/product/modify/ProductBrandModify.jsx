import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { getBrandList } from "../../../../api/admin/brand/brandApi";

export default function ProductBrandModify({ existingData, onChangeForm }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    const getBrands = async () => {
      const data = await getBrandList();
      setBrandsData(data);
    };
    getBrands();
  }, []);

  useEffect(() => {
    if (existingData && existingData?.id && !selectedBrand) {
      setSelectedBrand(existingData);
    }
  }, [existingData]);

  const brandChangeHandler = (e) => {
    const brandId = parseInt(e.target.value);
    const brand = brandsData.find((b) => b.id === brandId) || null;
    setSelectedBrand(brand);
    onChangeForm({ ...brand });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-3 border-b"
      >
        <h2 className="text-lg font-semibold text-gray-800">브랜드</h2>

        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* 브랜드 선택 영역 */}
          <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
            {/* 브랜드 선택 헤더 */}
            <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
              <div className="w-full px-4 py-3 text-gray-700 font-semibold">
                브랜드 선택
              </div>
            </div>

            {/* 브랜드 선택 폼 */}
            <div className="p-4">
              <select
                id="brand-select"
                value={selectedBrand?.id || ""}
                onChange={brandChangeHandler}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
              >
                <option value="">브랜드를 선택해주세요</option>
                {brandsData.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 선택된 브랜드 표시 영역 */}
          {selectedBrand && (
            <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
              {/* 헤더 */}
              <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
                <div className="w-full px-4 py-3 text-gray-700 font-semibold">
                  선택된 브랜드
                </div>
              </div>

              {/* 브랜드 정보 */}
              <div className="p-4">
                <div className="bg-white border border-gray-200 rounded-md px-4 py-3">
                  <p className="text-gray-700 font-medium">
                    {selectedBrand.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 안내 메시지 */}
          <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 신규 브랜드 등록은{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                브랜드 관리
              </a>
              에서 가능합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
