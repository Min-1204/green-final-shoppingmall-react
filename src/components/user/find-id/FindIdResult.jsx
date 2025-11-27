// src/components/member/find-id/FindIdResult.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FindIdResult = ({ idValue, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl">
          ✔
        </div>
      </div>
      <p className="text-sm text-gray-500">
        고객님 정보와 일치하는 아이디입니다.
      </p>
      <p className="text-lg font-semibold text-gray-900">{idValue}</p>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/login")}
          className="w-full h-10 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black"
        >
          로그인하러 가기
        </button>
        <button
          onClick={onReset}
          className="w-full h-10 rounded-md bg-gray-100 text-sm text-gray-500 hover:bg-gray-200"
        >
          다시 찾기
        </button>
      </div>
    </div>
  );
};

export default FindIdResult;
