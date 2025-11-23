export const signupSlice = {
  // signup 로직 삭제 11 - 13

  // 비동기 처리
  // 회원가입 시작
  signUpPending: (state) => {
    state.loading = true;
    state.error = null;
    state.signUpSuccess = false;
  },

  // 회원가입 성공
  signUpFulfilled: (state, action) => {
    state.loading = false;
    state.signUpSuccess = true;
    state.error = null;
    console.log("회원가입 성공:", action.payload);
  },

  // 회원가입 실패
  signUpRejected: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.signUpSuccess = false;
    console.log("회원가입 실패:", action.payload);
  },

  resetSignUpSuccess: (state) => {
    state.signUpSuccess = false;
  }
};
