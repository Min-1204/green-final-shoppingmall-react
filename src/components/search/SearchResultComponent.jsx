import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../product/ProductCard";
import ProductSortBar from "../product/ProductSortBar";
import ProductFilterBar from "../filter/ProductFilterBar";
import Pagination from "../product/Pagination";

const SearchResultComponent = () => {
  // 브랜드 필터
  const [filters, setFilters] = useState({});
  // 정렬 기준
  const [sort, setSort] = useState("");
  //현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))
    .filter((p) => {
      // 필수 데이터가 모두 있는 상품만 포함
      return (
        p.mainImages &&
        p.mainImages.length > 0 &&
        p.brand &&
        typeof p.brand === "object" &&
        p.brand.name &&
        p.basicInfo &&
        p.basicInfo.productName &&
        p.options &&
        p.options.length > 0
      );
    });

  console.log(keyword);
  console.log(filteredProducts);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const brandOptions = [...new Set(filteredProducts.map((p) => p.brand))];
  // 페이지마다 보여주는 상품
  const PagedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    // 중앙 정렬 컨테이너 및 배경 설정
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* 검색 결과 헤더 섹션 - 카드 스타일 적용 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="text-gray-900">"{keyword}"</span> 검색 결과
        </h1>
        <p className="text-sm text-gray-500">
          총{" "}
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>
          개의 상품
        </p>
      </div>

      {/* 필터 및 정렬 섹션 - 통합 및 분리 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex flex-col gap-4">
          {/* 필터 바 */}
          <div className="w-full">
            <ProductFilterBar
              filters={filters}
              setFilters={setFilters}
              brandOptions={brandOptions}
            />
          </div>
          {/* 정렬 바 */}
          <div className="w-full">
            <ProductSortBar sort={sort} setSort={setSort} />
          </div>
        </div>
      </div>

      {/* 상품 목록 레이아웃 */}
      <div>
        {/* 상품 목록 그리드 */}
        {PagedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {PagedProducts.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium mb-1">
              "{keyword}"에 대한 검색 결과가 없습니다
            </p>
            <p className="text-gray-400 text-sm">
              다른 검색어를 사용하거나 필터 설정을 변경해보세요
            </p>
          </div>
        )}

        {/* 페이지네이션 (그리드 내부 컨테이너에 배치) */}
        {totalPages > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultComponent;
