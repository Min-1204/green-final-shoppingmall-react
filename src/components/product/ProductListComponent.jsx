import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import products from "../../data/products";
// import { CATEGORY_DATA } from "../../data/categories";
import { ChevronRight } from "lucide-react";

import ProductCard from "./ProductCard";
import ProductSortBar from "./ProductSortBar";
import ProductFilterBar from "../filter/ProductFilterBar";
import Pagination from "./Pagination";
import { getCategoryList } from "../../api/admin/category/categoryApi";
import { fetchProductsByThirdCategoryIds } from "../../api/admin/product/productApi";

const ProductListComponent = () => {
  // 유즈서치파람 : 카테고리뎁스, 카테고리아이디 url 에서 가져오기
  const [searchParams] = useSearchParams();
  const categoryDepth = parseInt(searchParams.get("categoryDepth"));
  const categoryId = parseInt(searchParams.get("categoryId"));
  console.log("categoryDepth : ", categoryDepth, "categoryId : ", categoryId);

  const [mainCategory, setMainCategory] = useState({ subCategories: [] });
  const [secondCategoryId, setSecondCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [productList, setproductList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await getCategoryList();
      let thirdIds = [];
      if (categoryDepth === 1) {
        // 메인 카테고리 찾기
        const firstCategory = categoriesData.find(
          (category) => category.id === categoryId
        );
        console.log("Main category", firstCategory);
        setMainCategory(firstCategory);
        setSelectedCategory(firstCategory);
        // 3차 카테고리 배열 thirdIds 만들기
        thirdIds = firstCategory.subCategories
          .map((secondCategory) =>
            secondCategory.subCategories.map(
              (thirdCategory) => thirdCategory.id
            )
          )
          .flat(1);
        console.log("thirdIds : ", thirdIds);
      } else if (categoryDepth === 2) {
        // 메인 카테고리 찾기
        const firstCategory = categoriesData.find((category) =>
          category.subCategories
            .map((category) => category.id)
            .flat(1)
            .includes(categoryId)
        );
        console.log("Main category", firstCategory);
        setMainCategory(firstCategory);

        // 선택된 2차 카테고리 찾기
        const secondCategory = firstCategory.subCategories.find(
          (secondCategory) => secondCategory.id === categoryId
        );
        console.log("selectedSecondCategory : ", secondCategory);
        setSecondCategoryId(secondCategory.id);
        setSelectedCategory(secondCategory);
        // 선택된 2차 카테고리의 하위 3차 카테고리 배열 thirdIds 만들기
        thirdIds = secondCategory.subCategories.map(
          (thirdCategory) => thirdCategory.id
        );
        console.log("thirdIds : ", thirdIds);
      } else if (categoryDepth === 3) {
        // 메인 카테고리 찾기
        const firstCategory = categoriesData.find((category) =>
          category.subCategories
            .map((category) =>
              category.subCategories.map((category) => category.id)
            )
            .flat(2)
            .includes(categoryId)
        );
        console.log("Main category", firstCategory);
        setMainCategory(firstCategory);

        // 선택된 3차 카테고리의 부모 2차 카테고리 찾기
        const secondCategory = firstCategory.subCategories.find(
          (secondCategory) =>
            secondCategory.subCategories
              .map((thirdCategory) => thirdCategory.id)
              .flat(1)
              .includes(categoryId)
        );
        console.log("selectedSecondCategory : ", secondCategory);
        setSecondCategoryId(secondCategory.id);

        // 선택된 카테고리 정보 찾기
        const selectedCate = secondCategory.subCategories.find(
          (thirdCategory) => thirdCategory.id === categoryId
        );
        setSelectedCategory(selectedCate);
        // 3차 카테고리 배열 thirdIds 만들기
        thirdIds = [categoryId];
        console.log("thirdIds : ", thirdIds);
      }

      // 상품 목록 가져오기
      const productsData = await fetchProductsByThirdCategoryIds(thirdIds);
      setproductList(productsData);
      console.log("productList", productsData);
    };
    loadData();
  }, [categoryDepth, categoryId]);

  const { main, sub, deep } = useParams();

  const decodedMain = decodeURIComponent(main).replace(/-/g, "/");
  const decodedSub = sub ? decodeURIComponent(sub).replace(/-/g, "/") : null;
  const decodedDeep = deep ? decodeURIComponent(deep).replace(/-/g, "/") : null;

  // ✅ 제품 필터링 (기존 로직 유지)
  let categoryProducts = products.filter((p) => p.categoryMain === decodedMain);

  if (decodedSub) {
    categoryProducts = categoryProducts.filter(
      (p) => p.categorySub === decodedSub
    );
  }

  if (decodedDeep) {
    categoryProducts = categoryProducts.filter(
      (p) => p.categoryDeep === decodedDeep
    );
  }

  // 콘솔 로그 유지 (디버깅용)
  // console.log("decodedMain:", decodedMain);
  // console.log("decodedSub:", decodedSub);
  // console.log("decodedDeep:", decodedDeep);
  // console.log(
  //   "products:",
  //   products.map((p) => ({
  //     main: p.categoryMain,
  //     sub: p.categorySub,
  //     deep: p.categoryDeep,
  //   }))
  // );
  // console.log("결과:", categoryProducts);

  // 브랜드 필터(브랜드별로 상품 조회 가능하게 하는 필터) (기존 로직 유지)
  const [filters, setFilters] = useState({});

  // 정렬 필터에 사용할 state (기존 로직 유지)
  const [sort, setSort] = useState("판매순");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 제품 브랜드들을 brandOptions에 담아서 ProductFilterBar에 전달 (기존 로직 유지)
  const brandOptions = [...new Set(categoryProducts.map((p) => p.brand))];
  // console.log("brandOptions:", brandOptions);

  // ✅ 정렬 (원하면 나중에 확장 가능) (기존 로직 유지)
  const sortedProducts = [...categoryProducts];

  // 예시: 정렬 기능은 필요 시 확장 가능

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const pagedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const sideCategory = CATEGORY_DATA.find((c) => c.main === decodedMain);
  const sideCategory = { subs: [] };

  // URL 파라미터(카테고리)가 변경될 때마다 currentPage를 1로 리셋 (기존 로직 유지)
  useEffect(() => {
    // main, sub, deep 중 하나라도 변경되면 실행됩니다.
    setCurrentPage(1);
  }, [main, sub, deep]);

  return (
    // ✨ 최대 너비 조정 및 반응형 패딩 강화
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* ✅ 사이드바 */}
      <aside className="w-full lg:w-64 shrink-0">
        {/* ✨ 사이드바 컨테이너 디자인 개선 */}
        <div className="sticky top-6 bg-white rounded-xl border border-gray-200 p-6 shadow-md">
          {/* ✨ 1차 카테고리 제목 디자인 */}
          <h2 className="text-2xl font-extrabold text-gray-900 pb-4 border-b border-gray-200">
            {mainCategory.name}
          </h2>

          {/* ✨ 2차/3차 카테고리 목록 디자인 개선 */}
          <ul className="mt-5 space-y-1.5">
            {mainCategory?.subCategories.map((secondCategory) => {
              const isActiveSub = secondCategoryId === secondCategory.id;
              return (
                <li key={secondCategory.id}>
                  {/* ✨ 2차 카테고리 링크 디자인: 활성화 시 블루 배경/텍스트 */}
                  <Link
                    to={`/products?categoryDepth=${secondCategory.depth}&categoryId=${secondCategory.id}`}
                    className={`block px-4 py-2 rounded-lg transition-all text-base ${
                      isActiveSub
                        ? "bg-gray-600 text-white font-bold shadow-sm" // 활성화 상태
                        : "text-gray-700 hover:bg-gray-100 font-medium" // 기본 상태
                    }`}
                  >
                    {secondCategory.name}
                  </Link>

                  {/* 3차 카테고리 목록 */}
                  {isActiveSub && (
                    // ✨ 3차 목록 디자인: 왼쪽 경계선 색상 변경 및 간격 조정
                    <ul className="mt-2 space-y-1 ml-4 pl-4 border-l-2 border-gray-200">
                      {secondCategory.subCategories.map((thirdCategory) => (
                        <li key={thirdCategory.id}>
                          <Link
                            to={`/products?categoryDepth=${thirdCategory.depth}&categoryId=${thirdCategory.id}`}
                            className={`block px-3 py-1.5 rounded-md text-sm transition-all ${
                              categoryId === thirdCategory.id
                                ? "bg-blue-50 text-gray-700 font-bold" // 활성화 상태
                                : "text-gray-600 hover:text-gray-600 hover:bg-gray-50" // 기본 상태
                            }`}
                          >
                            {thirdCategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* ✅ 오른쪽 상품 목록 영역 */}
      <div className="flex-1 min-w-0">
        {/* ✨ 브레드크럼 디자인 개선 */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
          <Link to="/" className="hover:text-gray-700 transition-colors">
            홈
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link
            to={`/products?categoryDepth=${mainCategory.depth}&categoryId=${mainCategory.id}`}
            className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {mainCategory.name}
          </Link>
          {decodedSub && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="font-bold text-gray-900">{decodedSub}</span>
            </>
          )}
          {decodedDeep && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="font-bold text-gray-600">{decodedDeep}</span>
            </>
          )}
        </nav>

        {/* ✨ 카테고리 제목 영역 디자인 개선 */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {selectedCategory.name}
          </h1>
          <p className="text-base text-gray-600">
            총{" "}
            <span className="font-extrabold text-gray-600">
              {productList.length}
            </span>
            개의 상품이 있습니다.
          </p>
        </div>

        {/* ✨ 필터 / 정렬 컨테이너 디자인 개선 */}
        <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* 브랜드 필터 */}
            <ProductFilterBar
              filters={filters}
              setFilters={setFilters}
              brandOptions={brandOptions}
            />

            {/* 정렬 바 */}
            <ProductSortBar sort={sort} setSort={setSort} />
          </div>
        </div>

        {/* ✅ 상품 그리드 (기존 반응형 유지 및 카드 디자인 강화) */}
        {productList.length > 0 ? (
          // ✨ 모바일(2열), 태블릿(3열), 데스크톱(4열)
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {productList.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5" // ✨ 호버 효과 강화
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* ✨ 상품 없음 메시지 디자인 개선 */
          <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-500"
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
            <p className="text-gray-700 text-xl font-bold mb-1">
              앗, 이 카테고리에는 상품이 없어요!
            </p>
            <p className="text-gray-500 text-base">
              다른 카테고리나 필터를 선택하여 다시 찾아보세요.
            </p>
          </div>
        )}

        {/* ✅ 페이지네이션 */}
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
