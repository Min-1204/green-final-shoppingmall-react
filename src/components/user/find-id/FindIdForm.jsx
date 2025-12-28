import React, { useState } from "react";
import { authApi } from "../../../api/user/authApi";

const FindIdForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await authApi.sendFindIdCode(email);
      alert("인증 코드가 이메일로 발송되었습니다.");
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "가입되지 않은 이메일입니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const res = await authApi.verifyFindId(email, code);

      if (res.data.success) {
        onSuccess && onSuccess(res.data.userId);
      }
    } catch (err) {
      alert(err.response?.data?.message || "인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-500">가입 이메일</label>
        <div className="flex gap-2">
          <input
            type="email"
            className="flex-1 mt-1 h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sent}
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={loading}
            className={`mt-1 h-10 px-3 text-xs font-semibold rounded-md transition ${
              sent
                ? "bg-gray-400 text-white"
                : "bg-gray-900 text-white hover:bg-black"
            }`}
          >
            {loading ? "발송 중..." : sent ? "재발송" : "인증번호 발송"}
          </button>
        </div>
      </div>

      {sent && (
        <div className="animate-fade-in">
          <label className="text-xs text-gray-500">인증번호</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            placeholder="6자리 인증번호"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!sent}
        className={`mt-2 w-full h-11 rounded-md text-sm font-semibold transition ${
          sent
            ? "bg-gray-900 text-white hover:bg-black"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        아이디 찾기
      </button>

      <p className="text-[11px] text-gray-400 leading-relaxed">
        * 가입 시 등록한 이메일 주소를 입력해 주세요.
        <br />* 인증번호가 오지 않는다면 스팸 메일함을 확인해 주세요.
      </p>
    </div>
  );
};

export default FindIdForm;
