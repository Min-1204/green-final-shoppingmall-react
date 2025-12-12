import React, { memo, useEffect, useState, useRef } from "react";
import SearchDropdown from "./SearchDropdown";
import { useNavigate } from "react-router-dom";
import {
  popularSearches,
  recentSearches,
  searchKeywordAdd,
} from "../../api/search/searchApi";
import { useSelector } from "react-redux";

const ProductSearchBar = memo(() => {
  const [searchText, setSearchText] = useState(""); // 검색 입력값
  const [recentKeyWords, setRecentKeyWords] = useState([]); // 최근 검색어 목록
  const [popularKeywords, setPopularKeywords] = useState([]); // 인기 검색어 목록
  const [dropdown, setDropdown] = useState(false); // 드롭다운 표시

  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const searchBarRef = useRef(null); // 드롭다운 영역 참조

  //최근 검색어 불러오기
  useEffect(() => {
    if (!user?.id) return;

    const fetchrecentKeywords = async () => {
      //localStorage에서 전체 삭제 상태 확인
      const clearFlag = localStorage.getItem(
        `recentSearches_cleared_${user.id}`
      );

      if (clearFlag === "true") {
        //전체 삭제 후 로컬에 저장된 키워드만 불러오기
        const savedKeywords = localStorage.getItem(
          `recentSearches_temp_${user.id}`
        );
        const keywords = savedKeywords ? JSON.parse(savedKeywords) : [];
        setRecentKeyWords(keywords);
        return;
      }

      //일반 모드: API에서 불러오기
      const keyWordList = await recentSearches(user.id);
      const keywords = keyWordList.map((item) => item.keyword);
      setRecentKeyWords(keywords);
    };
    fetchrecentKeywords();
  }, [user?.id]);

  //인기 검색어
  useEffect(() => {
    const fetchPopularKeyWord = async () => {
      const popularList = await popularSearches();
      setPopularKeywords(popularList);
    };
    fetchPopularKeyWord();
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  //검색 실행
  const handleSearch = async (keyword = searchText) => {
    if (!keyword.trim()) return;

    navigate(`/search?keyword=${keyword}`);

    //검색어 저장 요청
    await searchKeywordAdd(keyword, user?.id);

    //전체 삭제 상태 확인
    const clearFlag = localStorage.getItem(`recentSearches_cleared_${user.id}`);
    if (clearFlag === "true") {
      //전체 삭제 모드: 로컬에 저장하고 상태 업데이트
      setRecentKeyWords((prev) => {
        const filtered = prev.filter((k) => k !== keyword);
        const newKeywords = [keyword, ...filtered];
        //localStorage에도 저장
        localStorage.setItem(
          `recentSearches_temp_${user.id}`,
          JSON.stringify(newKeywords)
        );
        console.log("전체삭제 모드 - 새 키워드 목록:", newKeywords);
        return newKeywords;
      });
    } else {
      //일반 모드: API에서 최신 목록 가져오기
      const keyWordList = await recentSearches(user?.id);
      const newKeywords = keyWordList.map((item) => item.keyword);
      console.log("일반 모드 - API 응답:", keyWordList);
      setRecentKeyWords(newKeywords);
    }

    setDropdown(false);
  };

  //엔터 키 검색
  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  //최근 검색어 UI 삭제
  const recentKeyWordRemove = (keyword) => {
    setRecentKeyWords((prev) => {
      const newKeywords = prev.filter((k) => k !== keyword);

      //전체 삭제 모드일 때는 로컬 스토리지도 업데이트
      const clearedFlag = localStorage.getItem(
        `recentSearches_cleared_${user.id}`
      );
      if (clearedFlag === "true") {
        localStorage.setItem(
          `recentSearches_temp_${user.id}`,
          JSON.stringify(newKeywords)
        );
      }

      return newKeywords;
    });
  };

  //최근 검색어 전체 삭제
  const allClearHandler = () => {
    if (window.confirm("최근 검색어를 모두 삭제 하시겠습니까?")) {
      setRecentKeyWords([]);
      localStorage.setItem(`recentSearches_cleared_${user.id}`, "true");
      localStorage.setItem(
        `recentSearches_temp_${user.id}`,
        JSON.stringify([])
      );
    }
  };

  return (
    <div
      className="w-full max-w-lg mx-auto relative mt-6 mb-6"
      ref={searchBarRef}
    >
      {/* 검색 입력창 */}
      <input
        placeholder="상품명을 검색하세요"
        className="
          w-full border border-gray-300 rounded-full 
          py-3 pl-12 pr-12 text-sm tracking-wide
          placeholder-gray-400 focus:outline-none transition
        "
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setDropdown(true)}
        onKeyDown={onEnterKey}
      />

      {/* 검색 아이콘 버튼 */}
      <button
        className="
          absolute right-0 top-1/2 transform -translate-y-1/2 
          w-12 h-12 flex items-center justify-center 
          text-gray-400 hover:text-black cursor-pointer
        "
        onClick={handleSearch}
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

      {/* 최근 검색어 드롭다운 */}
      {dropdown && (
        <SearchDropdown
          keywords={recentKeyWords}
          popular={popularKeywords}
          onRemove={recentKeyWordRemove}
          onClear={allClearHandler}
          onSelect={(word) => {
            setSearchText(word);
            handleSearch(word); //선택한 키워드를 직접 전달
          }}
        />
      )}
    </div>
  );
});

export default ProductSearchBar;
