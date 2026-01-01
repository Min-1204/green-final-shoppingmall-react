import React from "react";

export default function InquiryFilter({
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchKeyword,
  setSearchKeyword,
  ANSWER_STATUS,
  INQUIRY_TYPES,
  onResetDate,
  onSearch
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 mb-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 w-20">
            답변 상태
          </label>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {Object.entries(ANSWER_STATUS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-4 py-1.5 text-sm rounded-md transition-all cursor-pointer ${
                  selectedStatus === key
                    ? "bg-white text-blue-600 shadow-sm font-bold"
                    : "text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 w-20">
            문의 유형
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="전체">전체 유형</option>
            {Object.values(INQUIRY_TYPES).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 w-20">
            조회 기간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm"
            />
            <span className="text-gray-400">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm"
            />
            <button
              onClick={onResetDate}
              className="ml-2 text-xs text-gray-500 hover:underline cursor-pointer"
            >
              초기화
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 w-20">
            검색어
          </label>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="제목, 내용, 작성자 검색..."
              className="flex-1 border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={onSearch}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
