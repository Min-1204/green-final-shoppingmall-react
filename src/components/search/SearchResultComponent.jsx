import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import ProductSortBar from "../product/ProductSortBar";
import ProductFilterBar from "../filter/ProductFilterBar";
import { searchProductList } from "../../api/search/searchApi";

const SearchResultComponent = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    if (!keyword.trim()) return;

    const fetchProducts = async () => {
      const products = await searchProductList(keyword);
      setProducts(products);
    };
    fetchProducts();
  }, [keyword]);

  const brandOptions = [
    ...new Set(products.map((p) => p.brand?.name).filter(Boolean)),
  ];

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
