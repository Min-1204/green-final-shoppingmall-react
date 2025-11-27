// src/components/member/find-password/StepResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepResetPassword = ({ userId }) => {
  const navigate = useNavigate();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  // 비밀번호 규칙 검사 함수
  const validatePassword = (pw) => {
    // 1) 길이
    if (pw.length < 8) {
      return "비밀번호는 8자 이상이어야 합니다.";
    }
    // 2) 공백 불가
    if (/\s/.test(pw)) {
      return "비밀번호에 공백은 사용할 수 없습니다.";
    }
    // 3) 영문
    if (!/[A-Za-z]/.test(pw)) {
      return "비밀번호에 영문자가 1자 이상 포함되어야 합니다.";
    }
    // 4) 숫자
    if (!/[0-9]/.test(pw)) {
      return "비밀번호에 숫자가 1자 이상 포함되어야 합니다.";
    }
    // 5) 특수문자
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=`~]/.test(pw)) {
      return "비밀번호에 특수문자가 1자 이상 포함되어야 합니다.";
    }
    return ""; // 통과
  };

  const handleReset = () => {
    if (!pw1 || !pw2) {
      alert("비밀번호를 두 번 입력해주세요.");
      return;
    }
    if (pw1 !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const msg = validatePassword(pw1);
    if (msg) {
      alert(msg);
      return;
    }

    // TODO: 비밀번호 변경 API
    console.log("비밀번호 변경:", { userId, pw1 });
    alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
    navigate("/login");
  };

  // 입력 중에 너무 긴 걸 막고 싶으면 여기서 컷 해도 됨
  const handlePw1Change = (e) => {
    const { value } = e.target;
    // 너무 엄격하게 자르면 사용자 불편하니 30자 정도로만 컷
    if (value.length > 30) return;
    setPw1(value);
  };
  const handlePw2Change = (e) => {
    const { value } = e.target;
    if (value.length > 30) return;
    setPw2(value);
  };

  return (
    <div className="mt-8 space-y-4">
      <div>
        <label className="text-xs text-gray-500">새 비밀번호</label>
        <input
          type="password"
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="영문+숫자+특수문자 포함 8자 이상"
          value={pw1}
          onChange={handlePw1Change}
        />
        <p className="text-[11px] text-gray-400 mt-1">
          * 공백 없이 8자 이상, 영문/숫자/특수문자를 모두 포함해주세요.
        </p>
      </div>
      <div>
        <label className="text-xs text-gray-500">새 비밀번호 확인</label>
        <input
          type="password"
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          value={pw2}
          onChange={handlePw2Change}
        />
      </div>
      <button
        onClick={handleReset}
        className="w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition"
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default StepResetPassword;
