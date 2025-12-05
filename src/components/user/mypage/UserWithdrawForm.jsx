import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withdrawalUserApi } from "../../../api/user/userapi";
import { logout } from "../../../redux/slices/features/user/authSlice";

export default function UserWithdrawForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authSlice);

  const [withdrawalForm, setWithdrawalForm] = useState({
    reason: "",
    password: ""
  });

  console.log("현재 회원탈퇴 Form : ", withdrawalForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!withdrawalForm.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (!withdrawalForm.reason) {
      alert("탈퇴 사유를 선택해주세요.");
      return;
    }

    try {
      const response = await withdrawalUserApi({
        loginId: user.loginId,
        password: withdrawalForm.password,
        userWithdrawalReason: withdrawalForm.reason
      });
      console.log("회원탈퇴 Form 요청 :", response);

      if (response.success) {
        if (window.confirm("정말 탈퇴 하시겠습니까?")) {
          alert(response.message);
          dispatch(logout());
          navigate("/");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">
          탈퇴 사유를 선택해주세요
        </label>
        <select
          name="reason"
          className="w-full border rounded-lg h-10 px-3"
          value={withdrawalForm.reason}
          onChange={handleChange}
        >
          <option value="">탈퇴 사유</option>
          <option value="SERVICE_DISSATISFACTION">서비스 불만족</option>
          <option value="PRIVACY_CONCERN">개인정보 우려</option>
          <option value="LOW_USAGE">사용 빈도 낮음</option>
          <option value="SWITCHING_SERVICE">다른 서비스를 이용</option>
          <option value="EXPENSIVE">가격이 비싸다</option>
          <option value="ETC">기타</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
        <input
          type="password"
          name="password"
          className="w-full border rounded-lg h-10 px-3"
          onChange={handleChange}
          placeholder="******"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
      >
        탈퇴하기
      </button>
    </form>
  );
}
