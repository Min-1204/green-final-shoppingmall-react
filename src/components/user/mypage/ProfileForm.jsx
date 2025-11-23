import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProfileForm() {
  const { user } = useSelector((state) => state.userSlice);

  // prettier-ignore
  const [modifyform, setModifyForm] = useState({
    ...(user || {}),
    // Y, M, D가 분리되어 있는상태로 문자열 결합하기
    birthDate: // birth_date 속성 추가
      user?.birthY && user?.birthM && user?.birthD // user 데이터의 birth Y , M , D 데이터가 전부 있는지
        ? `${user.birthY} - ${String(user.birthM).padStart(2, "0")} - ${String( user.birthD).padStart(2, "0")}` // 있다면 백틱 객체리터럴사용해서 문자열 결합
        : "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModifyForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!modifyform.password) {
      alert("수정하려면 현재 비밀번호를 입력하세요.");
      return;
    }
    console.log("profile update payload:", modifyform);
    alert("지금은 스케치 단계입니다. 백엔드 붙인 후 실제로 저장하세요 🙂");
  };

  const handleFindAddress = () => {
    alert("여기에 다음/카카오 우편번호 팝업 붙일 예정입니다.");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            name="name"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.name}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            name="email"
            type="email"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">휴대전화번호</label>
          <input
            name="phone_Number"
            maxLength={11}
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.phoneNumber}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            생년월일 (8자리)
          </label>
          <input
            name="birthDate"
            maxLength={8}
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.birthDate}
            readOnly
          />
        </div>
      </div>

      {/* 주소 */}
      <div className="pt-1 border-t border-dashed border-zinc-200"></div>
      <div>
        <p className="text-sm font-semibold mb-3 text-zinc-800">거주지 주소</p>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            name="postalCode"
            placeholder="우편번호"
            className="sm:w-48 border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.postalCode}
            onChange={handleChange}
            readOnly
          />
          <button
            type="button"
            onClick={handleFindAddress}
            className="inline-flex items-center justify-center px-4 h-11 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-800"
          >
            주소찾기
          </button>
        </div>
        <div className="mb-3">
          <input
            name="address"
            placeholder="도로명주소"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="addressDetail"
            placeholder="상세주소"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyform.addressDetail}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 마케팅 동의 */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            name="smsAgreement"
            checked={modifyform.smsAgreement}
            onChange={handleChange}
            className="w-4 h-4"
          />
          SMS 수신
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            name="emailAgreement"
            checked={modifyform.emailAgreement}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Email 수신
        </label>
      </div>

      {/* 현재 비밀번호 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          현재 비밀번호 <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          placeholder="정보를 수정하려면 현재 비밀번호를 입력하세요."
          className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-red-400/30"
          value={modifyform.password}
          onChange={handleChange}
        />
        <p className="text-xs text-zinc-400 mt-1">
          서버에서 실제 로그인 비밀번호와 일치하는지 다시 검증해야 합니다.
        </p>
      </div>

      {/* 저장 버튼 */}
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-sm hover:bg-zinc-800"
        >
          저장
        </button>
      </div>
    </form>
  );
}
