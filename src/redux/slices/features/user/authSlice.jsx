import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../../../api/user/userapi";

export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async (loginForm, { rejectWithValue }) => {
    try {
      const response = await loginApi(loginForm);
      console.log("백엔드 로그인 응답 콘솔", response);
      return response; // 여기서 사용자 정보 반환
    } catch (error) {
      console.error("여기는 API 로그인 에러 createAsync: ", error);
      return rejectWithValue(
        error.response.data?.message || "로그인에 실패하였습니다"
      );
    }
  }
);

const initialState = {
  user: null, // 로그인한 사용자의 정보
  isLoggedIn: false, // 로그인 상태!
  //Todo : token : null, JWT + Security 추가 후 진행 할 예정
  error: null, // 에러 상태
  loading: false, // 로딩 상태
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("currentUser");
      console.log("여기는 AuthSlice : 로그아웃 성공");
    },

    restoreLogin: (state) => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        state.user = JSON.parse(user);
        state.isLoggedIn = true;
        console.log(
          "여기는 AuthSlice: 로그인 상태 복구 완료",
          JSON.parse(user)
        );
      }
    },

    updateUserRole: (state, action) => {
      const { userRole } = action.payload;
      if (state.user) state.user.userRole = userRole;

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        currentUser.userRole = userRole;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
      console.log(`AuthSlice 권한 변경완료 : ${userRole}`);
    },
  },

  clearError: (state) => {
    state.error = null;
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("여기는 AuthSlice pending 진행중 : 로그인 요청 중. . .");
      })

      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.user = action.payload;

        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        console.log("여기는 AuthSlice fulfiled 로그인 성공 ", action.payload);
      })

      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.user = null;

        console.log("여기는 AuthSlice rejected 로그인 실패:", action.payload);
      });
  },
});

export const { logout, restoreLogin, updateUserRole, clearError } =
  authSlice.actions;
export default authSlice.reducer;
