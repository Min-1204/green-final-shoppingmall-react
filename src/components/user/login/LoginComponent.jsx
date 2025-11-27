import { useNavigate } from "react-router-dom";
import SocialLoginButtons from "../signup/SocialLoginButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsyncThunk,
  clearError,
} from "../../../redux/slices/features/user/authSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, error, loading } = useSelector(
    (state) => state.authSlice
  );

  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    console.log(name, value);
  };

  useEffect(() => {
    if (error) {
      alert(`로그인 실패: ${error}`);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      alert("로그인에 성공하였습니다.");
    }
  }, [isLoggedIn, navigate]);

  // prettier-ignore
  const loginHandleClick = () => {
    if(!loginData.loginId.trim()) {
      alert("아이디를 입력해주세요")
      return;
    }
    if(!loginData.password.trim()){
      alert("비밀번호를 입력해주세요")
      return;
    }

  console.log("여기는 로그인컴포넌트 로그인클릭 실행되었다:", loginData);

    dispatch( // dispatch는 action = payload로 전달된다.
      loginAsyncThunk(loginData)
    );
    console.log(`로그인 버튼이 눌렸습니다. \n 이메일: ${loginData.loginId} \n 비밀번호: ${loginData.password}`);
  };

  const signHandleClick = () => {
    navigate("/joinpage");
  };

  const findIdBtn = () => {
    navigate("/findId");
  };

  const findPasswordBtn = () => {
    navigate("/findpw");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 가운데 로그인 카드 */}
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">
          {/* 제목 */}
          <h1 className="text-center text-2xl font-semibold tracking-tight text-gray-900">
            LOGIN
          </h1>

          {/* 내용 영역 */}
          <>
            {/* 입력폼 */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-gray-500">아이디</label>
                <input
                  className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  name="loginId"
                  type="text"
                  value={loginData.loginId}
                  onChange={inputChangeHandler}
                  placeholder="Enter your Id address"
                  disabled={loading} // ✅ 추가: 로딩 중 입력 방지
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">비밀번호</label>
                <input
                  className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={inputChangeHandler}
                  placeholder="Enter password"
                  disabled={loading} // ✅ 추가: 로딩 중 입력 방지
                />
              </div>
              {/* 보안접속 자리 */}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-block h-4 w-4 rounded-full bg-red-500" />
                보안접속
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              onClick={loginHandleClick}
              disabled={loading} // ✅ 추가: 로딩 중 버튼 비활성화
              className="mt-6 w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" // ✅ 추가: disabled 스타일
            >
              {loading ? "로그인 중..." : "로그인"}{" "}
              {/* ✅ 추가: 로딩 상태 표시 */}
            </button>
          </>

          {/* 아이디/비번/회원가입 링크 */}
          <div className="mt-5 mb-5 flex items-center justify-between text-xs text-gray-500">
            <button
              onClick={findIdBtn}
              className="hover:text-gray-900 cursor-pointer"
            >
              아이디찾기
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={findPasswordBtn}
              className="hover:text-gray-900 cursor-pointer"
            >
              비밀번호찾기
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={signHandleClick}
              className="hover:text-gray-900 cursor-pointer"
            >
              회원가입
            </button>
          </div>

          {/* SNS 로그인 */}
          <SocialLoginButtons className="mt-8" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
