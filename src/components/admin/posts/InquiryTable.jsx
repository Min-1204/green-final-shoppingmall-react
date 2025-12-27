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
        <table className="w-full min-w-[1200px] table-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase w-16">
                번호
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase w-28">
                유형
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                문의내용
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase w-36">
                알림 동의
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase w-32">
                작성자
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase w-48">
                일자 정보
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase w-28">
                상태
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase w-32">
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {inquiry.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[11px] font-bold border border-indigo-100 whitespace-nowrap min-w-[70px]">
                      {INQUIRY_TYPES[inquiry.inquiryType]}
                    </span>
                  </td>
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
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`text-[10px] font-bold ${
                          inquiry.emailAgreement
                            ? "text-blue-600"
                            : "text-gray-300"
                        }`}
                      >
                        이메일 {inquiry.emailAgreement ? "O" : "X"}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          inquiry.smsAgreement
                            ? "text-green-600"
                            : "text-gray-300"
                        }`}
                      >
                        SMS {inquiry.smsAgreement ? "O" : "X"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold text-gray-700">
                        {inquiry.userName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {inquiry.loginId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px]">
                    <p className="text-gray-600">
                      작성: {new Date(inquiry.createdAt).toLocaleString()}
                    </p>
                    <p
                      className={
                        inquiry.answerCreatedAt
                          ? "text-blue-600"
                          : "text-gray-300"
                      }
                    >
                      답변:{" "}
                      {inquiry.answerCreatedAt
                        ? new Date(inquiry.answerCreatedAt).toLocaleString()
                        : "미등록"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block w-[65px] py-1 rounded-full text-[11px] font-bold border whitespace-nowrap text-center ${
                        inquiry.answered
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      {inquiry.answered ? "답변완료" : "미완료"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onOpenModal(inquiry)}
                        className="text-sm font-bold text-indigo-600 hover:underline"
                      >
                        {inquiry.answered ? "수정" : "답변"}
                      </button>
                      <button
                        onClick={() => onDelete(inquiry.id)}
                        className="text-sm font-medium text-gray-400 hover:text-red-500"
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
