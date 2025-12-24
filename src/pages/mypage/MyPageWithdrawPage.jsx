// src/pages/mypage/MyPageWithdrawPage.jsx
import React from "react";
import UserWithdrawForm from "../../components/user/mypage/UserWithdrawForm";

export default function MyPageWithdrawPage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-8">
      <h1 className="text-xl font-bold mb-3 text-red-500">회원탈퇴</h1>
      <p className="text-sm text-zinc-500 mb-6">
        탈퇴 시 일부 정보는 삭제되거나 조회가 제한될 수 있습니다.
      </p>
      <UserWithdrawForm />
    </div>
  );
}
