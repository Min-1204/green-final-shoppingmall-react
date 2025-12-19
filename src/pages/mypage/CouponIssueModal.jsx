import React, { useState } from "react";
import { X } from "lucide-react";

export default function CouponIssueModal({ isOpen, onClose, onRegister }) {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!couponCode.trim()) {
      setError("쿠폰 코드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await onRegister(couponCode);
      setCouponCode("");
      onClose();
    } catch (err) {
      setError(err.message || "쿠폰 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCouponCode("");
    setError("");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-opacity-50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">쿠폰 등록</h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div>
          <div className="mb-4">
            <label
              htmlFor="couponCode"
              className="block text-sm font-medium text-zinc-700 mb-2"
            >
              쿠폰 코드
            </label>
            <input
              id="couponCode"
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="쿠폰 코드를 입력하세요"
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="text-sm text-zinc-500 mb-6">
            <p>• 쿠폰 코드는 대소문자를 구분합니다.</p>
            <p>• 이미 사용한 쿠폰은 재등록할 수 없습니다.</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
