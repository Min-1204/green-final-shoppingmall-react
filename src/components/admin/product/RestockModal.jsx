import { useState, useEffect } from "react";
import { X } from "lucide-react";

const RestockModal = ({ isOpen, onClose, product, onConfirm }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (product?.options) {
      setStockData(
        product.options.map((option) => ({
          id: option.id,
          optionName: option.optionName || `옵션 ${option.id}`,
          currentStock: option.currentStock,
          newStock: option.currentStock,
        }))
      );
    }
  }, [product]);

  const handleStockChange = (optionId, value) => {
    const numValue = parseInt(value) || 0;
    setStockData((prev) =>
      prev.map((item) =>
        item.id === optionId ? { ...item, newStock: numValue } : item
      )
    );
  };

  const handleConfirm = () => {
    const updatedOptions = stockData.map((item) => ({
      optionId: item.id,
      newStock: item.newStock,
    }));
    onConfirm(updatedOptions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            상품 옵션 재입고
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* 상품 정보 */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">상품명</p>
          <p className="font-medium text-gray-800">
            {product?.basicInfo?.productName}
          </p>
        </div>

        {/* 옵션 목록 */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-3">
            {stockData.map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 mb-1">
                    {option.optionName}
                  </p>
                  <p className="text-sm text-gray-500">
                    현재 재고: {option.currentStock}개
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 whitespace-nowrap">
                    새 재고:
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={option.newStock}
                    onChange={(e) =>
                      handleStockChange(option.id, e.target.value)
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-sm text-gray-600">개</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition shadow-sm"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestockModal;
