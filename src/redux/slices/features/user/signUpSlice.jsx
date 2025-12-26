import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkLoginIdApi, signUpApi } from "../../../../api/user/userapi";

//prettier-ignore
export const signUpThunk = createAsyncThunk("signup/signup", async(signUpForm, {rejectWithValue})=> {
    // 성공 시 로직
  try {
    const response = await signUpApi(signUpForm);
    console.log("백엔드 회원가입 응답 콘솔", response)
    return response; // 여기가 fulfilled의 payload가 된다. 즉, 성공시!

    // 실패 시 로직
  } catch (error) { // 여기가 rejected 실패 시
    console.log("API 에러 여기는 회원가입 createAsync:", error)
    return rejectWithValue(error.message || "회원가입에 실패하였습니다");
  }
 }
);

// prettier-ignore
export const checkLoginIdThunk = createAsyncThunk(
  "signup/checkLoginId",
  async (loginId, { rejectWithValue }) => { // 해당 loginId를 받으면 자동으로 Thunk Action 실행
    try {
      const response = await checkLoginIdApi(loginId); // 중복확인용 API 호출 받은 loginId를 API로 전달
      console.log("백엔드 아이디 중복확인 응답 콘솔", response);
      return response;
    } catch (error) {
      console.log("여기는 백엔드 아이디 중복확인 에러 콘솔", error);
      return rejectWithValue(
        error.message || "아이디 중복 확인에 실패하였습니다."
      );
    }
  }
);

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    error: null,
    signUpSuccess: false,
    checkingLoginId: false,
    loginIdCheckResult: null,
    loginIdCheckError: null,
    message: null,
    coupon: null,
  },
  reducers: {
    // 회원가입 성공 상태 초기화
    resetSignUpSuccess: (state) => {
      state.signUpSuccess = false;
      state.message = null;
      state.coupon = null;
    },
    // 에러 초기화
    clearError: (state) => {
      state.error = null;
    },
    resetLoginIdCheck: (state) => {
      state.loginIdCheckResult = null;
      state.loginIdCheckError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signUpSuccess = false;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.signUpSuccess = action.payload.success;
        state.message = action.payload.message;
        state.coupon = action.payload.coupon;
        console.log("SignUpSlice 콘솔 회원 가입 성공 :", action.payload);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signUpSuccess = false;
        console.log("SignUpSlice 콘솔 회원 가입 실패 :", action.payload);
      })
      .addCase(checkLoginIdThunk.pending, (state) => {
        state.checkingLoginId = true;
        state.loginIdCheckError = null;
      })
      .addCase(checkLoginIdThunk.fulfilled, (state, action) => {
        state.checkingLoginId = false;
        state.loginIdCheckResult = action.payload;
        state.loginIdCheckError = null;
        console.log("SignUpSlice 아이디 중복 확인 성공", action.payload);
      })
      .addCase(checkLoginIdThunk.rejected, (state, action) => {
        state.checkingLoginId = false;
        state.loginIdCheckError = action.payload;
        state.loginIdCheckResult = null;
        console.log("SignUpSlice 아이디 중복 확인 실패", action.payload);
      });
  },
});

export const { resetSignUpSuccess, clearError, resetLoginIdCheck } =
  signUpSlice.actions;
export default signUpSlice.reducer;
