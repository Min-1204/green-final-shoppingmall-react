import React, { useState } from "react";

const StepVerifyCode = ({ method, email, onNext }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!code || code.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await onNext(code);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <p className="text-sm text-gray-500">
        등록하신 <span className="font-semibold text-gray-900">{email}</span>로
        인증번호를 전송했습니다.
      </p>
      <div>
        <label className="text-xs text-gray-500 font-medium">인증번호</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm tracking-[0.5em] font-bold text-center focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
        />
      </div>
      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition disabled:bg-gray-400"
      >
        {loading ? "확인 중..." : "인증 확인"}
      </button>
    </div>
  );
};

export default StepVerifyCode;
