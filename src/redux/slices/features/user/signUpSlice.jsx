import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpApi } from "../../../../api/user/userapi";

//prettier-ignore
export const signUpThunk = createAsyncThunk("signup/signup", async(userData, {rejectWithValue})=> {
    // 성공 시 로직
  try {
    const response = await signUpApi(userData);
    console.log("백엔드 응답 콘솔", response)
    return response; // 여기가 fulfilled의 payload가 된다. 즉, 성공시!

    // 실패 시 로직
  } catch (error) { // 여기가 rejected 실패 시
    console.log("API 에러 여기는 createAsync:", error)
    return rejectWithValue(error.message || "회원가입에 실패하였습니다");
  }
 }
);

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    error: null,
    signUpSuccess: false,
  },
  reducers: {
    // 회원가입 성공 상태 초기화
    resetSignUpSuccess: (state) => {
      state.signUpSuccess = false;
    },
    // 에러 초기화
    clearError: (state) => {
      state.error = null;
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
        state.signUpSuccess = true;
        console.log("SignUpSlice 콘솔 회원 가입 성공 :", action.payload);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signUpSuccess = false;
        console.log("SignUpSlice 콘솔 회원 가입 실패 :", action.payload);
      });
  },
});

export const { resetSignUpSuccess, clearError } = signUpSlice.actions;
export default signUpSlice.reducer;
