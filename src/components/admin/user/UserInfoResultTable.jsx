import React from "react";

const UserInfoResultTable = () => {
  const headers = [
    "선택",
    "번호",
    "아이디",
    "이메일",
    "핸드폰",
    "권한",
    "등급",
    "가입일",
    "회원 상태",
  ];

  const dummyData = [
    {
      id: 1,
      username: "user1",
      email: "user1@test.com",
      phone: "010-0000-0001",
      grade: "일반",
      joinDate: "2025-10-30",
      status: "정상",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@test.com",
      phone: "010-0000-0002",
      grade: "일반",
      joinDate: "2025-10-29",
      status: "정상",
    },
    {
      id: 3,
      username: "user3",
      email: "user3@test.com",
      phone: "010-0000-0003",
      grade: "일반",
      joinDate: "2025-10-28",
      status: "탈퇴",
    },
  ];

  const gradeOptions = ["일반", "매니저", "관리자"];
  const levelLabels = ["BRONZE", "SILVER", "GOLD", "DIAMOND", "VIP"];

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center mb-3 text-gray-700 flex-wrap gap-2 px-2">
        <span className="font-semibold text-lg">
          검색 결과 (총 {dummyData.length} 명)
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md border border-blue-200 cursor-pointer transition shadow-sm">
            이메일 발송
          </button>
          <button className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm">
            SMS 발송
          </button>
          {/* <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-300 transition shadow-sm">
            다운로드
          </button> */}

          <select
            defaultValue="recent"
            className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md cursor-pointer bg-white shadow-sm hover:bg-gray-50 transition"
          >
            <option value="recent">최근 가입 순</option>
            <option value="old">오래된 가입 순</option>
          </select>
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full border-collapse text-sm text-center">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700 font-semibold text-sm divide-x divide-gray-300">
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-3 py-3 whitespace-nowrap ${
                    header === "선택"
                      ? "w-[50px]"
                      : header === "번호"
                      ? "w-[50px]"
                      : header === "권한"
                      ? "w-[100px]"
                      : header === "등급"
                      ? "w-[100px]"
                      : header === "가입일"
                      ? "w-[130px]"
                      : header === "관리"
                      ? "w-[130px]"
                      : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((user, idx) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition divide-x divide-gray-200"
              >
                <td className="px-2 py-3 w-[50px]">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                </td>
                <td className="px-3 py-3 w-[50px]">{user.id}</td>
                <td className="px-3 py-3 text-blue-600 cursor-pointer hover:underline">
                  {user.username}
                </td>
                <td className="px-3 py-3">{user.email}</td>
                <td className="px-3 py-3">{user.phone}</td>

                {/* 권한 */}
                <td className="px-2 py-3 w-[90px]">
                  <select
                    defaultValue={user.grade}
                    className="border border-gray-300 px-1 py-[2px] text-sm text-gray-700 outline-none rounded-md w-full"
                  >
                    {gradeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>

                {/* 등급 */}
                <td className="px-3 py-3 w-[80px] text-sm font-medium text-gray-800">
                  {levelLabels[idx % levelLabels.length]}
                </td>

                {/* 가입일 */}
                <td className="px-3 py-3 w-[100px]">{user.joinDate}</td>

                {/* 관리 */}
                <td className="px-3 py-3 w-[100px]">
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "정상"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfoResultTable;
