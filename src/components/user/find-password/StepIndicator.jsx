import React from "react";

const StepIndicator = ({ step }) => {
  const steps = [
    { num: 1, label: "아이디 입력" },
    { num: 2, label: "인증 수단" },
    { num: 3, label: "인증 번호" },
    { num: 4, label: "새 비밀번호" },
  ];

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center justify-between relative">
        {/* 연결선 */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-gray-900 -z-10 transition-all duration-300"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />

        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s.num
                  ? "bg-gray-900 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-400"
              }`}
            >
              {s.num}
            </div>
            <span
              className={`mt-2 text-xs font-medium whitespace-nowrap ${
                step >= s.num ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
