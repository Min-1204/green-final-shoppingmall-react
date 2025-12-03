import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDaumPostalCode } from "../../../hooks/useDaumPostalCode";
import { useNavigate } from "react-router-dom";
//prettier-ignore
import {  authSlice,  getUserProfileThunk,  modifyProfileThunk } from "../../../redux/slices/features/user/authSlice";
//prettier-ignore
import {  formatPhoneNumber,  unformatPhoneNumber } from "../util/formatPhoneNumber.js";

export default function ProfileForm() {
  const { user } = useSelector((state) => state.authSlice);
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
  const [modifyForm, setModifyForm] = useState(initializeForm(null));

  // 로그인한 사용자만 마이페이지 접근할 수 있는 로직 현재는 주석처리
  useEffect(() => {
    // if (!user) {
    //   // navigate("/login");
    //   return;
    // }
    console.log("여기는 ProfileForm user 객체 확인 : ", user);
    console.log("여기는 ProfileForm user.loginid 확인", user.loginId);
    dispatch(getUserProfileThunk(user.loginId))
      .unwrap()
      .then((profileData) => {
        console.log("여기는 unwrap Promise then 결과 확인 :", profileData);
        setModifyForm(initializeForm(profileData));
      })
      .catch((err) => {
        console.error("여기는 then 데이터 결과 프로필 조회 실패:", err);
      });
  }, [user?.loginId, navigate, dispatch]);

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
      const response = await dispatch(
        modifyProfileThunk(finalModifyData)
      ).unwrap();

      const result = response;

      console.log("profile update payload:", finalModifyData);
      console.log("여기는 result 확인용 로그 : ", result);
      if (result.success) {
        alert(result.message || "개인정보 수정이 완료되었습니다.");
      } else {
        alert(result.message || "수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("수정 오류:", error);
      alert(error.message || "개인정보 수정이 실패 하였습니다.");
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
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.name}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            name="email"
            type="email"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">휴대전화번호</label>
          <input
            name="phoneNumber"
            maxLength={11}
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
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
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.birthDate}
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
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            value={modifyForm.address}
            readOnly
          />
        </div>
        <div>
          <input
            name="addressDetail"
            placeholder="상세주소"
            className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
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
          className="w-full border border-zinc-200 rounded-lg h-11 px-3 focus:outline-none focus:ring-2 focus:ring-red-400/30"
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
