// src/pages/mypage/MyPagePasswordPage.jsx
import React from "react";
import PasswordChange from "../../components/user/mypage/PasswordChange";

export default function MyPagePasswordPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-400">
      {/* 🔹 줄(borde-b) 없앰 */}
      <div className="px-8 pt-7">
        <h1 className="text-xl font-bold mb-2">비밀번호 변경</h1>
        <p className="text-sm text-zinc-500 mb-6">
          현재 비밀번호를 확인한 후 새 비밀번호로 변경합니다.
        </p>
      </div>

      {/* 내용 */}
      <div className="px-8 pb-8">
        <div className="max-w-2xl">
          <PasswordChange />
        </div>
      </div>
    </div>
  );
}
