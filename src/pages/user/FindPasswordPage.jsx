import React, { useState } from "react";
import HomeBar from "../../layouts/mainpage/HomeBar";
import AuthCardLayout from "../../layouts/auth/AuthCardLayout";
import StepIndicator from "../../components/user/find-password/StepIndicator";
import StepAccount from "../../components/user/find-password/StepAccount";
import StepMethodSelect from "../../components/user/find-password/StepMethodSelect";
import StepVerifyCode from "../../components/user/find-password/StepVerifyCode";
import StepResetPassword from "../../components/user/find-password/StepResetPassword";
import { authApi } from "../../api/user/authApi";

const FindPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("email");
  const [code, setCode] = useState("");

  console.log("현재 step:", step);
  console.log("현재 userId:", userId);

  // Step 2: 아이디/이메일 확인 후 인증번호 발송
  const handleSendCode = async (inputEmail) => {
    try {
      await authApi.sendFindPwCode(userId, inputEmail);
      setEmail(inputEmail);
      alert("인증번호가 발송되었습니다.");
      setStep(3);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "입력하신 이메일이 일치하는 회원이 없습니다."
      );
    }
  };

  // Step 3: 인증번호 검증
  const handleVerifyCode = async (inputCode) => {
    try {
      const res = await authApi.verifyFindPw(email, inputCode);
      if (res.data.success) {
        setCode(inputCode);
        setStep(4);
      }
    } catch (err) {
      alert("인증번호가 틀렸습니다.");
      throw err; // StepVerifyCode에서 에러 처리 가능하도록
    }
  };

  // Step 3: 인증번호 재전송
  const handleResendCode = async () => {
    try {
      await authApi.sendFindPwCode(userId, email);
    } catch (err) {
      alert("재전송에 실패했습니다.");
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeBar />
      <div className="flex justify-center px-4 py-10">
        <AuthCardLayout
          title="비밀번호 찾기"
          description="본인 확인 후 새 비밀번호를 설정합니다."
        >
          <StepIndicator step={step} />

          {step === 1 && (
            <StepAccount
              userId={userId}
              setUserId={setUserId}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepMethodSelect
              method={method}
              setMethod={setMethod}
              userId={userId}
              onNext={handleSendCode}
            />
          )}

          {step === 3 && (
            <StepVerifyCode
              method={method}
              email={email}
              currentStep={step}
              onNext={handleVerifyCode}
              onResend={handleResendCode}
            />
          )}

          {step === 4 && <StepResetPassword userId={userId} />}
        </AuthCardLayout>
      </div>
    </div>
  );
};

export default FindPasswordPage;
