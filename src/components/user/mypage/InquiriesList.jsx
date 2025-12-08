import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InquiryReadCard from "../inquiry/InquiryReadCard";
import InquiryEditCard from "../inquiry/InquiryEditCard";
import {
  inquiryDeleteApi,
  inquiryModifyApi,
  inquiryReadApi,
} from "../../../api/user/inquiryApi";

const InquiriesList = () => {
  const { user } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const [inquiryList, setInquiryList] = useState([]); // 서버에서 받아온 문의 목록List => 배열
  const [isLoading, setIsLoading] = useState(false); // 로딩 중인지 여부 State (true/false)
  const [errorMessage, setErrorMessage] = useState(null); // 에러 발생 시 사용자에게 보여줄 메시지 State
  const [openedInquiryId, setOpenedInquiryId] = useState(null); // 현재 펼쳐진(토글된) 문의의 ID (숫자 or null)
  const [editingInquiryId, setEditingInquiryId] = useState(null); // 현재 수정 중인 문의의 ID (숫자 or null)

  // 수정 폼에 입력된 데이터를 저장하는 객체
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    inquiryType: "",
    emailAgreement: false,
    smsAgreement: false,
  });

  // 문의 목록 조회
  const loadInquiryList = async () => {
    // user가 없거나 loginId가 없으면 실행 X
    if (!user?.loginId) {
      return;
    }

    try {
      setIsLoading(true); // 로딩 State true 화면에 "로딩중..." 표시하기 위해
      setErrorMessage(null); // 에러 메시지 초기화

      // 사용자의 로그인 아이디로 문의 목록 조회
      const response = await inquiryReadApi(user.loginId);

      setInquiryList(response.inquiries || []); // 서버 응답 문의 목록 List 없으면 빈배열
    } catch (error) {
      console.error("문의 목록 조회 실패:", error);
      setErrorMessage("문의 목록을 불러오는데 실패했습니다");
    } finally {
      // 마지막에 한번 무조건 실행
      setIsLoading(false); // 로딩 종료
    }
  };

  // 문의 삭제
  // prettier-ignore
  const handleDelete = async (inquiry) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?"); // 확인 창 (확인=true, 취소=false)
    if (!isConfirmed) { // 사용자가 취소를 누르면 종료
      return;
    }
    // 사용자가 확인을 눌렀으면 삭제 로직 진행
    try {
      const response = await inquiryDeleteApi(inquiry.id, user.loginId); // 삭제 할 글 id, 사용자아이디

      // prev(이전 알고있는거), filter: 조건에 맞는 것만 새배열로 반환
      // item.id !== inquiry.id: 삭제한 문의의 ID가 아닌 것만
      setInquiryList((prev) => prev.filter((item) => item.id !== inquiry.id));

      // 만약 삭제한 문의가 수정 중이었다면 수정 모드 해제
      setEditingInquiryId(null);
      alert(response);
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 수정 버튼을 눌렀을 때 수정
  const handleStartEdit = (inquiry) => {
    // 수정중인 문의글
    setEditingInquiryId(inquiry.id);

    // 수정 입력한 데이터로 초기화
    setEditFormData({
      title: inquiry.title,
      content: inquiry.content,
      inquiryType: inquiry.inquiryType,
      emailAgreement: inquiry.emailAgreement,
      smsAgreement: inquiry.smsAgreement,
    });

    // 문의 내용도 펼쳐진 상태로 만들기
    setOpenedInquiryId(inquiry.id);
  };

  // 취소 버튼을 눌렀을 때
  const handleCancelEdit = () => {
    // 수정 중인 문의 ID 초기화 (수정 종료)
    setEditingInquiryId(null);

    // 수정 폼 데이터 초기화
    setEditFormData({
      title: "",
      content: "",
      inquiryType: "",
      emailAgreement: false,
      smsAgreement: false,
    });
  };

  // 저장 버튼을 눌렀을 때
  const handleSaveEdit = async (inquiryId) => {
    try {
      const response = await inquiryModifyApi(
        inquiryId, // 수정할 문의의 ID
        editFormData, // 수정된 데이터
        user.loginId // 사용자 로그인아이디
      );

      // 화면의 문의 목록 업데이트
      setInquiryList((prev) =>
        prev.map(
          (inquiry) =>
            // 수정한 문의의 ID와 같으면
            inquiry.id === inquiryId
              ? {
                  // 기존 문의 데이터에 수정된 데이터를 덮기
                  ...inquiry, // 기존 데이터 유지
                  ...editFormData, // 수정된 데이터로 덮기
                  inquiryTypeName: response.inquiryTypeName, // 백엔드에서 받은 문의 유형 이름
                }
              : inquiry // 수정하지 않은 문의는 그대로 유지
        )
      );

      // 수정 모드 종료
      setEditingInquiryId(null);

      // 수정 폼 초기화
      setEditFormData({
        title: "",
        content: "",
        inquiryType: "",
        emailAgreement: false,
        smsAgreement: false,
      });

      alert("수정되었습니다.");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  // 수정 폼의 input, textarea, select, checkbox 값이 변경될 때
  const handleFormChange = (e) => {
    // e.target에서 필요한 정보 추출
    const { name, value, type, checked } = e.target;

    // 이전 폼 데이터를 유지하면서 변경된 필드만 업데이트
    setEditFormData((prev) => ({
      ...prev, // 이전 데이터 그대로 복사
      // checkbox면 checked 값, 아니면 value 값 사용
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 토글 기능
  const handleToggle = (inquiryId) => {
    // 이미 펼쳐진 문의를 다시 클릭하면 null로 변경, 즉 닫힘
    // 다른 문의를 클릭하면 해당 ID로 변경 즉, 펼쳐짐
    setOpenedInquiryId(openedInquiryId === inquiryId ? null : inquiryId);
  };

  const newInquiry = () => {
    navigate("/helpcenter/inquiry");
  };

  useEffect(() => {
    // user의 loginId가 있으면 문의 목록 조회
    if (user?.loginId) {
      loadInquiryList();
    }
  }, [user?.loginId]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (errorMessage) {
    return <div>에러: {errorMessage}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">1:1 문의</h1>
            <p className="text-slate-600">
              궁금하신 점을 남겨주시면 빠르게 답변드리겠습니다.
            </p>
          </div>
          <button
            onClick={newInquiry}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            새 문의 작성
          </button>
        </div>

        {/* ============ 문의 목록이 없을 때 ============ */}
        {inquiryList.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              작성한 문의가 없습니다
            </h3>
            <p className="text-slate-500 mb-6">
              궁금하신 점이 있으시면 언제든 문의해주세요
            </p>
            <button
              onClick={newInquiry}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all"
            >
              첫 문의 작성하기
            </button>
          </div>
        ) : (
          /* ============ 문의 목록이 있을 때 ============ */
          <div className="space-y-4">
            {inquiryList.map((inquiry) =>
              // 현재 수정 중인 문의인가?
              editingInquiryId === inquiry.id ? (
                <InquiryEditCard
                  key={inquiry.id}
                  inquiry={inquiry} // 문의 데이터 => ★객체 자체를 전달 inquiry.title 형식으로 자식컴포넌트에서 바로 사용가능
                  formData={editFormData} // 수정 폼 데이터
                  onFormChange={handleFormChange} // 입력 변경 핸들러 인자가 필요 없을 때 고정된 동작만 수행, 아래처럼 인자가필요할땐 람다식으로 함수를 전달해야함
                  onSave={() => handleSaveEdit(inquiry.id)} // 저장 핸들러
                  onCancel={handleCancelEdit} // 취소 핸들러
                />
              ) : (
                /* 조회 */
                <InquiryReadCard
                  key={inquiry.id}
                  inquiry={inquiry} // 문의글
                  isOpened={openedInquiryId === inquiry.id} // boolean 값을 전달 openedInquiryId = 3, inquiry.id = 3 → isOpened = true 값 전달 즉,자식 컴포넌트에서 펼쳐진 상태인지 판단하기 위해
                  onToggle={() => handleToggle(inquiry.id)} // 펼치기/접기 핸들러 실행X, 함수 자체를 전달
                  onStartEdit={() => handleStartEdit(inquiry)} // 수정 시작 핸들러
                  onDelete={() => handleDelete(inquiry)} // 삭제 핸들러
                />
              )
            )}
          </div>
        )}

        {/* ============ 페이지네이션 문의 있을 때만 표시 ============ */}
        {inquiryList.length > 0 && (
          <div className="flex justify-center mt-10 gap-2">
            {/* 이전 페이지 버튼 */}
            <button className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center">
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg bg-slate-900 text-white font-semibold shadow-lg">
              1
            </button>
            <button className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-all">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-all">
              3
            </button>
            <button className="w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-all flex items-center justify-center">
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiriesList;
