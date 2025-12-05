import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inquiryAddApi } from "../../../api/user/inquiryApi";

export default function HelpInquiryForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const { user } = useSelector((state) => state.authSlice);

  // ✅ 폼 데이터 상태 관리 (테이블 구조에 맞춤)
  const [inquiryForm, setInquiryForm] = useState({
    loginId: user?.loginId || "",
    title: "", // 제목
    inquiryType: "",
    content: "", // 내용
    emailAgreement: user?.emailAgreement || false, // 이메일 알림 동의
    smsAgreement: user?.smsAgreement || false, // SMS 알림 동의
  });

  console.log("1:1문의 입력 Form :", inquiryForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInquiryForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inquiryForm.inquiryType) {
      alert("문의 유형을 선택해주세요.");
      return;
    }

    if (!inquiryForm.title) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!inquiryForm.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const response = await inquiryAddApi(inquiryForm);
      console.log("1:1 문의 Form 제출 응답 : ", response);
      if (response.success) {
        alert(response.message);
        setSubmitted(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  // ✅ 등록 완료 화면
  if (submitted) {
    return (
      <div className="w-full bg-white border border-green-100 rounded-md shadow-sm px-6 py-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-green-700 mb-1">
              작성이 완료되었습니다.
            </h2>
            <p className="text-sm text-green-600">
              고객센터 운영시간에 순차적으로 답변드릴게요.
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
            1:1 문의 등록됨
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/helpcenter")}
            className="px-6 py-2 rounded bg-slate-900 text-white text-sm hover:bg-slate-800"
          >
            고객센터 홈으로
          </button>
          <button
            onClick={() => navigate("/mypage/inquiries")}
            className="px-6 py-2 rounded border border-slate-300 text-sm hover:bg-slate-50"
          >
            1:1 문의내역으로 이동
          </button>
        </div>
      </div>
    );
  }

  // 기본 작성 화면
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {/* 상단 안내 바 */}
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-900 font-medium">
            문의 내용을 남겨주시면 고객센터 운영시간에 순차적으로
            답변드리겠습니다.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            평일 10:00~17:00 (점심 12:00~14:00) / 주말·공휴일 휴무
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          고객센터 ONLINE
        </span>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-1">
            1:1 문의하기
          </h2>
          <p className="text-xs text-slate-400">
            * 표시된 항목은 필수 입력입니다.
          </p>
        </div>

        {/* 작성자 정보 */}
        <div className="bg-blue-50 border border-blue-100 rounded-sm px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-1">작성자</p>
              <p className="text-sm font-medium text-slate-900">
                {user?.name || "사용자"}
              </p>
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              로그인 계정
            </div>
          </div>
        </div>

        {/* 문의유형 */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            문의유형 <span className="text-red-500">*</span>
          </label>
          <select
            name="inquiryType"
            value={inquiryForm.inquiryType}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          >
            <option value="" disabled>
              선택해 주세요.
            </option>
            <option value="DELIVERY">배송문의</option>
            <option value="ORDER">주문/결제</option>
            <option value="RETURN">반품/교환/취소</option>
            <option value="MEMBER_INFO">회원정보</option>
            <option value="MEMBER_POINT">적립금/쿠폰</option>
            <option value="ETC">기타문의</option>
          </select>
        </div>

        {/* 제목 */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={inquiryForm.title}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
            placeholder="문의 제목을 입력해주세요"
            maxLength={100}
            required
          />
        </div>

        {/* 내용 */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            value={inquiryForm.content}
            onChange={handleChange}
            rows={7}
            className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
            placeholder="문의하실 내용을 자세히 작성해 주세요."
            required
          />
          <p className="text-xs text-slate-400">
            개인정보(주민등록번호, 카드번호 등)는 작성하지 말아주세요.
          </p>
        </div>

        {/* 알림 영역 */}
        <div className="pt-3 border border-slate-100 rounded-md bg-slate-50 px-4 py-4 space-y-3">
          <p className="text-sm font-medium text-slate-800">답변 알림 받기</p>
          <p className="text-xs text-slate-500">
            등록해 주신 문의에 대한 답변이 등록되면 알림을 보내드립니다.
          </p>

          <div className="space-y-2 mt-3">
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="smsAgreement" // ✅ 백엔드와 맞춤
                checked={inquiryForm.smsAgreement}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              SMS로 알림 받기
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="emailAgreement" // ✅ 백엔드와 맞춤
                checked={inquiryForm.emailAgreement}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              E-mail로 알림 받기
            </label>
          </div>

          {!inquiryForm.smsAgreement && !inquiryForm.emailAgreement && (
            <p className="text-xs text-amber-600 mt-2">
              ⚠️ 알림을 받지 않으시면 답변 등록 시 알려드릴 수 없습니다.
            </p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="pt-1 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/mypage/inquiries")}
            className="px-6 py-2 rounded-sm border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
            disabled={submitted}
          >
            목록으로
          </button>
          <button
            type="submit"
            disabled={submitted}
            className="px-6 py-2 rounded-sm bg-slate-900 text-white text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? "등록 중..." : "문의 등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
