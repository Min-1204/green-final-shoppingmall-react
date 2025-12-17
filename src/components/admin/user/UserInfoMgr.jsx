import React, { useState } from "react";
import UserInfoResultTable from "./UserInfoResultTable";
import CheckboxGroup from "../CheckboxGroup";
import dayjs from "dayjs";

const UserInfoMgr = () => {
  // const signupOptions = ["쇼핑몰", "네이버", "카카오", "구글", "전체"];
  const memberGradeOptions = ["BRONZE", "SILVER", "GOLD", "DIAMOND", "VIP"];
  const smsOptionList = ["동의", "거부", "전체"];
  const emailOptionList = ["동의", "거부", "전체"];
  const memberStatusOptions = ["정상", "탈퇴", "전체"];

  // const [signupMethods, setSignupMethods] = useState([]); //회원가입 방법 state
  const [memberGrades, setMemberGrades] = useState(memberGradeOptions); //회원 등급
  const [smsOptions, setSmsOptions] = useState(smsOptionList); //SMS 수신 state
  const [emailOptions, setEmailOptions] = useState(emailOptionList); //email 수신 state
  const [memberStatus, setMemberStatus] = useState(memberStatusOptions); //회원 상태 state

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateHandler = (label) => {
    let today = dayjs(); //오늘 기준
    let start;

    if (label === "오늘") {
      start = today;
    } else if (label === "1주일") {
      start = today.subtract(6, "day"); //오늘 포함 1주일
    } else if (label === "14일") {
      start = today.subtract(13, "day");
    } else if (label === "1개월") {
      start = today.subtract(1, "month");
    } else if (label === "3개월") {
      start = today.subtract(3, "month");
    } else if (label === "6개월") {
      start = today.subtract(6, "month");
    } else {
      start = today;
    }

    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(today.format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter'] min-h-screen">
      {/* 헤더 */}
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-4 mb-6 flex justify-between items-center px-2">
        회원 조회
        <div className="space-x-2 text-sm"></div>
      </h2>

      {/* 필터 전체 영역 */}
      <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
        {/* 검색어 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            검색어
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <select className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md">
              <option>이름</option>
              <option>아이디</option>
              <option>핸드폰(네자리)</option>
            </select>
            <input
              type="text"
              className="border border-gray-300 p-1 w-80 rounded-md"
              placeholder="검색어를 입력하세요"
            />
          </div>
        </div>

        {/* 날짜 */}
        <div className="flex border-b border-gray-300 items-stretch">
          <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
            날짜
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <span>가입일</span>
            <input
              type="date"
              value={startDate}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md h-[32px]"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              value={endDate}
              className="border border-gray-300 p-1 bg-white cursor-pointer rounded-md h-[32px]"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex gap-1 ml-3">
              {["오늘", "1주일", "14일", "1개월", "3개월", "6개월"].map(
                (label) => (
                  <button
                    key={label}
                    className="border border-gray-300 bg-white px-2 py-1 text-gray-700 text-xs cursor-pointer rounded-md hover:bg-blue-50 hover:border-blue-500 transition"
                    onClick={() => dateHandler(label)}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* 회원가입 방법 */}
        {/* <CheckboxGroup
          title="회원가입 방법"
          options={signupOptions}
          selectedOptions={signupMethods}
          setSelectedOptions={setSignupMethods}
        /> */}

        <CheckboxGroup
          title="등급"
          options={memberGradeOptions}
          selectedOptions={memberGrades}
          setSelectedOptions={setMemberGrades}
        />

        {/* SMS 수신 */}
        <CheckboxGroup
          title="SMS 수신"
          options={smsOptionList}
          selectedOptions={smsOptions}
          setSelectedOptions={setSmsOptions}
        />

        {/* 이메일 수신 */}
        <CheckboxGroup
          title="이메일 수신"
          options={emailOptionList}
          selectedOptions={emailOptions}
          setSelectedOptions={setEmailOptions}
        />

        {/* 회원 상태 */}
        <CheckboxGroup
          title="회원 상태"
          options={memberStatusOptions}
          selectedOptions={memberStatus}
          setSelectedOptions={setMemberStatus}
        />
      </div>

      {/* 검색 버튼 */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-md shadow-md hover:bg-blue-700 transition font-semibold">
          검색
        </button>
        <button className="border border-gray-300 bg-white px-8 py-2 text-gray-700 cursor-pointer rounded-md shadow-md hover:bg-gray-100 transition font-semibold">
          초기화
        </button>
      </div>

      {/* 결과 테이블 */}
      <UserInfoResultTable />
    </div>
  );
};

export default UserInfoMgr;
