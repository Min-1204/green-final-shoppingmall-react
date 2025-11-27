import React, { useState } from "react";
import Stepper from "./Stepper";
import { useDaumPostalCode } from "../../../hooks/useDaumPostalCode";

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

  // 콘솔은 개발 중에만 확인하세요
  console.log(signUpForm);

  //prettier-ignore
  const validate = () => { // 유효성 검사 함수
    const e = {}; // 빈 객체 속성 및 데이터추가 가능
    const loginIdRegex = /^[a-zA-Z0-9]+$/; // 영어,숫자만 허용
    if (!signUpForm.loginId || signUpForm.loginId.length < 4) {
      e.loginId = "아이디는 4자 이상 입력하세요.";
    } else if (!loginIdRegex.test(signUpForm.loginId)) {
      e.loginId = "아이디는 영어(대/소문자와)와 숫자만 사용할 수 있습니다.";
    }
    if (!signUpForm.password || signUpForm.password.length < 8)
      e.password = "비밀번호는 8자 이상 입력하세요.";
    if (signUpForm.confirmPassword !== signUpForm.password)
      e.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!signUpForm.name) e.name = "이름을 입력하세요.";
    if (!signUpForm.birthY || !signUpForm.birthM || !signUpForm.birthD) {
      e.birthDate = "생년월일을 모두 입력하세요.";
    } else {
      // 상세 검증
      const year = parseInt(signUpForm.birthY);
      const month = parseInt(signUpForm.birthM);
      const day = parseInt(signUpForm.birthD);

      if (year < 1900 || year > new Date().getFullYear()) {
        e.birthDate = "올바른 연도를 입력하세요.";
      } else if (month < 1 || month > 12) {
        e.birthDate = "월은 1~12 사이여야 합니다.";
      } else if (day < 1 || day > 31) {
        e.birthDate = "일은 1~31 사이여야 합니다.";
      }
    }
    if (!signUpForm.email || !/^\S+@\S+\.\S+$/.test(signUpForm.email))
      e.email = "이메일 형식 오류";
    if (!signUpForm.phoneNumber || !/^\d{10,11}$/.test(signUpForm.phoneNumber))
      e.phoneNumber = "휴대전화 숫자만 10~11자리 입력하세요.";

    if (!signUpForm.postalCode || !/^\d{5}$/.test(signUpForm.postalCode))
      e.postalCode = "우편번호는 5자리 숫자입니다.";
    if (!signUpForm.address) e.address = "기본 주소를 입력하세요.";
    if (!signUpForm.addressDetail) e.addressDetail = "상세 주소를 입력하세요.";

    setErrors(e);

    if (Object.keys(e).length > 0) {
      const firstErrorKey = Object.keys(e)[0];
      const firstErrorMessage = e[firstErrorKey];

      alert(`입력 오류 입니다 : ${firstErrorMessage}`);
      return false;
    }

    return true;
  };

  const handleAddressSearch = () => {
    openPostcode((data) => {
      onChange({
        ...signUpForm,
        postalCode: data.zonecode,
        address: data.address,
        addressDetail: "",
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Stepper step={2} />
      <div className="grid gap-5">
        {/* 아이디  입력란 */}
        <div>
          <Input
            label="아이디 입력"
            required
            value={signUpForm.loginId || ""}
            onChange={(e) =>
              onChange({ ...signUpForm, loginId: e.target.value })
            }
            placeholder="예) product1234"
            error={errors.loginId}
          />
          {errors.loginId && (
            <p className="text-xs text-rose-600 mt-1">{errors.loginId}</p>
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
              required
              value={signUpForm.phoneNumber || ""}
              onChange={(e) =>
                onChange({
                  ...signUpForm,
                  phoneNumber: e.target.value.replace(/\D/g, ""),
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
                    birthY: e.target.value.replace(/\D/g, ""),
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
                    birthM: e.target.value.replace(/\D/g, ""),
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
                    birthD: e.target.value.replace(/\D/g, ""),
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
