import React, { useState } from "react";
import Stepper from "./Stepper";
import { useDaumPostalCode } from "../../../hooks/useDaumPostalCode";
import { useDispatch, useSelector } from "react-redux";
// prettier-ignore
import {  checkLoginIdThunk,  resetLoginIdCheck} from "../../../redux/slices/features/user/signUpSlice";
import { validate } from "../util/validation";

// Input 컴포넌트: error prop을 받아서 에러 발생 시 빨간색 테두리 적용
function Input({ label, required, error, className = "", ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">
        {label} {required && <b className="text-rose-600">*</b>}
      </span>

      <input
        {...props}
        className={`h-11 px-3 rounded-md border outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition ${
          error ? "border-rose-600" : "border-zinc-300"
        } ${className}`}
      />
    </label>
  );
}

export default function InfoStep({ signUpForm, onChange, onPrev, onSubmit }) {
  const [errors, setErrors] = useState({});
  const { openPostcode } = useDaumPostalCode(); // 다음주소API
  const dispatch = useDispatch();
  // prettier-ignore
  const { checkingLoginId, loginIdCheckResult, loginIdCheckError } = useSelector((state) => state.signUpSlice); // Redux signUpSlice 사용

  console.log(signUpForm); // 회원가입 폼 출력

  // 유효성 검사 함수
  const validation = async () => {
    const validError = validate(signUpForm); // 회원가입 State 전달

    if (Object.keys(validError).length > 0) {
      const firstErrorKey = Object.keys(validError)[0];
      const firstMessage = validError[firstErrorKey];
      alert(`입력 오류 입니다: ${firstMessage}`);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleAddressSearch = () => {
    // 주소찾기 API
    openPostcode((data) => {
      onChange({
        ...signUpForm,
        postalCode: data.zonecode,
        address: data.address,
        addressDetail: ""
      });
    });
  };

  // prettier-ignore
  const handleSubmit = async (e) => { // 회원가입 Form 전송
    e.preventDefault();
    const isValid = await validation();
    if (isValid) {
      onSubmit();
    }
  };

  // prettier-ignore
  const handleDuplicateCheck = async () => { // 중복확인 핸들러
    console.log("중복확인 버튼이 눌렸습니다");

    const validationErrors = validate(signUpForm);
    const loginIdError = validationErrors.loginId;

    if (loginIdError) {
      setErrors({...errors, loginId: loginIdError});
      alert(`아이디 입력 오류, ${loginIdError}`);
      return;
  }

  // 구현부 Redux SignUpSlice 사용
    try {
      const resultId = await dispatch( checkLoginIdThunk(signUpForm.loginId)).unwrap(); // Redux Thunk 함수 호출
      if (resultId.isDuplicate) {   setErrors( { ...errors, loginId: resultId.message || " 이미 사용중인 아이디 입니다."  });
        alert(resultId.message);
      } else {
        setErrors({ ...errors, loginId: "" }); // 에러제거
        alert(resultId.message || "사용 가능한 아이디 입니다.");
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
    }
  };

  const handleLoginIdChange = (e) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    onChange({ ...signUpForm, loginId: filteredValue });
    dispatch(resetLoginIdCheck());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Stepper step={2} />
      <div className="grid gap-5">
        {/* 아이디 입력란 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            아이디 입력 <span className="text-rose-600">*</span>
          </label>
          <div className="flex gap-2 items-start">
            <input
              type="text"
              required
              value={signUpForm.loginId || ""}
              onChange={handleLoginIdChange}
              placeholder="예) product1234"
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 ${
                errors.loginId ? "border-rose-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={handleDuplicateCheck}
              disabled={checkingLoginId}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
            >
              {checkingLoginId ? "확인 중..." : "중복 확인"}
            </button>
          </div>
          {errors.loginId && (
            <p className="text-xs text-rose-600 mt-1">{errors.loginId}</p>
          )}

          {loginIdCheckError && (
            <p className="text-xs text-rose-600 mt-1">{loginIdCheckError}</p>
          )}

          {loginIdCheckResult?.available && (
            <p className="text-xs text-green-600 mt-1">
              {loginIdCheckResult.message}
            </p>
          )}
        </div>

        {/* 비밀번호 입력란 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Input
              label="비밀번호(영문,숫자,특수문자 8~15자)"
              required
              type="password"
              value={signUpForm.password || ""}
              onChange={(e) =>
                onChange({ ...signUpForm, password: e.target.value })
              }
              placeholder="••••••"
              error={errors.password}
            />
            {errors.password && (
              <p className="text-xs text-rose-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <Input
              label="비밀번호 재입력"
              required
              type="password"
              value={signUpForm.confirmPassword || ""}
              onChange={(e) =>
                onChange({ ...signUpForm, confirmPassword: e.target.value })
              }
              placeholder="••••••"
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* 이름 / 이메일  입력란 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Input
              label="이름 입력"
              required
              value={signUpForm.name || ""}
              onChange={(e) =>
                onChange({ ...signUpForm, name: e.target.value })
              }
              placeholder="홍길동"
              error={errors.name}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Input
              label="이메일 입력"
              required
              type="email"
              value={signUpForm.email || ""}
              onChange={(e) =>
                onChange({ ...signUpForm, email: e.target.value })
              }
              placeholder="name@example.com"
              error={errors.email}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* 이메일 수신 동의: 정렬 및 바인딩 분리 */}
        <div className="flex items-center gap-3">
          <input
            id="emailAgreement"
            type="checkbox"
            className="h-4 w-4 rounded accent-emerald-500 focus:ring-emerald-300"
            checked={!!signUpForm.emailAgreement}
            onChange={(e) =>
              onChange({ ...signUpForm, emailAgreement: e.target.checked })
            }
          />
          <label htmlFor="emailAgreement" className="text-sm">
            이메일 수신 동의 (선택)
          </label>
        </div>

        {/* 휴대전화 / 생년월일   입력란  */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Input
              label="휴대전화 입력 (숫자만)"
              maxLength={11}
              required
              value={signUpForm.phoneNumber || ""}
              onChange={(e) =>
                onChange({
                  ...signUpForm,
                  phoneNumber: e.target.value.replace(/\D/g, "")
                })
              }
              placeholder="01012345678"
              error={errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-rose-600 mt-1">{errors.phoneNumber}</p>
            )}

            {/* SMS 수신 동의: 이메일 동의와 동일한 스타일로 정렬 */}
            <div className="flex items-center gap-3 mt-2">
              <input
                id="smsAgreement"
                type="checkbox"
                className="h-4 w-4 rounded accent-emerald-500 focus:ring-emerald-300"
                checked={!!signUpForm.smsAgreement}
                onChange={(e) =>
                  onChange({ ...signUpForm, smsAgreement: e.target.checked })
                }
              />
              <label htmlFor="smsAgreement" className="text-sm">
                SMS 수신 동의 (선택)
              </label>
            </div>
          </div>

          <div className="pb-8">
            <span className="text-sm font-medium mb-2">생년월일</span>

            <div className="grid grid-cols-3 gap-3 mt-2">
              <input
                placeholder="YYYY"
                maxLength={4}
                value={signUpForm.birthY || ""}
                onChange={(e) =>
                  onChange({
                    ...signUpForm,
                    birthY: e.target.value.replace(/\D/g, "")
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />

              <input
                placeholder="MM"
                maxLength={2}
                value={signUpForm.birthM || ""}
                onChange={(e) =>
                  onChange({
                    ...signUpForm,
                    birthM: e.target.value.replace(/\D/g, "")
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />

              <input
                placeholder="DD"
                maxLength={2}
                value={signUpForm.birthD || ""}
                onChange={(e) =>
                  onChange({
                    ...signUpForm,
                    birthD: e.target.value.replace(/\D/g, "")
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>
          </div>
        </div>

        {/* 우편번호 및 주소 찾기 입력란 */}
        <div className="grid gap-2">
          <span className="text-sm font-medium">
            우편번호 <b className="text-rose-600">*</b>
          </span>
          <div className="flex gap-3 items-start">
            <input
              maxLength={5}
              value={signUpForm.postalCode || ""}
              readOnly
              placeholder="01234"
              className={`h-11 px-3 rounded-md border outline-none focus:ring-2 focus:ring-emerald-600 text-sm w-32 transition ${
                errors.postalCode ? "border-rose-600" : "border-zinc-300"
              }`}
              type="text"
            />
            <button
              type="button"
              onClick={handleAddressSearch}
              className="px-4 h-11 rounded-md bg-zinc-100 text-zinc-700 text-sm font-semibold hover:bg-zinc-200 transition"
            >
              주소 찾기
            </button>
          </div>
          {errors.postalCode && (
            <p className="text-xs text-rose-600 mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* 기본 주소 입력란 */}
        <div className="grid gap-2">
          <span className="text-sm font-medium">
            기본 주소 <b className="text-rose-600">*</b>
          </span>
          <input
            value={signUpForm.address || ""}
            readOnly
            placeholder="기본 주소 (예: 서울특별시 강남구 테헤란로)"
            className={`h-11 px-3 rounded-md border outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition ${
              errors.address ? "border-rose-600" : "border-zinc-300"
            }`}
            type="text"
          />
          {errors.address && (
            <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
          )}
        </div>

        {/* 상세 주소 입력란 */}
        <div className="grid gap-2">
          <span className="text-sm font-medium">
            상세 주소 <b className="text-rose-600">*</b>
          </span>
          <input
            value={signUpForm.addressDetail || ""}
            onChange={(e) =>
              onChange({ ...signUpForm, addressDetail: e.target.value })
            }
            placeholder="상세 주소 (예: 101동 101호)"
            className={`h-11 px-3 rounded-md border outline-none focus:ring-2 focus:ring-emerald-600 text-sm transition ${
              errors.addressDetail ? "border-rose-600" : "border-zinc-300"
            }`}
            type="text"
          />
          {errors.addressDetail && (
            <p className="text-xs text-rose-600 mt-1">{errors.addressDetail}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 h-11 rounded-md border border-zinc-300 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition"
        >
          이전
        </button>

        <button
          type="submit"
          className="px-6 h-11 rounded-md bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
