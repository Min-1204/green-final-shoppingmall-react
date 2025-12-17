import React from "react";

const CheckboxGroup = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleCheckboxChange = (option) => {
    // 전체 선택 처리
    if (option === "전체") {
      if (selectedOptions.includes("전체")) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([...options]);
      }
      return;
    }

    // 개별 선택 처리
    let newSelected = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    // 전체 체크 여부 업데이트
    const allSelected = options
      .filter((opt) => opt !== "전체")
      .every((opt) => newSelected.includes(opt));
    if (allSelected) {
      newSelected = [...options];
    }

    // 전체 체크 상태에서 하나를 체크 해제하면 전체 체크도 해제되도록 함
    if (
      selectedOptions.includes("전체") &&
      !options.every((opt) => newSelected.includes(opt))
    ) {
      newSelected = newSelected.filter((opt) => opt !== "전체");
    }

    setSelectedOptions(newSelected);
  };

  return (
    <div className="flex border-b border-gray-300 items-stretch">
      <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 flex items-center justify-center p-2 font-semibold">
        {title}
      </div>
      <div className="flex flex-wrap items-center flex-grow p-2 gap-4">
        {options.map((label) => (
          <label
            key={label}
            className={`flex items-center gap-1 text-gray-700 select-none cursor-pointer ${
              label === "전체" ? "ml-2 font-normal" : ""
            }`}
          >
            <input
              type="checkbox"
              className="w-3.5 h-3.5 accent-blue-600"
              checked={selectedOptions.includes(label)}
              onChange={() => handleCheckboxChange(label)}
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
