import React, { useState, useEffect } from "react";
import InquiryFilter from "../../../components/admin/posts/InquiryFilter";
import InquiryAnswerModal from "../../../components/admin/posts/InquiryAnswerModal";
import InquiryTable from "../../../components/admin/posts/InquiryTable"; // 새로 만든 테이블 컴포넌트

const INQUIRY_TYPES = {
  DELIVERY: "배송문의",
  ORDER: "주문/결제",
  RETURN: "반품/교환/취소",
  MEMBER_INFO: "회원정보",
  MEMBER_POINT: "적립금/쿠폰",
  ETC: "기타문의",
};

const ANSWER_STATUS = { ALL: "전체", PENDING: "미완료", ANSWERED: "답변완료" };

export default function InquiryManagementPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");
  const [selectedType, setSelectedType] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [answerContent, setAnswerContent] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus, selectedType, startDate, endDate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      // 실제 API 연동 시 주석 해제
      // const params = new URLSearchParams({ ... });
      // const response = await fetch(`/api/admin/inquiries?${params}`);
      // const data = await response.json();
      // setInquiries(data.inquiries || []);

      // 테스트용 더미 데이터
      setTimeout(() => {
        setInquiries([
          {
            id: 1,
            title: "배송 문의",
            inquiryType: "DELIVERY",
            content: "언제 오나요?",
            answered: false,
            user: { name: "홍길동", loginId: "user1" },
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            title: "환불 요청",
            inquiryType: "RETURN",
            content: "파손됨",
            answered: true,
            answerContent: "처리됨",
            answerCreatedAt: new Date().toISOString(),
            user: { name: "김철수", loginId: "user2" },
            createdAt: new Date().toISOString(),
          },
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchStatus =
      selectedStatus === "ALL" ||
      (selectedStatus === "PENDING" && !inq.answered) ||
      (selectedStatus === "ANSWERED" && inq.answered);
    const matchType =
      selectedType === "전체" ||
      INQUIRY_TYPES[inq.inquiryType] === selectedType;
    const matchKeyword =
      searchKeyword.trim() === "" ||
      inq.title.includes(searchKeyword) ||
      inq.content.includes(searchKeyword) ||
      inq.user.name.includes(searchKeyword);
    return matchStatus && matchType && matchKeyword;
  });

  const handleDelete = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">1:1 문의 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          전체 검색 결과:{" "}
          <span className="font-semibold text-blue-600">
            {filteredInquiries.length}
          </span>{" "}
          건
        </p>
      </div>

      <InquiryFilter
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        ANSWER_STATUS={ANSWER_STATUS}
        INQUIRY_TYPES={INQUIRY_TYPES}
        onResetDate={() => {
          setStartDate("");
          setEndDate("");
        }}
      />

      <InquiryTable
        inquiries={filteredInquiries}
        loading={loading}
        onOpenModal={(inq) => {
          setSelectedInquiry(inq);
          setAnswerContent(inq.answerContent || "");
          setAnswerModalOpen(true);
        }}
        onDelete={handleDelete}
        INQUIRY_TYPES={INQUIRY_TYPES}
      />

      <InquiryAnswerModal
        isOpen={answerModalOpen}
        onClose={() => setAnswerModalOpen(false)}
        inquiry={selectedInquiry}
        answerContent={answerContent}
        setAnswerContent={setAnswerContent}
        onSave={() => {
          alert("답변이 저장되었습니다.");
          setAnswerModalOpen(false);
          fetchInquiries();
        }}
      />
    </div>
  );
}
