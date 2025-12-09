import React, { memo, useEffect, useRef, useState } from "react";
// FiSearch 아이콘을 사용하지 않는 대신 인라인 SVG를 사용하므로 이 import는 제거할 수 있습니다.
// import { FiSearch } from "react-icons/fi";
import products from "../../data/products";
import SearchDropdown from "./SearchDropdown";
import { useNavigate } from "react-router-dom";

const ProductSearchBar = memo(() => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [isFocused, setIsFocused] = useState(false);

  const [recentSearches, setRecentSearches] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  });

  const wrapperRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setIsFocused(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = (wordToRemove) => {
    const updated = recentSearches.filter((w) => w !== wordToRemove);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = () => {
    navigate(`/search?keyword=${query}`);

    // 기존 검색어 배열을 불러오기
    const existingSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    // 검색어가 비어있거나 기존 검색어 배열에 있다면 저장하지 않음
    if (!query.trim() || existingSearches.includes(query.trim())) return;

    // 새로운 검색어 배열을 생성
    const newSearches = [...existingSearches, query.trim()];

    // state 저장
    setRecentSearches(newSearches);

    // 로컬스토리지에 검색어 배열을 JSON 문자열로 변환하여 recentSearches 키 값에 저장
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  const handleKeyDown = (e) => {
    // 키가 Enter인지 확인
    if (e.key === "Enter") {
      // 기본 폼 제출 동작(페이지 새로고침) 방지
      e.preventDefault();
      handleSearch();
      //검색 후 드롭다운 닫기
      setIsFocused(false);
    }
  };

  return (
    // 1. 전체 컨테이너에 relative 유지
    <div
      ref={wrapperRef}
      className="w-full max-w-lg mx-auto relative mt-6 mb-6"
    >
      <input
        placeholder="상품명을 검색하세요"
        className="
          w-full
          border border-gray-300
          rounded-full 
          py-3 pl-12 pr-12  
          text-sm tracking-wide
          placeholder-gray-400
          focus:outline-none
          transition
        "
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsFocused(true)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      {results.length > 0 && (
        <ul
          className="
            absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg
            max-h-60 overflow-y-auto z-10
          "
        >
          {results.map((item) => (
            <li
              key={item.id}
              className="
                px-4 py-2 text-sm cursor-pointer hover:bg-gray-100
                flex justify-between
              "
            >
              <span>{item.name}</span>
              <span className="text-gray-500 text-xs">{item.brand}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 2. 검색 아이콘 (오른쪽 내부 배치) */}
      <button
        className="
          absolute right-0 top-1/2 transform -translate-y-1/2 
          w-12 h-12 
          flex items-center justify-center 
          text-gray-400 hover:text-black 
          cursor-pointer
        "
        onClick={() => handleSearch()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="5" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      </button>

      {isFocused && (
        <SearchDropdown
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          onRemove={handleUpdate}
        />
      )}
    </div>
  );
});

export default ProductSearchBar;
