import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import { searchProductList } from "../../api/search/searchApi";
import Pagination from "../pagination/Pagination";

const SearchResultComponent = () => {
  const [pageResponse, setPageResponse] = useState(null);
  const [products, setProducts] = useState([]); //상품 목록
  const [searchParams] = useSearchParams(); //URL 쿼리스트링 읽기
  const [queryParams] = useSearchParams(); //페이지 쿼리스트링
  const keyword = searchParams.get("keyword") || ""; //URL에서 keyword 값 추출, 값이 없으면 빈 문자열

  const getNum = (param, defaultValue) => {
    if (!param) return defaultValue;
    return parseInt(param, 10);
  };

  //검색어 상품 목록 조회
  useEffect(() => {
    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 24);

    //공백 이거나 빈 검색어면 API 호출하지 않음
    if (!keyword.trim()) return;

    const fetchProducts = async () => {
      const products = await searchProductList(keyword, page, size);
      setProducts(products.dtoList);
      setPageResponse(products);
    };
    fetchProducts();
  }, [keyword, queryParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* 검색 결과 헤더 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="text-gray-900">"{keyword}"</span> 검색 결과
        </h1>
        <p className="text-sm text-gray-500">
          총{" "}
          <span className="font-semibold text-gray-900">{products.length}</span>
          개의 상품
        </p>
      </div>

      {/* 상품 목록 */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden bg-white border hover:shadow-lg transition"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-20">
          <p className="text-lg text-gray-600">
            "{keyword}"에 대한 검색 결과가 없습니다
          </p>
        </div>
      )}
      {/* 페이지네이션 컴포넌트 */}
      {pageResponse && <Pagination pageResponseDTO={pageResponse} />}
    </div>
  );
};

export default SearchResultComponent;
