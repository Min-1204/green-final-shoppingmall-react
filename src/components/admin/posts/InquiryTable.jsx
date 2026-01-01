import React from "react";

export default function InquiryTable({
  inquiries,
  loading,
  onOpenModal,
  onDelete,
  INQUIRY_TYPES
}) {
  console.log(inquiries);
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-20">
                번호
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-32">
                유형
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                문의내용
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-32">
                알림 동의
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-28">
                작성자
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase w-52">
                일자 정보
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-24">
                상태
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-40">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  데이터를 불러오는 중입니다...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  조회된 문의 내역이 없습니다.
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* 번호 */}
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {inquiry.id}
                  </td>

                  {/* 유형 */}
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[11px] font-bold border border-indigo-100 whitespace-nowrap">
                      {INQUIRY_TYPES[inquiry.inquiryType]}
                    </span>
                  </td>

                  {/* 문의내용 */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col max-w-xs md:max-w-md">
                      <span className="text-sm font-semibold text-gray-800 truncate">
                        {inquiry.title}
                      </span>
                      <span className="text-xs text-gray-500 truncate mt-0.5">
                        {inquiry.content}
                      </span>
                    </div>
                  </td>

                  {/* 알림 동의 - whitespace-nowrap 추가 */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`text-[10px] font-bold whitespace-nowrap ${
                          inquiry.emailAgreement
                            ? "text-blue-600"
                            : "text-gray-300"
                        }`}
                      >
                        이메일 {inquiry.emailAgreement ? "O" : "X"}
                      </span>
                      <span
                        className={`text-[10px] font-bold whitespace-nowrap ${
                          inquiry.smsAgreement
                            ? "text-green-600"
                            : "text-gray-300"
                        }`}
                      >
                        SMS {inquiry.smsAgreement ? "O" : "X"}
                      </span>
                    </div>
                  </td>

                  {/* 작성자 - whitespace-nowrap 추가 */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-gray-700 whitespace-nowrap">
                        {inquiry.userName}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {inquiry.loginId}
                      </span>
                    </div>
                  </td>

                  {/* 일자 정보 - whitespace-nowrap 추가 및 날짜 포맷 변경 */}
                  <td className="px-4 py-4 text-[11px]">
                    <p className="text-gray-600 whitespace-nowrap mb-1">
                      작성:{" "}
                      {new Date(inquiry.createdAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                    <p
                      className={`whitespace-nowrap ${
                        inquiry.answerCreatedAt
                          ? "text-blue-600"
                          : "text-gray-300"
                      }`}
                    >
                      답변:{" "}
                      {inquiry.answerCreatedAt
                        ? new Date(inquiry.answerCreatedAt).toLocaleString(
                            "ko-KR",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit"
                            }
                          )
                        : "미등록"}
                    </p>
                  </td>

                  {/* 상태 */}
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap ${
                        inquiry.answered
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      {inquiry.answered ? "답변완료" : "미완료"}
                    </span>
                  </td>

                  {/* 관리 - 버튼 디자인 변경 */}
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onOpenModal(inquiry)}
                        className="px-3 py-1.5 text-xs font-bold bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors cursor-pointer"
                      >
                        {inquiry.answered ? "답변수정" : "답변등록"}
                      </button>
                      <button
                        onClick={() => onDelete(inquiry.id)}
                        className="px-3 py-1.5 text-xs font-bold bg-gray-400 text-white rounded-md hover:bg-red-500 transition-colors cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
