import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../../../api/user/userApi";

export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  // 해당 구현부에서 api에 전달
  async (loginForm, { rejectWithValue }) => {
    // 로그인폼과  thunkAPI rejucetValue
    try {
      const response = await loginApi(loginForm); // 로그인 api에 loginForm을 보냄
      console.log("백엔드 로그인 응답 콘솔", response); // 응답이오면 콘솔로그로 체크
      return response; // 여기서 (응답)사용자정보를 반환
    } catch (error) {
      // null 이거나 undefined 이면 catch로 넘어오고
      console.error("여기는 API 로그인 에러 createAsync: ", error); // 빨간색 error를 표시
      return rejectWithValue(
        error.response.data?.message || "로그인에 실패하였습니다" // 해당 rejectWithValue를 선택적 반환 (Custom)
      );
    }
  }
);

const initialState = {
  // 기본 State
  user: null, // 로그인한 사용자의 정보
  isLoggedIn: false, // 로그인 상태!
  //Todo : token : null, JWT + Security 추가 후 진행 할 예정
  error: null, // 에러 상태
  loading: false // 로딩 상태
};

// prettier-ignore
export const authSlice = createSlice({// Slice 생성
  name: "auth", // Type
  initialState, // State
  reducers: { // reducer 함수
    logout: (state) => { // 로그아웃
      state.user = null; // 유저정보
      state.isLoggedIn = false; // 로그인상태
      state.error = null; // 에러상태
      state.loading = false; // 로딩상태
      localStorage.removeItem("currentUser"); // localStorage의 currentUser 키값 삭제
      console.log("여기는 AuthSlice : 로그아웃 성공"); // logout reducer 종료.
    },

    // prettier-ignore
    restoreLogin: (state) => { // 로그인유지 함수
      const user = localStorage.getItem("currentUser"); // localstorage의 currentUser 키값 불러와서 user에 저장
      if (user) { // user가 true라면
        state.user = JSON.parse(user); // user를 JSON.parse적용 변환
        state.isLoggedIn = true; // 로그인상태를 true
        console.log( "여기는 AuthSlice: 로그인 상태 복구 완료", JSON.parse(user) ); // 변환된 user 로그 출력
      }
    },

    // prettier-ignore
    // 1) 현재 유저의 정보를 가져와서 action.payload의 값으로 변경 하기 위한 로직
    updateUserRole: (state, action) => { // 사용자권한 변환함수
      const { userRole } = action.payload; // payload값을 userRole 디스럭쳐링
      if (state.user) state.user.userRole = userRole; // state.user 가 true라면 state의user의 userRole을 userRole로 변경
      
    // 2) localStorage에 저장된 데이터를 변경하기 위한 로직
      const currentUser = JSON.parse(localStorage.getItem("currentUser")); // localstorage에서 currntUser 키값을 불러와서 JSON.parse로 변환 currentUser에 저장
      if (currentUser) { // currentUser에 데이터 존재하면
        currentUser.userRole = userRole; // currentUser의 userRole에 userRole로 변경
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // localstorage의 currentUser를 stringify 변환 후 새로 저장 
      }
      console.log(`AuthSlice 권한 변경완료 : ${userRole}`);
    },

    // 현재 에러의 상태를 초기화하는 로직
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => { // builder 자동생성
    builder 
      .addCase(loginAsyncThunk.pending, (state) => { // pending 처리 로직
        state.loading = true; // 로딩상태 true
        state.error = null; // 에러상태 null
        console.log("여기는 AuthSlice pending 진행중 : 로그인 요청 중. . ."); // 
      })

      .addCase(loginAsyncThunk.fulfilled, (state, action) => { // fulfiled 처리 로직
        state.loading = false; // 로딩상태 false
        state.isLoggedIn = true; // 로그인상태 true
        state.error = null; // 에러상태 null
        state.user = action.payload; // user의 정보 action.payload 변경 => action.payload는 해당 처리된 결과값 즉, response

        localStorage.setItem("currentUser", JSON.stringify(action.payload)); // localstorage에 해당 action.payload 값 stringify 변환 후 저장
        console.log("여기는 AuthSlice fulfiled 로그인 성공 ", action.payload);
      })

      .addCase(loginAsyncThunk.rejected, (state, action) => { // rejected 처리 로직
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
