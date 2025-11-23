import React, { useEffect, useMemo, useState } from "react";
import AgreementStep from "../../components/user/signup/AgreementStep";
import InfoStep from "../../components/user/signup/InfoStep";
import SuccessStep from "../../components/user/signup/SuccessStep";
import HomeBar from "../../layouts/mainpage/HomeBar";
import SignUpChoiceModal from "../../components/user/signup/SignUpChoiceModal";
import { useDispatch, useSelector } from "react-redux";
//prettier-ignore
import {  signUpPending,  signUpFulfilled, signUpRejected, clearError} from "../../redux/slices/features/user/userSlice";
import { signUpApi } from "../../api/user/userapi";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, signUpSuccess } = useSelector(
    (state) => state.userSlice
  );

  const [step, setStep] = useState(1); // 회원가입 Step 1 ~ 3
  const [modalOpen, setModalOpen] = useState(true); // 회원 가입 페이지로 이동되면 State 기본값이 true이므로 자동으로 오픈됨

  // 약관
  const [terms, setTerms] = useState({
    tos: false, // 약관
    privacy: false, // 개인정보동의
    age14: false // 만 14세이상 동의
  });

  // 회원가입 form
  const [signUpForm, setSignUpForm] = useState({
    loginId: "", // 로그인아이디
    password: "", // 비밀번호
    confirmPassword: "", // 비밀번호 확인
    name: "", // 유저이름
    email: "", // 유저이메일
    phoneNumber: "", // 핸드폰번호
    birthY: "", // 년
    birthM: "", // 월
    birthD: "", // 일
    postalCode: "", // 우편번호
    address: "", // 기본주소
    addressDetail: "", // 상세주소
    smsAgreement: false, // SMS 알림 동의
    emailAgreement: false // Email 알림 동의
  });

  // 모달 열릴 때 페이지 스크롤 잠금 overflow-hidden 클래스 추가
  useEffect(() => {
    // prettier-ignore
    if (modalOpen) document.body.classList.add("overflow-hidden"); // 모달이 열렸을때 해당 overflow-hidden (스크롤잠금) 을 추가
    else document.body.classList.remove("overflow-hidden"); // 모달이 열려있지않을때 해당 overflow-hidden (스크롤잠금) 을 제거
    return () => document.body.classList.remove("overflow-hidden"); // 클린업함수 이전 상태에서 추가했던 클래스를 제거
  }, [modalOpen]);

  // 일반가입 클릭버튼
  const handleSignUpBtn = () => {
    setModalOpen(false); // 버튼이 눌리면, 모달 close
    setStep(1); // 약관 단계부터 시작
  };

  const handleSnsBtn = (type) => {
    // TODO: 실제 SNS 연동 로직 필요 시 추가필요, 추후 API 연동
    alert(`${type.toUpperCase()} 연동은 추후 추가`);
  };

  // 11-10 최종데이터 로그인 상태(State) 출력 로그 확인 및 Success 이동
  const hanldeSignUpSubmit = async () => {
    console.log("=== 회원가입 최종 데이터 ===");
    console.log("약관 동의", terms);
    console.log("회원 정보", signUpForm);
    console.log("=================");

    try {
      // 시작
      dispatch(signUpPending()); // 함수실행

      // api 호출 시작
      const response = await signUpApi(signUpForm);
      console.log("백엔드 응답 콘솔", response);

      // Redux 액션 디스패치
      dispatch(signUpFulfilled(response));

      // 예외처리
    } catch (apiError) {
      console.error("API 에러:", apiError);
      dispatch(
        signUpRejected(apiError.message || "회원가입에 실패 하였습니다")
      );
      alert(
        "회원가입에 실패: " + (apiError.message || "회원가입에 실패 하였습니다")
      );
    }
  };

  useEffect(() => {
    if (signUpSuccess) {
      console.log("✅ 회원가입 성공! SuccessStep으로 이동");
      setStep(3);
    }
  }, [signUpSuccess, dispatch, navigate]);

  // 에러처리 로직
  useEffect(() => {
    if (error) {
      alert(`회원가입 실패: ${error}`);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const page = useMemo(() => {
    //prettier-ignore
    if (step === 1) // step의 상태값이 1과 동일하면 해당 컴포넌트를 출력하고 해당 컴포넌트에 value,onChange,onNext 3개의 props를 전달
      return (
        <AgreementStep
          terms={terms} // 현재 약관 State
          onChange={setTerms} // 약관 변경 State
          onNext={() => setStep(2)} // 다음버튼 회원가입 Step 2로 넘어갈 수 있는 기능
        />
      );
    // prettier-ignore
    if (step === 2) // step의 상태값이 2과 동일하면 해당 컴포넌트를 출력하고 해당 컴포넌트에 value,onChange,onPrev, onSubmit 4개의 props를 전달
      return (
        <InfoStep
          form={signUpForm} // 회원가입 form 전달
          onChange={setSignUpForm}  // 회원가입 변경 form 전달
          onPrev={() => setStep(1)}  // onPrev -> 이전페이지로 이동함수 전달
          onSubmit={hanldeSignUpSubmit} // onSubmit 다음버튼 회원가입 Step 3로 넘어갈 수 있는 기능
        />
      );
    return <SuccessStep />; // 위 useMemo가 모든 if문을 거치는 절차로직을 가지고있고 마지막 if문을 실행 후에는 남은 것은 return 그러므로 SuccessStep이 반환됨
  }, [step, terms, signUpForm, hanldeSignUpSubmit]);

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 홈/메인바 (항상 표시) */}
      <HomeBar />

      {/* 가입 방식 선택 모달 (열려 있을 때만 표시) */}
      {modalOpen && ( // 모달이 true 라면
        <SignUpChoiceModal // 해당 컴포넌트를 출력하고
          open={true}
          onClose={() => setModalOpen(false)} // 모달 닫기
          onNormalJoin={handleSignUpBtn} // 일반 회원가입 버튼
          onSNS={handleSnsBtn} // SNS 연동용 기능 ( 현재 미구현 )
        />
      )}

      {/* 본문: 모달이 닫힌 후 렌더 */}
      {!modalOpen && (
        <div className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold mb-6">회원가입</h1>

          {/* ✅ 로딩 표시 */}
          {loading && (
            <div className="text-center py-4 text-emerald-600">
              <p className="text-lg font-semibold">회원가입 처리중...</p>
            </div>
          )}
          {page}
        </div>
      )}
    </div>
  );
}
