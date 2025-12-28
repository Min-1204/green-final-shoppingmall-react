import React from "react";

const StepAccount = ({ userId, setUserId, onNext }) => {
  const handleNext = () => {
    if (!userId) {
      alert("아이디를 입력해주세요.");
      return;
    }
    // API 호출 없이 프론트에서 아이디를 저장하고 다음 단계로 진행
    onNext();
  };

  return (
    <div className="mt-8 space-y-4">
      <div>
        <label className="text-xs text-gray-500 font-medium">아이디</label>
        <input
          type="text"
          className="mt-1 w-full h-10 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="가입하신 아이디를 입력하세요"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button
        onClick={handleNext}
        className="w-full h-11 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-black transition active:scale-[0.98]"
      >
        다음
      </button>
    </div>
  );
};

export default StepAccount;
