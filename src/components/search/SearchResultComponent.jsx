import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import ProductSortBar from "../product/ProductSortBar";
import ProductFilterBar from "../filter/ProductFilterBar";
import { searchProductList } from "../../api/search/searchApi";

const SearchResultComponent = () => {
  const [products, setProducts] = useState([]); //상품 목록
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(""); //정렬

  const [searchParams] = useSearchParams(); //URL 쿼리스트링 읽기
  const [queryParams] = useSearchParams(); //URL 쿼리스트링 읽기
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
    console.log("검색 결과 페이지 keyword, page, size : ", keyword, page, size);
    const fetchProducts = async () => {
      const products = await searchProductList(keyword, page, size);
      setProducts(products.dtoList);
      console.log("검색 결과 페이지 products => ", products.dtoList);
    };
    fetchProducts();
  }, [keyword, queryParams]);

  const brandOptions = [];
  // products?.forEach((product) => {
  //   //브랜드 이름이 있는 경우
  //   if (product.brand && product.brand.name) {
  //     //이미 들어있는 브랜드가 아니면
  //     if (!brandOptions.includes(product.brand.name)) {
  //       brandOptions.push(product.brand.name);
  //     }
  //   }
  // });
  // const brandOptions = [
  //   //각 상품에서 브랜드 이름만 뽑기
  //   //?. -> 브랜드가 없는 상품 대비
  //   //.filter(boolean) : null, undefined, "" 제거
  //   //new Set([...]) : 동일 브랜드 여러개일 경우 하나만 유지
  //   ...new Set(products.map((p) => p.brand?.name).filter(Boolean)),
  // ];

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

      {/* 필터 & 정렬 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <ProductFilterBar
          filters={filter}
          setFilters={setFilter}
          brandOptions={brandOptions}
        />
        <ProductSortBar sort={sort} setSort={setSort} />
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
    </div>
  );
};

export default SearchResultComponent;
