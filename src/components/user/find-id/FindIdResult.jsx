import React from "react";
import { useNavigate } from "react-router-dom";

const FindIdResult = ({ idValue, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-center py-4">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center text-green-500">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">
          고객님의 아이디를 찾았습니다.
        </p>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">
          {idValue}
        </p>
      </div>

      <div className="space-y-2 pt-4">
        <button
          onClick={() => navigate("/login")}
          className="w-full h-12 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-black transition shadow-lg shadow-gray-200"
        >
          로그인하러 가기
        </button>
        <button
          onClick={onReset}
          className="w-full h-12 rounded-lg bg-white border border-gray-200 text-sm text-gray-500 font-medium hover:bg-gray-50 transition"
        >
          다시 찾기
        </button>
      </div>
    </div>
  );
};

export default FindIdResult;
