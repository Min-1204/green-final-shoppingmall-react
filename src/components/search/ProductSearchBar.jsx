import React, { memo, useEffect, useState, useRef } from "react";
import SearchDropdown from "./SearchDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteAllRecentKeywords,
  deleteOneRecentKeyword,
  popularSearches,
  recentSearches,
  searchKeywordAdd,
} from "../../api/search/searchApi";
import { useSelector } from "react-redux";

const ProductSearchBar = memo(() => {
  const [searchText, setSearchText] = useState(""); //검색 입력값
  const [recentKeywords, setRecentKeywords] = useState([]); //최근 검색어 목록
  const [popularKeywords, setPopularKeywords] = useState([]); //인기 검색어 목록
  const [dropdown, setDropdown] = useState(false); //드롭다운 표시

  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const searchBarRef = useRef(null); //드롭다운 영역 참조

  const inputRef = useRef(null); //검색어 x버튼 클릭후 focus() 주기 위해 사용
  const location = useLocation(); //현재 URL정보 접근, 쿼리스트링 동기화에 사용

  //검색어 동기화, 검색어가 input에 유지
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword");

    if (keyword) {
      setSearchText(keyword);
    }
  }, [location.search]);

  //검색 주체 결정 함수 (로그인/비로그인)
  const getSearchOwner = () => {
    //로그인 유저 -> 서버에 userId 전달
    if (user?.id) {
      return { userId: user.id, guestId: null };
    }

    //비로그인 유저, 세션 기준으로 임시 ID 유지
    let guestId = sessionStorage.getItem("guestId");
    if (!guestId) {
      //guestId가 없으면 새로 생성
      guestId = crypto.randomUUID();
      sessionStorage.setItem("guestId", guestId);
    }

    return { userId: null, guestId };
  };

  //최근 검색어 불러오기
  const fetchrecentKeywords = async () => {
    const { userId, guestId } = getSearchOwner();

    const keywordList = await recentSearches(userId, guestId);
    console.log("keywordList", keywordList);
    setRecentKeywords(keywordList.map((w) => w.keyword));
  };

  //인기 검색어
  const fetchPopularKeyword = async () => {
    const popularList = await popularSearches();
    console.log("popularList", popularList);
    setPopularKeywords(popularList);
  };

  //드롭다운에 보여줄 데이터 초기 세팅
  useEffect(() => {
    fetchrecentKeywords();
    fetchPopularKeyword();
  }, []);

  //외부 클릭 감지, 드롭다운이 열렸을 때 검색 영역 밖 클릭하면 닫기
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
    //공벡 제거, 빈 문자열 방지
    const searchTarget = String(keyword || "").trim();
    if (!searchTarget) return;

    const { userId, guestId } = getSearchOwner();

    //검색어 저장
    await searchKeywordAdd(searchTarget, userId, guestId);

    //검색 결과 페이지 이동
    navigate(`/search?keyword=${searchTarget}&page=1&size=24`);

    //검색어 목록 다시 가져오기
    const keywordList = await recentSearches(userId, guestId);
    setRecentKeywords(keywordList.map((w) => w.keyword));

    //최근 검색어, 인기 검색어 갱신
    await fetchrecentKeywords();
    await fetchPopularKeyword();

    setDropdown(false);
  };

  //엔터 키 검색
  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  //검색어 초기화
  //입력값 촉화, 드롭다운 다시 열기, input포커스 유지, 최신 검색어 다시 불러오기
  const clearSearch = async () => {
    setSearchText("");
    setDropdown(true);
    inputRef.current?.focus();

    //X 버튼 클릭 시에도 최신 데이터 불러오기
    await fetchrecentKeywords();
    await fetchPopularKeyword();
  };

  //최근 검색어 개별 삭제
  const recentKeywordRemove = async (keyword) => {
    //UI에서 먼저 제거
    setRecentKeywords((prev) => prev.filter((w) => w !== keyword));

    const { userId, guestId } = getSearchOwner();
    //검색어 삭제(숨김)
    await deleteOneRecentKeyword(keyword, userId, guestId);

    //삭제 후 최신 데이터 다시 불러오기
    await fetchrecentKeywords();
  };

  //최근 검색어 전체 삭제
  const recentKeywordAllRemove = async () => {
    setRecentKeywords([]);

    const { userId, guestId } = getSearchOwner();
    await deleteAllRecentKeywords(userId, guestId);

    await fetchrecentKeywords();
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto relative" ref={searchBarRef}>
      {/* 검색 입력창 */}
      <input
        ref={inputRef}
        placeholder="어떤 촉촉함을 찾으시나요?"
        className="
          w-full h-12 pl-6 pr-24 rounded-full border-2 border-[#FFC1D1] 
          bg-white focus:border-[#FF6B9C] focus:ring-4 focus:ring-pink-100 
          outline-none text-gray-700 placeholder-pink-300 
          transition-all duration-300 shadow-sm
        "
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setDropdown(true)}
        onKeyDown={onEnterKey}
      />

      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
        {searchText && (
          <button
            type="button"
            className="
              w-8 h-8 flex items-center justify-center
              text-pink-300 hover:text-pink-500 transition-colors
            "
            onClick={clearSearch}
          >
            <span className="text-lg">✕</span>
          </button>
        )}

        <button
          className="
            w-9 h-9 flex items-center justify-center rounded-full 
            bg-gradient-to-r from-[#FF6B9C] to-[#FF8FAB]
            hover:from-[#FF4D88] hover:to-[#FF6B9C] 
            text-white shadow-md transition-all duration-200 active:scale-95
          "
          onClick={() => handleSearch(searchText)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3" /* 선을 조금 더 두껍게 하여 가독성 높임 */
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {dropdown && (
        <SearchDropdown
          keywords={recentKeywords}
          popular={popularKeywords}
          onRemove={recentKeywordRemove}
          onClear={recentKeywordAllRemove}
          onSelect={(word) => {
            setSearchText(word);
            handleSearch(word);
          }}
        />
      )}
    </div>
  );
});

export default ProductSearchBar;
