import React, { useEffect, useState } from "react";
import { ChevronDown, X, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { applyRestockAlarm } from "../../../api/admin/product/productApi";

const ProductDetailOptions = ({ product, selectedItems, setSelectedItems }) => {
  const auth = useSelector((state) => state.authSlice);
  console.log("auth : ", auth);

  if (!product) {
    return null;
  }
  const [isOpen, setIsOpen] = useState(false);

  const options = product?.options || [];
  // console.log("options", options);

  const handleSelect = (option) => {
    setSelectedItems((prev) => {
      // console.log("prev", prev);
      // 이미 같은 옵션이 들어있다면 그대로 반환 (추가 X)
      const exists = prev.some((item) => item.id === option.id);
      if (exists) return prev;

      // 없으면 새로 추가 (기본 수량 포함)
      return [...prev, { ...option, qty: 1 }];
    });
    setIsOpen(false);
  };

  const handleQtyChange = (option, delta) => {
    // console.log("selectedItems", selectedItems);
    setSelectedItems((prev) => {
      // console.log("prev", prev);
      return prev.map((item) => {
        // console.log("item", item);
        return item.id === option.id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item;
      });
    });
  };

  // 옵션을 제거하는 함수 (기존 로직 유지)
  const handleRemoveOption = (option) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== option.id));
  };

  useEffect(() => {
    console.log("selectedItems 변경", selectedItems);
  }, [selectedItems]);

  const applyRestockMessage = async (e, optionId) => {
    e.stopPropagation();

    if (!auth.isLoggedIn) {
      alert(`로그인을 하셔야 재입고 알람 요청을 할 수 있습니다.`);
    } else {
      const result = await applyRestockAlarm(auth.user.id, optionId);
      console.log("재입고 알림 신청 응답 : ", result);

      if (result !== 0) {
        alert("재입고 알림 신청이 완료되었습니다.");
      } else {
        alert("이미 알림 신청한 상품입니다.");
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 드롭다운 토글 버튼 */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-5 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="text-gray-700 font-medium">옵션을 선택해주세요</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* 드롭다운 리스트 */}
        {isOpen && (
          <ul className="absolute z-20 w-full mt-2 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            {options.map((option, idx) => (
              <li
                key={option.id}
                className={`flex items-center justify-between px-5 py-3.5 transition-colors 
                  ${
                    idx !== options.length - 1 ? "border-b border-gray-100" : ""
                  } 
                  ${
                    option.currentStock === 0
                      ? "bg-gray-50 cursor-not-allowed"
                      : "hover:bg-gray-50 cursor-pointer"
                  }`}
                onClick={() =>
                  option.currentStock !== 0 && handleSelect(option)
                }
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={option.imageUrl}
                    alt={option.optionName}
                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                    // 이미지 URL이 없을 경우 대비하여 에러 핸들링 추가
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/40x40/f3f4f6/a1a1aa?text=NoImg";
                    }}
                  />

                  <div className="flex items-center gap-2 min-w-0">
                    {/* 품절 표시 */}
                    {option.currentStock === 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-gray-400 rounded flex-shrink-0">
                        품절
                      </span>
                    )}

                    {/* 옵션명 */}
                    <span
                      className={`text-sm font-medium truncate ${
                        option.currentStock === 0
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {option.optionName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* 가격 */}
                  {option.currentStock !== 0 && (
                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                      {option.sellingPrice
                        ? option.sellingPrice.toLocaleString() + "원"
                        : "가격 정보 없음"}
                    </span>
                  )}

                  {/* 재입고 알림 버튼 */}
                  {option.currentStock === 0 && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={(e) => applyRestockMessage(e, option.id)}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      재입고 알림
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 옵션 선택하면 아래 구매리스트에 뜨도록 설계 */}
      {selectedItems.length > 0 && (
        <div className="space-y-2.5 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {selectedItems.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between gap-4 p-4 bg-white border border-gray-200 rounded-lg"
            >
              <img
                src={option.imageUrl}
                alt={option.optionName}
                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                // 이미지 URL이 없을 경우 대비하여 에러 핸들링 추가
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/40x40/f3f4f6/a1a1aa?text=NoImg";
                }}
              />
              {/* 제품명 */}
              <div className="flex-1 text-sm font-medium text-gray-900 min-w-0">
                <div className="truncate">{option.optionName}</div>
              </div>

              {/* 수량 조절 */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => handleQtyChange(option, -1)}
                  className="w-9 h-9 flex justify-center items-center text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  -
                </button>
                <span className="w-11 h-9 flex justify-center items-center text-sm font-semibold text-gray-900 border-x border-gray-300">
                  {option.qty}
                </span>
                <button
                  onClick={() => handleQtyChange(option, +1)}
                  className="w-9 h-9 flex justify-center items-center text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  +
                </button>
              </div>

              {/* 가격 */}
              <div className="text-sm font-bold text-gray-900 min-w-[70px] text-right whitespace-nowrap">
                {option.sellingPrice
                  ? option.sellingPrice.toLocaleString() + "원"
                  : "가격 정보 없음"}
              </div>

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemoveOption(option)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailOptions;
