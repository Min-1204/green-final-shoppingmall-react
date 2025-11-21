import React, { useState } from "react";
import Stepper from "./Stepper";

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

export default function InfoStep({ form, onChange, onPrev, onSubmit }) {
  const [errors, setErrors] = useState({});

  // 콘솔은 개발 중에만 확인하세요
  console.log(form);

  const validate = () => {
    const e = {};
    if (!form.login_Id || form.login_Id.length < 4)
      e.login_Id = "아이디는 4자 이상 입력하세요.";
    if (!form.password || form.password.length < 6)
      e.password = "비밀번호는 8자 이상 입력하세요.";
    if (form.confirmPassword !== form.password)
      e.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!form.name) e.name = "이름을 입력하세요.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "이메일 형식 오류";
    if (!form.phone_Number || !/^\d{10,11}$/.test(form.phone_Number))
      e.phone_Number = "휴대전화 숫자만 10~11자리 입력하세요.";

    if (!form.postal_Code || !/^\d{5}$/.test(form.postal_Code))
      e.postal_Code = "우편번호는 5자리 숫자입니다.";
    if (!form.address) e.address = "기본 주소를 입력하세요.";
    if (!form.address_Detail) e.address_Detail = "상세 주소를 입력하세요.";

    setErrors(e);
    return Object.keys(e).length === 0;
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
            value={form.login_Id || ""}
            onChange={(e) => onChange({ ...form, login_Id: e.target.value })}
            placeholder="예) product1234"
            error={errors.login_Id}
          />
          {errors.login_Id && (
            <p className="text-xs text-rose-600 mt-1">{errors.login_Id}</p>
          )}
        </div>

        {/* 비밀번호 입력란 */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Input
              label="비밀번호(영문,숫자,특수문자 6~15자)"
              required
              type="password"
              value={form.password || ""}
              onChange={(e) => onChange({ ...form, password: e.target.value })}
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
              value={form.confirmPassword || ""}
              onChange={(e) =>
                onChange({ ...form, confirmPassword: e.target.value })
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
              value={form.name || ""}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
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
              value={form.email || ""}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
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
            id="marketingEmail"
            type="checkbox"
            className="h-4 w-4 rounded accent-emerald-500 focus:ring-emerald-300"
            checked={!!form.marketingEmail}
            onChange={(e) =>
              onChange({ ...form, marketingEmail: e.target.checked })
            }
          />
          <label htmlFor="marketingEmail" className="text-sm">
            이메일 수신 동의 (선택)
          </label>
        </div>

        {/* 휴대전화 / 생년월일   입력란  */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Input
              label="휴대전화 입력 (숫자만)"
              required
              value={form.phone_Number || ""}
              onChange={(e) =>
                onChange({
                  ...form,
                  phone_Number: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="01012345678"
              error={errors.phone_Number}
            />
            {errors.phone_Number && (
              <p className="text-xs text-rose-600 mt-1">
                {errors.phone_Number}
              </p>
            )}

            {/* SMS 수신 동의: 이메일 동의와 동일한 스타일로 정렬 */}
            <div className="flex items-center gap-3 mt-2">
              <input
                id="marketingSms"
                type="checkbox"
                className="h-4 w-4 rounded accent-emerald-500 focus:ring-emerald-300"
                checked={!!form.marketingSms}
                onChange={(e) =>
                  onChange({ ...form, marketingSms: e.target.checked })
                }
              />
              <label htmlFor="marketingSms" className="text-sm">
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
                value={form.birthY || ""}
                onChange={(e) =>
                  onChange({
                    ...form,
                    birthY: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />

              <input
                placeholder="MM"
                maxLength={2}
                value={form.birthM || ""}
                onChange={(e) =>
                  onChange({
                    ...form,
                    birthM: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />

              <input
                placeholder="DD"
                maxLength={2}
                value={form.birthD || ""}
                onChange={(e) =>
                  onChange({
                    ...form,
                    birthD: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="h-11 px-3 rounded-md border focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>
          </div>
        </div>

        {/* 우편번호 및 주소 찾기  입력란 */}
        <div className="grid gap-2">
          <span className="text-sm font-medium">
            우편번호 <b className="text-rose-600">*</b>
          </span>
          <div className="flex gap-3 items-start">
            <input
              maxLength={5}
              value={form.postal_Code || ""}
              onChange={(e) =>
                onChange({
                  ...form,
                  postal_Code: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="01234"
              className={`h-11 px-3 rounded-md border outline-none focus:ring-2 focus:ring-emerald-600 text-sm w-32 transition ${
                errors.postal_Code ? "border-rose-600" : "border-zinc-300"
              }`}
              type="text"
            />
            <button
              type="button"
              onClick={() => alert("주소 검색 API는 아직 구현되지 않았습니다.")}
              className="px-4 h-11 rounded-md bg-zinc-100 text-zinc-700 text-sm font-semibold hover:bg-zinc-200 transition"
            >
              주소 찾기
            </button>
          </div>
          {errors.postal_Code && (
            <p className="text-xs text-rose-600 mt-1">{errors.postal_Code}</p>
          )}
        </div>

        {/* 기본 주소  입력란  */}
        <div>
          <Input
            label="기본 주소"
            required
            value={form.address || ""}
            onChange={(e) => onChange({ ...form, address: e.target.value })}
            placeholder="기본 주소 (예: 서울특별시 강남구 테헤란로)"
            error={errors.address}
            // readOnly 나중에 API 연결할때 그때 사용하는걸로
          />
          {errors.address && (
            <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
          )}
        </div>

        {/* 상세 주소  입력란  */}
        <div>
          <Input
            label="상세 주소"
            required
            value={form.address_Detail || ""}
            onChange={(e) =>
              onChange({ ...form, address_Detail: e.target.value })
            }
            placeholder="상세 주소 (예: 101동 101호)"
            error={errors.address_Detail}
          />
          {errors.address_Detail && (
            <p className="text-xs text-rose-600 mt-1">
              {errors.address_Detail}
            </p>
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
