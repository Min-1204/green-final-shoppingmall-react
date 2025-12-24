import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostalCode } from "../../../hooks/useDaumPostalCode";
import { useNavigate } from "react-router-dom";
//prettier-ignore
import {  authSlice,  getUserProfileThunk,  modifyProfileThunk } from "../../../redux/slices/features/user/authSlice";
//prettier-ignore
import {  formatPhoneNumber,  unformatPhoneNumber } from "../util/formatPhoneNumber.js";

export default function ProfileForm() {
  const { user, profile } = useSelector((state) => state.authSlice);
  const { openPostcode } = useDaumPostalCode(); // 다음주소API
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initializeForm = (profileData) => ({
    name: profileData?.name || "",
    email: profileData?.email || "",
    phoneNumber: profileData?.phoneNumber || "",
    birthDate: profileData?.birthDate || "",
    postalCode: profileData?.postalCode || "",
    address: profileData?.address || "",
    addressDetail: profileData?.addressDetail || "",
    smsAgreement: profileData?.smsAgreement || false,
    emailAgreement: profileData?.emailAgreement || false,
    password: "",
  });

  // prettier-ignore
  const [modifyForm, setModifyForm] = useState(initializeForm(profile));

  useEffect(() => {
    if (user?.loginId && !profile) {
      console.log(
        "여기는 ProfileForm 로그인한 유저는 있지만 Profile이 없음으로 API 호출 실행"
      );
      dispatch(getUserProfileThunk(user.loginId));
    }
  }, [user, profile, dispatch]);

  useEffect(() => {
    if (profile) {
      setModifyForm(initializeForm(profile));
      console.log("ProfileForm: Redux profile 데이터 폼 상태 갱신 완료");
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModifyForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.loginId) {
      alert("로그인 아이디정보가 유효하지 않습니다.");
      return;
    }

    if (!modifyForm.password) {
      alert("수정하려면 현재 비밀번호를 입력하세요.");
      return;
    }

    const finalModifyData = {
      ...modifyForm,
      loginId: user.loginId,
      phoneNumber: unformatPhoneNumber(modifyForm.phoneNumber),
    };

    try {
      const result = await dispatch(
        modifyProfileThunk(finalModifyData)
      ).unwrap();

      console.log("profile update payload:", finalModifyData);
      console.log("여기는 result 확인용 로그 : ", result);
      if (result.success) {
        alert(result.message);
        await dispatch(getUserProfileThunk(user.loginId)).unwrap();
        console.log("프로필 재조회 완료");
        setModifyForm((prev) => ({ ...prev, password: "" }));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddressSearch = () => {
    openPostcode((data) => {
      setModifyForm({
        ...modifyForm,
        postalCode: data.zonecode,
        address: data.address,
        addressDetail: "",
      });
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            name="name"
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.name}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">휴대전화번호</label>
          <input
            name="phoneNumber"
            maxLength={11}
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={formatPhoneNumber(modifyForm.phoneNumber)}
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
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.birthDate}
            readOnly
          />
        </div>
      </div>

      {/* 주소 */}
      <div className="pt-1 border-t border-dashed border-gray-400"></div>
      <div>
        <p className="text-sm font-semibold mb-3 text-zinc-800">거주지 주소</p>
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            name="postalCode"
            placeholder="우편번호"
            className="sm:w-48 border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.postalCode}
            readOnly
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            className="inline-flex items-center justify-center px-4 h-11 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-800"
          >
            주소찾기
          </button>
        </div>
        <div className="mb-3">
          <input
            name="address"
            placeholder="도로명주소"
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.address}
            readOnly
          />
        </div>
        <div>
          <input
            name="addressDetail"
            placeholder="상세주소"
            className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.addressDetail}
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
            checked={modifyForm.smsAgreement}
            onChange={handleChange}
            className="w-4 h-4"
          />
          SMS 수신
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            name="emailAgreement"
            checked={modifyForm.emailAgreement}
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
          className="w-full border border-gray-400 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-red-400/30"
          value={modifyForm.password}
          onChange={handleChange}
        />
        <p className="text-xs text-zinc-400 mt-1">안내글 설정은 아직입니다.</p>
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
