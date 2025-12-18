import React from "react";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const ProductFilterBar = ({ selectedBrand, brandList }) => {
  console.log("selectedBrand : ", selectedBrand);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectBrand = (e) => {
    const brandId = e.target.value;

    searchParams.set("brand", brandId);
    searchParams.delete("page");
    searchParams.delete("size");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      {/*  필터 제목 */}
      <div className="flex items-center gap-2 text-base font-bold text-gray-900 shrink-0">
        <Filter className="w-5 h-5 text-gray-600" />
        <span>브랜드 필터</span>
      </div>

      {/*  셀렉트 박스  */}
      <select
        className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base bg-white text-gray-700 font-medium 
                 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all cursor-pointer shadow-sm
                 hover:border-gray-400"
        value={selectedBrand?.id || ""}
        onChange={handleSelectBrand}
      >
        {/*  전체 브랜드 옵션  */}
        <option value="0">{`— 전체 브랜드 (${brandList.length}개) —`}</option>
        {brandList.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilterBar;
