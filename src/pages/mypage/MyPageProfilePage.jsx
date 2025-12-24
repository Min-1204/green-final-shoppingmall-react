import React from "react";
import ProfileForm from "../../components/user/mypage/ProfileForm";

export default function MyPageProfilePage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-5 sm:p-7 lg:p-10">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
          개인정보수정
        </h1>
        <p className="text-sm text-zinc-500">
          회원가입 시 입력했던 정보를 수정할 수 있습니다.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
