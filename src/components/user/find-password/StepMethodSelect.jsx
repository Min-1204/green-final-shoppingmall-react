import React, { useState } from "react";

const StepMethodSelect = ({ method, setMethod, userId, onNext }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (method === "email") {
      if (!email) {
        alert("인증을 받을 이메일을 입력해주세요.");
        return;
      }
      setLoading(true);
      try {
        await onNext(email);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("현재 휴대폰 인증은 준비 중입니다. 이메일 인증을 이용해 주세요.");
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        비밀번호를 재설정할 방법을 선택하세요.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={`flex-1 h-10 rounded-md border text-sm transition font-medium ${
            method === "email"
              ? "border-gray-900 text-gray-900 bg-gray-50"
              : "border-gray-200 text-gray-400"
          }`}
        >
          이메일 인증
        </button>
        <button
          type="button"
          disabled
          className="flex-1 h-10 rounded-md border border-gray-100 text-gray-300 text-sm cursor-not-allowed"
        >
          휴대폰 인증 (준비중)
        </button>
      </div>

      {method === "email" && (
        <div className="space-y-1">
          <label className="text-xs text-gray-500 font-medium">
            인증받을 이메일
          </label>
          <input
            type="email"
            className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-[11px] text-gray-400">
            아이디와 연결된 정확한 이메일을 입력해야 인증번호가 발송됩니다.
          </p>
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition disabled:bg-gray-400"
      >
        {loading ? "발송 중..." : "인증번호 발송"}
      </button>
    </div>
  );
};

export default StepMethodSelect;
