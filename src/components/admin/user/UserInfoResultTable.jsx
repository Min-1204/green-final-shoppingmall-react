import { useState } from "react";

const UserInfoResultTable = ({ users, onSort }) => {
  const [sort, setSort] = useState("recent");

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

  const gradeOptions = ["일반", "매니저", "관리자"];

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    onSort(value);
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center mb-3 text-gray-700 flex-wrap gap-2 px-2">
        <span className="font-semibold text-lg">
          검색 결과 (총 {users.length} 명)
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md border border-blue-200 cursor-pointer transition shadow-sm">
            이메일 발송
          </button>
          <button className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm">
            SMS 발송
          </button>

          <select
            value={sort}
            onChange={sortHandler}
            className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md cursor-pointer bg-white shadow-sm hover:bg-gray-50 transition"
          >
            <option value="recent">최근가입순</option>
            <option value="old">오래된가입순</option>
          </select>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full table-fixed border-collapse text-sm text-center">
          {/* 컬럼 폭 고정 */}
          <colgroup>
            <col style={{ width: "20px" }} />
            <col style={{ width: "20px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "70px" }} />
            <col style={{ width: "70px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "50px" }} />
          </colgroup>

          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700 font-semibold divide-x divide-gray-300">
              {headers.map((header) => (
                <th key={header} className="px-2 py-3 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="py-10 text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="h-[55px] hover:bg-gray-50 transition divide-x divide-gray-200"
                >
                  {/* 선택 */}
                  <td>
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                    />
                  </td>

                  {/* 번호 */}
                  <td>{user.id}</td>

                  {/* 아이디 */}
                  <td className="truncate text-blue-600 cursor-pointer hover:underline">
                    {user.loginId}
                  </td>

                  {/* 이메일 */}
                  <td>{user.email}</td>

                  {/* 핸드폰 */}
                  <td>{user.phoneNumber}</td>

                  {/* 권한 */}
                  <td>
                    <select
                      defaultValue={user.userRole}
                      className="border border-gray-300 text-sm text-gray-700 outline-none rounded-md w-[70px]"
                    >
                      {gradeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* 등급 */}
                  <td>{user.userGrade}</td>

                  {/* 가입일 */}
                  <td>{user.createdAt?.substring(0, 10)}</td>

                  {/* 회원 상태 */}
                  <td>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.deleted === false
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.deleted === false ? "정상" : "탈퇴"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfoResultTable;
