import React, { useEffect } from "react";
import trendingKeywords from "../../data/trendingKeywords";
import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ recentSearches, setRecentSearches, onRemove }) => {
  const navigate = useNavigate();

  const handleMove = (clickedWord) => {
    navigate(`/search?keyword=${clickedWord}`);

    if (recentSearches.includes(clickedWord)) return;

    const newSearches = [...recentSearches, clickedWord];
    console.log("newSearches", newSearches);

    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
    setRecentSearches(newSearches);
  };

  console.log("recentSearches", recentSearches);

  return (
    <div className="absolute left-0 right-0 top-[60px] bg-white border rounded-2xl shadow-xl p-6 z-20">
      <div className="flex">
        {/* 최근 검색어 */}
        <div className="w-2/5">
          <h3 className="font-semibold text-sm mb-2">최근검색어</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {recentSearches.length > 0 ? (
              recentSearches.map((word, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center hover:text-black cursor-pointer"
                  onClick={() => handleMove(word)}
                >
                  {word}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(word);
                    }}
                    className="text-gray-400 text-xs cursor-pointer mr-4"
                  >
                    ✕
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-xs">최근 검색어가 없습니다</p>
            )}
          </ul>
        </div>

        {/* 세로선 Divider */}
        <div className="w-px bg-gray-300 mx-4"></div>

        {/* 실시간 인기검색어 */}
        <div className="w-1/3 ml-4">
          <h3 className="font-semibold text-sm mb-2">실시간 인기검색어</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {trendingKeywords.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleMove(item.keyword)}
              >
                <span>
                  {index + 1}. {item.keyword}
                </span>
                {item.change === "up" && (
                  <span className="text-red-500 text-xs">▲</span>
                )}
                {item.change === "down" && (
                  <span className="text-blue-500 text-xs">▼</span>
                )}
                {item.change === "new" && (
                  <span className="text-orange-500 text-xs">NEW</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
