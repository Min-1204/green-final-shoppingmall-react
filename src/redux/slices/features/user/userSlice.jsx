import { createSlice } from "@reduxjs/toolkit";
import { loginSlice } from "./loginSlice";
import { signupSlice } from "./signUpSlice";

const initialState = {
  user: null, // 현재 로그인한 사용자 정보
  isLoggedIn: false, // 로그인 상태
  token: null, // 인증 토큰
  error: null, // 에러 메시지
  loading: false, // 11-23 추가
  signUpSuccess: false // 11-23 추가
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    ...loginSlice,
    ...signupSlice
  }
});

export const {
  signUpPending, // 11 - 23 추가
  signUpFulfilled, // 11 - 23 추가
  signUpRejected, // 11 - 23 추가
  resetSignUpSuccess, // 11 - 23 추가
  login,
  logout,
  clearError,
  restoreLogin,
  updateUserRole
} = userSlice.actions;

export default userSlice.reducer;
