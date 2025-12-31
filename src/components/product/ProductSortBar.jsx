import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ProductSortBar = ({ sort }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const options = [
    { eng: "sales", hangul: "판매순" },
    // { eng: "popular", hangul: "인기순" },
    { eng: "latest", hangul: "최신순" },
    { eng: "price_asc", hangul: "낮은 가격순" },
    { eng: "price_desc", hangul: "높은 가격순" },
  ];

  const updateSortParam = (sortBy) => {
    const newParam = new URLSearchParams(searchParams.toString());
    newParam.set("page", "1");
    newParam.set("sort", sortBy);
    console.log("newParam : ", newParam.toString());
    const queryStr = newParam.toString();

    navigate({
      pathname: location.pathname,
      search: queryStr,
    });
  };

  return (
    // ✨ 상단 경계선 추가 (ProductFilterBar와 시각적으로 분리)
    <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center gap-3">
      {/* ✨ 정렬 제목 디자인 개선 */}
      <div className="flex items-center gap-2 text-base font-bold text-gray-900 shrink-0">
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        <span>정렬</span>
      </div>

      {/* 데스크톱용 버튼 (md 이상) */}
      <div className="hidden md:flex gap-3 flex-1 overflow-x-auto pb-1">
        {options.map((opt) => (
          <button
            key={opt.eng}
            onClick={() => updateSortParam(opt.eng)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap 
              transform cursor-pointer hover:scale-[1.02]
              ${
                sort === opt.eng
                  ? "bg-gray-600 text-white shadow-md shadow-gray-300/50"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }
            `}
          >
            {opt.hangul}
          </button>
        ))}
      </div>

      {/* 모바일용 셀렉트 (md 미만) */}
      <div className="w-full md:hidden">
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base bg-white font-medium text-gray-700 
                     appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all cursor-pointer shadow-sm"
          value={sort}
          onChange={(e) => updateSortParam(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.eng} value={opt.eng}>
              {opt.hangul}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductSortBar;
