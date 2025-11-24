import { createSlice } from "@reduxjs/toolkit";
import { loginSlice } from "./loginSlice";

const initialState = {
  user: null, // 현재 로그인한 사용자 정보
  isLoggedIn: false, // 로그인 상태
  token: null, // 인증 토큰
  error: null, // 에러 메시지
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    ...loginSlice,
  },
});

export const { login, logout, clearError, restoreLogin, updateUserRole } =
  userSlice.actions;

export default userSlice.reducer;
