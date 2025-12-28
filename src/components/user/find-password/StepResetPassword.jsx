import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../api/user/authApi";

const StepResetPassword = ({ userId }) => {
  const navigate = useNavigate();
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pw) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=`~])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-\\[\];'/+=`~]{8,}$/;
    if (!regex.test(pw))
      return "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.";
    if (/\s/.test(pw)) return "비밀번호에 공백은 사용할 수 없습니다.";
    return "";
  };

  const handleReset = async () => {
    if (pw1 !== pw2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const errorMsg = validatePassword(pw1);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    setLoading(true);
    try {
      // 백엔드: AuthController.resetPassword 호출
      await authApi.resetPassword(userId, pw1);
      alert(
        "비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요."
      );
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "비밀번호 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div>
        <label className="text-xs text-gray-500 font-medium">새 비밀번호</label>
        <input
          type="password"
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="영문+숫자+특수문자 8자 이상"
          value={pw1}
          onChange={(e) => setPw1(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 font-medium">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="비밀번호 다시 입력"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />
      </div>
      <button
        onClick={handleReset}
        disabled={loading}
        className="w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition disabled:bg-gray-400"
      >
        {loading ? "변경 중..." : "비밀번호 변경 완료"}
      </button>
    </div>
  );
};

export default StepResetPassword;
