import React from "react";

export default function IssueSettingModify({ issueSetting, onChangeForm }) {
  const issueTypeHandler = (e) => {
    const { name, value } = e.target;
    let updatedData = {};

    if (value === "MANUAL") {
      updatedData = {
        ...issueSetting,
        autoIssueType: "NONE",
        autoIssueTrigger: "NONE",
        couponCode: "",
        [name]: value,
      };
    } else if (value === "AUTO") {
      updatedData = {
        ...issueSetting,
        autoIssueType: "NEWUSER",
        autoIssueTrigger: "LOGIN",
        couponCode: "",
        [name]: value,
      };
    } else if (value === "CODE") {
      updatedData = {
        ...issueSetting,
        autoIssueType: "NONE",
        autoIssueTrigger: "NONE",
        [name]: value,
      };
    }
    onChangeForm(updatedData);
  };

  const autoIssueTypeHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...issueSetting, [name]: value });
  };

  const autoIssueTriggerHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...issueSetting, [name]: value });
  };

  const couponCodeHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...issueSetting, [name]: value });
  };

  const totalQuantityHandler = (e) => {
    const { name, value } = e.target;
    if (Number(value) > 10000000000) {
      value = 10000000000;
    }
    onChangeForm({ ...issueSetting, [name]: value });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">발급 설정</h2>
      </div>
      <div>
        <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
          {/* 발급 방식 */}
          <div
            className={`flex ${
              issueSetting.issueType !== "MANUAL"
                ? "border-b border-gray-300"
                : ""
            } items-stretch`}
          >
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              발급 방식
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="issueType"
                  value="MANUAL"
                  checked={issueSetting.issueType === "MANUAL"}
                  onChange={issueTypeHandler}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>관리자 수동 발급</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="issueType"
                  value="AUTO"
                  checked={issueSetting.issueType === "AUTO"}
                  onChange={issueTypeHandler}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>특정 조건 자동 발급</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="issueType"
                  value="CODE"
                  checked={issueSetting.issueType === "CODE"}
                  onChange={issueTypeHandler}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>쿠폰 코드 입력</span>
              </label>
            </div>
          </div>

          {/* 자동 발급 유형 */}
          {issueSetting.issueType === "AUTO" && (
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-b border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                자동 발급 유형
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex border-b border-gray-300 items-center flex-grow p-2 gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoIssueType"
                    value="NEWUSER"
                    onChange={autoIssueTypeHandler}
                    checked={issueSetting?.autoIssueType === "NEWUSER"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>신규유저</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoIssueType"
                    value="BIRTHDAY"
                    onChange={autoIssueTypeHandler}
                    checked={issueSetting?.autoIssueType === "BIRTHDAY"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>생일</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoIssueType"
                    value="EVENT"
                    onChange={autoIssueTypeHandler}
                    checked={issueSetting?.autoIssueType === "EVENT"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>이벤트</span>
                </label>
              </div>
            </div>
          )}

          {/*자동 발급 트리거 */}
          {issueSetting.issueType === "AUTO" && (
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                자동 발급 트리거
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoIssueTrigger"
                    value="LOGIN"
                    onChange={autoIssueTriggerHandler}
                    checked={issueSetting?.autoIssueTrigger === "LOGIN"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>로그인</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="autoIssueTrigger"
                    value="ALL_USER"
                    onChange={autoIssueTriggerHandler}
                    checked={issueSetting?.autoIssueTrigger === "ALL_USER"}
                    className="mr-2 accent-blue-600 cursor-pointer"
                  />
                  <span>모든 유저</span>
                </label>
              </div>
            </div>
          )}

          {/* 쿠폰 코드 입력 */}
          {issueSetting.issueType === "CODE" && (
            <div className="flex items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                쿠폰 코드
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="text"
                  name="couponCode"
                  value={issueSetting.couponCode ? issueSetting.couponCode : ""}
                  onChange={couponCodeHandler}
                  className="border border-gray-300 p-1 w-full max-w-lg rounded-md"
                  placeholder="쿠폰 코드를 입력하세요"
                />
              </div>
            </div>
          )}

          {/* 최대발급 수량 */}
          {
            <div className="flex border-t border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                최대발급 수량
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="number"
                  name={"totalQuantity"}
                  value={issueSetting.totalQuantity}
                  onChange={totalQuantityHandler}
                  className="border border-gray-300 p-1 w-32 rounded-md text-right"
                />
                <span className="text-gray-700">개</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
