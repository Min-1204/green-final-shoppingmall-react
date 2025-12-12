import React from "react";

const ConfimPurchaseModal = ({ order, userId, closeModal, onConfirm }) => {
  // order.earnedPoints를 사용하여 적립 포인트를 표시합니다.
  const earnedPoints = order?.earnedPoints || "0원"; // order나 earnedPoints가 없을 경우 '0원'으로 기본값 설정

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* 모달 헤더 */}
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">✅ 구매 확정하기</h2>
        </div>

        {/* 모달 내용 */}
        <div className="p-6 space-y-5">
          {/* 적립 포인트 정보 섹션 */}
          <div className="bg-orange-50 p-4 rounded-lg text-center border-2 border-orange-300">
            <h3 className="text-md font-semibold text-orange-700 mb-2">
              구매 확정 시 적립되는 포인트
            </h3>
            <p className="text-3xl font-extrabold text-orange-600">
              {earnedPoints}
            </p>
            <p className="text-sm text-orange-700 mt-1">
              포인트가 즉시 적립됩니다.
            </p>
          </div>

          {/* 구매 확정 정의 섹션 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              구매 확정이란?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              상품을 받거나 서비스를 제공받은 후, **반품이나 교환 없이 구매를
              최종적으로 확인**하는 고객님의 의사 표시입니다.
            </p>
          </div>

          {/* 중요 경고 섹션 (반품/교환 불가) */}
          <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
            <p className="font-bold text-red-600 flex items-center">
              <span className="text-xl mr-2">⚠️</span> 중요 안내
            </p>
            <p className="text-sm text-red-700 mt-1">
              **구매 확정 이후에는 반품/교환 신청이 불가**하오니, 상품을 충분히
              확인하신 후 진행해 주세요.
            </p>
          </div>

          {/* 최종 확인 문구 */}
          <p className="text-md font-medium text-center text-gray-800 pt-2">
            위 내용을 확인하셨다면, **구매를 확정**하시겠습니까?
          </p>
        </div>

        {/* 모달 푸터 (버튼 영역) */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-white sticky bottom-0">
          <button
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out font-medium"
            onClick={closeModal}
          >
            닫기
          </button>

          <button
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-150 ease-in-out font-semibold shadow-md shadow-orange-200"
            onClick={() => {
              // 구매 확정 로직 호출
              onConfirm(userId, order);
              closeModal();
            }}
          >
            구매 확정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfimPurchaseModal;
