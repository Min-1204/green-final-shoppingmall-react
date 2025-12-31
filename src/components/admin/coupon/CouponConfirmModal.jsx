export const CouponConfirmModal = ({ onClose, onConfirm, coupon }) => {
  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          쿠폰 삭제 확인
        </h3>
        <p className="mb-6 text-gray-600 leading-relaxed">
          "{coupon.couponName}" 쿠폰을 정말 삭제하시겠습니까?
          <br />
          삭제된 쿠폰은 복구할 수 없습니다.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(coupon)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 transition-colors duration-200 cursor-pointer"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
