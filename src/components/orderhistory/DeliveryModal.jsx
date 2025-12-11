import React from "react";

const DeliveryModal = ({ item, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-bold mb-4">배송 조회</h2>
        <p className="text-sm text-gray-600 mb-3">{item.pname}</p>

        {/* 실제로는 운송장 번호 / 배송사 API 연동 가능 */}
        <p className="text-sm mb-5">📦 배송추적 정보는 곧 연결될 예정입니다.</p>

        <button
          className="mt-3 px-4 py-2 border rounded hover:bg-gray-50"
          onClick={() => closeModal()}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DeliveryModal;
