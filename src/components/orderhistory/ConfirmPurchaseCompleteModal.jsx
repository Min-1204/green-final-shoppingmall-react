// ConfirmPurchaseCompleteModal.jsx
import React from "react";

const ConfirmPurchaseCompleteModal = ({ order, totalPoints, closeModal }) => {
  const earnedPoints = order.earnedPoints;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 text-center max-w-sm mx-auto relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-6 mt-4">구매확정 완료</h2>

        {/* 적립 포인트 정보 */}
        <div className="mb-8">
          <p className="text-3xl font-bold text-orange-600 mb-2">
            +{earnedPoints.toLocaleString()}원 적립되었습니다.
          </p>
          <div className="inline-block bg-gray-100 p-2 rounded-full mt-4">
            <span className="text-sm font-medium">내 포인트 잔액</span>
            <span className="text-lg font-extrabold ml-2">
              {totalPoints.toLocaleString()}원
            </span>
          </div>
        </div>

        <button
          className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ConfirmPurchaseCompleteModal;
