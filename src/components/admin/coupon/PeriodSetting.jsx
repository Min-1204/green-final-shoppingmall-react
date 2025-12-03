import React from "react";

export default function PeriodSetting({ periodSetting, onChangeForm }) {
  const hasLimitUsagePeriodHandler = (e) => {
    const { name, value } = e.target;
    const bool = value === "true";
    onChangeForm({
      ...periodSetting,
      [name]: bool,
      validFrom: "",
      validTo: "",
    });
  };

  const periodHandler = (e) => {
    const { name, value } = e.target;
    onChangeForm({ ...periodSetting, [name]: value });
  };

  const getDateRange = (startStr, endStr, period) => {
    const startDate = new Date();
    const today = startDate.toLocaleDateString("sv-SE");
    let endDate = new Date(today);

    switch (period) {
      case "1주":
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "1개월":
        endDate.setMonth(startDate.getMonth() + 1);
        if (startDate.getDate() !== endDate.getDate()) {
          endDate.setDate(0);
        }
        break;
      case "3개월":
        endDate.setMonth(startDate.getMonth() + 3);
        if (startDate.getDate() !== endDate.getDate()) {
          endDate.setDate(0);
        }
        break;
      default:
        return;
    }

    const endday = endDate.toLocaleDateString("sv-SE");
    onChangeForm({
      ...periodSetting,
      [startStr]: today,
      [endStr]: endday,
    });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">기간 설정</h2>
      </div>

      <div>
        <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
          {/* 사용 기간 */}
          <div className="flex border-b border-gray-300 items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              사용 기간
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="hasLimitUsagePeriod"
                  value="true"
                  onChange={hasLimitUsagePeriodHandler}
                  checked={periodSetting.hasLimitUsagePeriod}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>사용기간 제한</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="hasLimitUsagePeriod"
                  value="false"
                  onChange={hasLimitUsagePeriodHandler}
                  checked={!periodSetting.hasLimitUsagePeriod}
                  className="mr-2 accent-blue-600 cursor-pointer"
                />
                <span>제한 없음</span>
              </label>
            </div>
          </div>

          {/* 사용 기간 설정 */}
          {periodSetting.hasLimitUsagePeriod && (
            <div className="flex border-b border-gray-300 items-stretch">
              <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
                사용 기간 설정
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center flex-grow p-2 gap-2">
                <input
                  type="date"
                  name="validFrom"
                  value={periodSetting.validFrom}
                  onChange={periodHandler}
                  className="border border-gray-300 p-1 rounded-md"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  name="validTo"
                  value={periodSetting.validTo}
                  onChange={periodHandler}
                  className="border border-gray-300 p-1 rounded-md"
                />
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => getDateRange("validFrom", "validTo", "1주")}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                  >
                    1주
                  </button>
                  <button
                    onClick={() =>
                      getDateRange("validFrom", "validTo", "1개월")
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                  >
                    1개월
                  </button>
                  <button
                    onClick={() =>
                      getDateRange("validFrom", "validTo", "3개월")
                    }
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                  >
                    3개월
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 발급 기간 */}
          <div className="flex items-stretch">
            <div className="w-40 bg-gray-50 border-r border-gray-300 text-gray-700 font-semibold flex items-center justify-center p-2">
              발급 기간
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex items-center flex-grow p-2 gap-2">
              <input
                type="date"
                name="issuableStartDate"
                value={periodSetting.issuableStartDate}
                onChange={periodHandler}
                className="border border-gray-300 p-1 rounded-md"
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                name="issuableEndDate"
                value={periodSetting.issuableEndDate}
                onChange={periodHandler}
                className="border border-gray-300 p-1 rounded-md"
              />
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() =>
                    getDateRange("issuableStartDate", "issuableEndDate", "1주")
                  }
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                >
                  1주
                </button>
                <button
                  onClick={() =>
                    getDateRange(
                      "issuableStartDate",
                      "issuableEndDate",
                      "1개월"
                    )
                  }
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                >
                  1개월
                </button>
                <button
                  onClick={() =>
                    getDateRange(
                      "issuableStartDate",
                      "issuableEndDate",
                      "3개월"
                    )
                  }
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-sm transition"
                >
                  3개월
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
