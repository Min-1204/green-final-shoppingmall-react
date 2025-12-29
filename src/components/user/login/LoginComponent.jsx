import { useNavigate } from "react-router-dom";
import SocialLoginButtons from "../signup/SocialLoginButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsyncThunk,
  getUserProfileThunk,
  clearError
} from "../../../redux/slices/features/user/authSlice";

// prettier-ignore
const LoginComponent = () => {
  const dispatch = useDispatch(); // Redux Dispatch 사용 함수
  const navigate = useNavigate(); // useNaivate 경로Hook 
  const { isLoggedIn, error, loading } = useSelector( (state) => state.authSlice ); // 로그인상태, 에러상태, 로딩상태

  const [loginData, setLoginData] = useState({ // 로그인데이터 Form
    loginId: "", // 로그인아이디
    password: "", // 비밀번호
  });

  

  const inputChangeHandler = (e) => { // 입력핸들러
    const { name, value } = e.target; // 이벤트객체 target 속성 name과 value 디스럭처링
    setLoginData({  // set State 변경
      ...loginData, // 기존 loginData prev
      [name]: value, // [name] = value 변경
    });
    console.log(name, value); 
  };

  useEffect(() => { // useEffcet Hook
    if (isLoggedIn) { // 로그인상태 true
      navigate("/"); // 메인
      alert("로그인에 성공하였습니다."); // 알림
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => { // useEffect Hook
    if (error) { // error true 
      alert(`로그인 실패: ${error}`); // 알림 + error
      dispatch(clearError()); // clearError authSlice 호출
    }
  }, [error, dispatch]); // 의존성 배열


  // prettier-ignore
  const loginHandleClick = () => { // 로그인핸들러
    console.log("여기는 로그인컴포넌트 로그인버튼이 클릭되었다:", loginData); // 로그인 버튼 클릭 시 데이터 확인

    if(!loginData.loginId.trim()) { // loginData의 loginId 공백제거 => 조건반대
      // 즉, 로그인아이디가 공백이라면, 입력되지 않았다면
      alert("아이디를 입력해주세요")  // 알림
      return;
    }
    if(!loginData.password.trim()){ // loginData의 password 공백제거 => 조건반대
      // 즉, 비밀번호가 공백이라면, 입력되지 않았다면
      alert("비밀번호를 입력해주세요") // 알림
      return;
    }
    
    dispatch(loginAsyncThunk(loginData)).unwrap()
    .then(loginResult => { 
        const loginId = loginResult.loginId || loginData.loginId;
        if(loginId) {
          dispatch(getUserProfileThunk(loginId))
          .catch(profileError => {
            console.log("로그인 성공 후 프로필 조회 실패", profileError)
          });
      }
    })
    .catch(err => {
      console.error("로그인 Thunk rejected", err)
    })
    console.log(`로그인 버튼이 눌렸습니다. \n 이메일: ${loginData.loginId} \n 비밀번호: ${loginData.password}`);
  };

  const signHandleClick = () => { // 회원가입 버튼
    navigate("/signup");
  };

  const findIdBtn = () => { // 아이디찾기 버튼
    navigate("/findId");
  };

  const findPasswordBtn = () => { // 비밀번호찾기 버튼
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

          <>
            {/* 입력폼 */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-gray-500">아이디</label>
                <input // 인풋라인
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
              {/* 보안접속 자리 보안적인 부분은 추후 검토 후 적용 예정*/}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-block h-4 w-4 rounded-full bg-red-500" />
                보안접속
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              onClick={loginHandleClick} // 해당 버튼이 눌리면 적용된 State의 폼을 제출한다.
              disabled={loading} // ✅ 추가: 로딩 중 버튼 비활성화
              className="mt-6 w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" // ✅ 추가: disabled 스타일
            >
              {loading ? "로그인 중..." : "로그인"} {/* ✅ 추가: 로딩 상태 표시 삼항연산자 */}
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

          {/* 하단 라인 SNS 로그인 */}
          <SocialLoginButtons className="mt-8" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
