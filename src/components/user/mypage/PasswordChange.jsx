import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk } from "../../../redux/slices/features/user/authSlice";

export default function PasswordChange() {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  // if (!user) {
  //   return <div> Loading . . .</div>;
  // }

  console.log("여기는 비밀번호 수정 페이지 로그인한 사용자 : ", user?.loginId);
  const [pwForm, setPwForm] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  //prettier-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("현재 비밀번호 :", pwForm.password);
    console.log("새 비밀번호 :", pwForm.newPassword);
    console.log("새 비밀번호확인 :", pwForm.newPasswordConfirm);

    // 유효성 검사
    if (!pwForm.password) {
      alert("현재 비밀번호를 입력하세요.");
      return;
    }

    if (!pwForm.newPassword) {
      alert("새 비밀번호를 입력하세요.");
      return;
    }
    if (!pwForm.newPasswordConfirm) {
      alert("새 비밀번호를 확인을 입력하세요.");
      return;
    }
    if (pwForm.newPassword !== pwForm.newPasswordConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // Thunk 처리 반환 값 활용
    try {
      const result = await dispatch(
        changePasswordThunk({
          loginId: user.loginId,
          password: pwForm.password,
          newPassword: pwForm.newPassword
        })
      ).unwrap();

      console.log("여기는 Submit 반환결과 :", result)

      if (result.success) {
        alert(result.message);
        setPwForm({
          password: "",
          newPassword: "",
          newPasswordConfirm: ""
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">현재 비밀번호</label>
        <input
          type="password"
          name="password"
          className="w-full h-10 px-3 border border-gray-400 rounded-lg"
          value={pwForm.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">새 비밀번호</label>
        <input
          type="password"
          name="newPassword"
          className="w-full h-10 px-3 border border-gray-400 rounded-lg"
          value={pwForm.newPassword}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          name="newPasswordConfirm"
          className="w-full h-10 px-3 border border-gray-400 rounded-lg"
          value={pwForm.newPasswordConfirm}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2 bg-zinc-900 text-white rounded-lg text-sm"
      >
        비밀번호 변경
      </button>
    </form>
  );
}
