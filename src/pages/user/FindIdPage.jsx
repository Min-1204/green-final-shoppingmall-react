import React, { useState } from "react";
import HomeBar from "../../layouts/mainpage/HomeBar";
import AuthCardLayout from "../../layouts/auth/AuthCardLayout";
import FindIdResult from "../../components/user/find-id/FindIdResult";
import FindIdForm from "../../components/user/find-id/FindIdForm";

const FindIdPage = () => {
  const [foundId, setFoundId] = useState(null);

  const handleIdFound = (userId) => {
    setFoundId(userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeBar />
      <div className="flex justify-center px-4 py-10">
        <AuthCardLayout
          title="아이디 찾기"
          description="회원정보에 등록된 본인 정보로 아이디를 찾습니다."
        >
          {foundId ? (
            <FindIdResult idValue={foundId} onReset={() => setFoundId(null)} />
          ) : (
            <FindIdForm onSuccess={handleIdFound} />
          )}
        </AuthCardLayout>
      </div>
    </div>
  );
};

export default FindIdPage;
