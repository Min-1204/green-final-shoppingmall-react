import { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";

export const StepVerifyCode = ({
  method,
  email,
  onNext,
  currentStep,
  onResend,
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  // 타이머
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 시간 포맷팅 (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = async () => {
    if (!code || code.length !== 6) {
      alert("인증번호 6자리를 입력해주세요.");
      return;
    }

    if (timeLeft <= 0) {
      alert("인증번호가 만료되었습니다. 재전송 버튼을 눌러주세요.");
      return;
    }

    setLoading(true);
    try {
      await onNext(code);
    } catch (err) {
      console.error(err);
      alert("인증번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await onResend();
      setCode("");
      setTimeLeft(300); // 타이머 리셋
      setCanResend(false);
      alert("인증번호가 재전송되었습니다.");
    } catch (err) {
      console.error(err);
      alert("재전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          등록하신 <span className="font-semibold text-gray-900">이메일</span>로
          인증번호를 전송했습니다.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            인증번호
          </label>
          <span
            className={`text-sm font-semibold ${
              timeLeft <= 60 ? "text-red-500" : "text-blue-600"
            }`}
          >
            {timeLeft > 0 ? formatTime(timeLeft) : "시간 만료"}
          </span>
        </div>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          className="w-full h-12 px-4 border border-gray-300 rounded-lg text-lg tracking-[0.5em] font-bold text-center focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="0 0 0 0 0 0"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          disabled={timeLeft <= 0}
        />
        {timeLeft <= 0 && (
          <p className="mt-2 text-sm text-red-500">
            인증번호가 만료되었습니다. 아래 재전송 버튼을 눌러주세요.
          </p>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={loading || timeLeft <= 0}
        className="w-full h-12 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-black transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "확인 중..." : "인증 확인"}
      </button>

      <div className="text-center space-y-2">
        <button
          onClick={handleResend}
          disabled={!canResend || resending}
          className="text-sm text-gray-500 hover:text-gray-700 underline disabled:text-gray-300 disabled:no-underline disabled:cursor-not-allowed"
        >
          {resending ? "재전송 중..." : "인증번호를 받지 못하셨나요?"}
        </button>
        {!canResend && timeLeft > 0 && (
          <p className="text-xs text-gray-400">
            재전송은 시간 만료 후 가능합니다
          </p>
        )}
      </div>
    </div>
  );
};

export default StepVerifyCode;
