import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import { useDispatch } from "react-redux";
import { resetSignUpSuccess } from "../../../redux/slices/features/user/userSlice";

export default function SuccessStep() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(resetSignUpSuccess);
    navigate("/");
  };

  const handleLoginClick = () => {
    dispatch(resetSignUpSuccess);
    navigate("/loginpage");
  };

  return (
    <div className="space-y-6 text-center">
      <Stepper step={3} />
      <div className="py-16">
        <div className="mx-auto mb-4 size-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl">
          ✓
        </div>
        <h2 className="text-2xl font-bold">회원가입이 완료되었습니다</h2>
        <p className="text-sm text-zinc-500 mt-2">
          이제 다양한 혜택을 만나보세요.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={handleHomeClick}
            className="px-6 h-11 rounded-md border text-sm font-semibold hover:bg-zinc-50"
          >
            홈으로
          </button>
          <button
            onClick={handleLoginClick}
            className="px-6 h-11 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700" // 📌 에메랄드 적용
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
}
