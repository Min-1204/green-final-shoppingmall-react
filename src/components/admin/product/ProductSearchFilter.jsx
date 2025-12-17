import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { fetchCategoryList } from "../../../api/admin/category/categoryApi";
import { searchProductsByCondition } from "../../../api/admin/product/productApi";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../pagination/Pagination";

const initialCondition = {
  searchType: "productName",
  productName: "",
  searchKeywords: "",
  categoryIds: [],
  category1: "",
  category2: "",
  category3: "",
  category4: "",
  dateType: "registerDate",
  startDate: "",
  endDate: "",
  saleStatuses: ["ON_SALE", "SOLD_OUT", "STOP_SALE"],
  exposureStatuses: ["EXPOSURE", "HIDDEN", "SCHEDULED"],
};

const saleStatusList = [
  { title: "전체", enum: "ALL" },
  { title: "판매중", enum: "ON_SALE" },
  { title: "품절", enum: "SOLD_OUT" },
  { title: "판매 중지", enum: "STOP_SALE" },
];

const exposureStatusList = [
  { title: "전체", enum: "ALL" },
  { title: "노출", enum: "EXPOSURE" },
  { title: "미노출", enum: "HIDDEN" },
  { title: "노출 예약", enum: "SCHEDULED" },
];

const ProductSearchFilter = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;

  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const [categories4, setCategories4] = useState([]);
  const [searchConditions, setSearchConditions] = useState({
    ...initialCondition,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [pageResponse, setPageResponse] = useState({});

  // 로그 찍는 용도
  useEffect(() => {
    console.log(searchConditions);
  }, [searchConditions]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCategoryList();
      setCategories1(data);
    };
    loadData();
  }, []);

  const searchTypeHandler = (e) => {
    const { name, value } = e.target;
    setSearchConditions((prev) => ({
      ...prev,
      [name]: value,
      productName: "",
      searchKeywordss: "",
      brandName: "",
    }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearchConditions((prev) => ({ ...prev, [name]: value }));
  };

  const findDeepestCategoryId = (id, depth) => {
    if (depth === 1) {
      const ids = categories1
        .find((c) => c.id === id)
        .subCategories.map((category2) =>
          category2.subCategories.map((category3) => category3.id)
        )
        .flat(1);
      console.log(ids);
      return ids;
    } else if (depth === 2) {
      const ids = categories2
        .find((c) => c.id === id)
        .subCategories.map((category3) => category3.id);
      console.log(ids);
      return ids;
    }
  };

  const selectCategoryHandler = (e) => {
    const { name, value } = e.target;
    console.log("name : ", name, ", value : ", value);

    if (name === "category1") {
      const selectedCategory1 = categories1.find(
        (category) => category.name === value
      );
      const id = selectedCategory1.id;
      console.log(id);

      // 최하위 카테고리 ids 찾기
      const ids = findDeepestCategoryId(id, 1);
      // searchConditions 업데이트
      setSearchConditions((prev) => ({
        ...prev,
        categoryIds: [...ids],
        category1: value,
        category2: "",
        category3: "",
      }));

      // 2차 카테고리 만들기
      setCategories2(selectedCategory1.subCategories);
    } else if (name === "category2") {
      const selectedCategory2 = categories2.find(
        (category) => category.name === value
      );
      const id = selectedCategory2.id;
      console.log(id);

      // 최하위 카테고리 ids 찾기
      const ids = findDeepestCategoryId(id, 2);
      // searchConditions 업데이트
      setSearchConditions((prev) => ({
        ...prev,
        categoryIds: [...ids],
        category2: value,
        category3: "",
      }));

      // 3차 카테고리 만들기
      setCategories3(selectedCategory2.subCategories);
    } else if (name === "category3") {
      const selectedCategory3 = categories3.find(
        (category) => category.name === value
      );
      const id = selectedCategory3.id;
      console.log(id);

      // searchConditions 업데이트
      setSearchConditions((prev) => ({
        ...prev,
        categoryIds: [id],
        category3: value,
      }));
    }
  };

  const saleStatusChangeHandler = (e) => {
    const { name, value, checked } = e.target;

    console.log("name : ", name);
    console.log("value : ", value);

    setSearchConditions((prev) => {
      if (value === "ALL") {
        return {
          ...prev,
          [name]: checked ? ["ON_SALE", "SOLD_OUT", "STOP_SALE"] : [],
        };
      } else {
        return {
          ...prev,
          [name]: checked
            ? [...prev.saleStatuses, value]
            : prev.saleStatuses.filter((s) => s !== value),
        };
      }
    });
  };

  const exposureStatusChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    setSearchConditions((prev) => {
      if (value === "ALL") {
        return {
          ...prev,
          [name]: checked ? ["EXPOSURE", "HIDDEN", "SCHEDULED"] : [],
        };
      } else {
        return {
          ...prev,
          [name]: checked
            ? [...prev.exposureStatuses, value]
            : prev.exposureStatuses.filter((exp) => exp !== value),
        };
      }
    });
  };

  const getDateRange = (period) => {
    const today = new Date();
    const endDate = today.toLocaleDateString("sv-SE");
    let startDate = new Date(today);

    switch (period) {
      case "오늘":
        break;
      case "3일간":
        startDate.setDate(today.getDate() - 2);
        break;
      case "1주일":
        startDate.setDate(today.getDate() - 6);
        break;
      case "1개월":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "3개월":
        startDate.setMonth(today.getMonth() - 3);
        break;
      default:
        return { startDate: "", endDate: "" };
    }

    return { startDate: startDate.toISOString().split("T")[0], endDate };
  };

  const onDatePeriodHandler = (period) => {
    const { startDate, endDate } = getDateRange(period);
    setSearchConditions((prev) => ({ ...prev, startDate, endDate }));
  };

  const searchClick = () => {
    console.log("searchResult");

    const loadProductsData = async () => {
      const data = await searchProductsByCondition(searchConditions, 1, 10);
      console.log(data);
      setPageResponse(data);
      setSearchResults(data.dtoList);
    };
    loadProductsData();
  };

  useEffect(() => {
    const loadProductsData = async () => {
      const data = await searchProductsByCondition(
        searchConditions,
        page,
        size
      );
      console.log(data);
      setPageResponse(data);
      setSearchResults(data.dtoList);
    };
    loadProductsData();
  }, [page, size]);

  const reSetCondition = () => {
    setSearchConditions(initialCondition);
    setCategories2([]);
    setCategories3([]);
    setCategories4([]);
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter'] min-h-screen">
      {/* 헤더 */}
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6 flex justify-between items-center px-2">
        상품 조회
        <div className="space-x-2 text-sm">
          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-gray-700 cursor-pointer hover:bg-gray-100 transition shadow-sm">
            엑셀 다운로드
          </button>
        </div>
      </h2>

      {/* 필터 전체 영역 */}
      <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
        {/* 검색어 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            검색어
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <select
              name="searchType"
              value={searchConditions.searchType}
              onChange={searchTypeHandler}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md"
            >
              <option value="productName">상품명</option>
              <option value="searchKeywords">검색어</option>
            </select>
            <input
              type="text"
              name={searchConditions.searchType}
              value={searchConditions[searchConditions.searchType]}
              onChange={onChangeHandler}
              className="border border-gray-300 p-1 w-80 rounded-md"
              placeholder="검색어를 입력하세요"
            />
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            카테고리
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            {[categories1, categories2, categories3, categories4].map(
              (cats, i) => (
                <select
                  key={i}
                  name={`category${i + 1}`}
                  value={searchConditions[`category${i + 1}`]}
                  onChange={selectCategoryHandler}
                  className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md"
                >
                  <option value="" disabled hidden>
                    {i + 1}차카테고리
                  </option>
                  {cats.map((category) => (
                    <option key={category.id}>{category.name}</option>
                  ))}
                </select>
              )
            )}
          </div>
        </div>

        {/* 날짜 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            날짜
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <select
              name="dateType"
              value={searchConditions.dateType}
              onChange={onChangeHandler}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md"
            >
              <option value="registerDate">등록일</option>
            </select>
            <input
              type="date"
              name="startDate"
              value={searchConditions.startDate}
              onChange={onChangeHandler}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md h-[32px]"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              name="endDate"
              value={searchConditions.endDate}
              onChange={onChangeHandler}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md h-[32px]"
            />
            <div className="flex gap-1 ml-3">
              {["오늘", "3일간", "1주일", "1개월", "3개월"].map((period) => (
                <button
                  key={period}
                  onClick={() => onDatePeriodHandler(period)}
                  className="border border-gray-300 bg-white px-2 py-1 text-gray-700 text-xs cursor-pointer rounded-md hover:bg-blue-50 hover:border-blue-500 transition"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 판매 상태 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            판매 상태
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            {saleStatusList.map((status) => (
              <label
                key={status.enum}
                className="flex items-center mr-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="saleStatuses"
                  value={status.enum}
                  onChange={saleStatusChangeHandler}
                  checked={
                    status.title === "전체"
                      ? searchConditions.saleStatuses.length === 3
                      : searchConditions.saleStatuses.includes(status.enum)
                  }
                  className="mr-1 accent-blue-600 cursor-pointer"
                />
                {status.title}
              </label>
            ))}
          </div>
        </div>

        {/* 노출 여부 */}
        <div className="flex items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            노출 여부
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            {exposureStatusList.map((exp) => (
              <label
                key={exp.enum}
                className="flex items-center mr-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="exposureStatuses"
                  value={exp.enum}
                  checked={
                    exp.title === "전체"
                      ? searchConditions.exposureStatuses.length === 3
                      : searchConditions.exposureStatuses.includes(exp.enum)
                  }
                  onChange={exposureStatusChangeHandler}
                  className="mr-1 accent-blue-600 cursor-pointer"
                />
                {exp.title}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 검색 버튼 */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={searchClick}
          className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-md shadow-md hover:bg-blue-700 transition font-semibold"
        >
          검색
        </button>
        <button
          onClick={reSetCondition}
          className="border border-gray-300 bg-white px-8 py-2 text-gray-700 cursor-pointer rounded-md shadow-md hover:bg-gray-100 transition font-semibold"
        >
          초기화
        </button>
      </div>

      <ProductList products={searchResults} search={searchClick} />
      {/* 페이지네이션 */}
      <div className="mt-12">
        <Pagination pageResponseDTO={pageResponse} />
      </div>
    </div>
  );
};

export default ProductSearchFilter;
