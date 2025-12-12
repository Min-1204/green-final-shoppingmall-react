import { useNavigate } from "react-router-dom";

const SearchDropdown = ({ keywords, onRemove, onSelect, onClear, popular }) => {
  const navigate = useNavigate();

  const handleMove = (keyword) => {
    onSelect(keyword);
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <div className="absolute left-0 right-0 top-[60px] bg-white border border-gray-300 rounded-2xl shadow-xl p-6 z-20">
      <div className="flex">
        {/* 최근 검색어 */}
        <div className="w-2/5 flex flex-col">
          <h3 className="font-semibold text-sm mb-2 ml-2.5">최근 검색어</h3>

          <ul className="text-sm text-gray-600 space-y-1 flex-1 ml-2.5">
            {keywords.length > 0 ? (
              keywords.map((word) => (
                <li
                  key={word}
                  className="flex justify-between items-center hover:text-black cursor-pointer"
                  onClick={() => handleMove(word)}
                >
                  <span>{word}</span>

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

          {/* 전체 삭제 버튼 */}
          <button
            className="text-xs text-gray-500 mt-3 text-left ml-2.5 cursor-pointer"
            onClick={onClear}
          >
            전체 삭제
          </button>
        </div>

        <div className="w-px bg-gray-300 mx-4"></div>

        {/* 실시간 인기 검색어 */}
        <div className="w-2/5 flex flex-col">
          <h3 className="font-semibold text-sm mb-2 ml-4">
            실시간 인기 검색어
          </h3>

          <ul className="text-sm text-gray-700 space-y-2 ml-4 flex-1">
            {popular && popular.length > 0 ? (
              popular.map((item, index) => (
                <li
                  key={item.id || `popular-${index}`}
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleMove(item.keyword)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-gray-500 text-xs">
                      {index + 1}
                    </span>
                    <span>{item.keyword}</span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-xs">인기 검색어가 없습니다</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
