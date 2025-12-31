// src/pages/admin/posts/FaqManagementPage.jsx
import React, { useState, useEffect } from "react";
import FaqRow from "../../../components/admin/posts/FaqRow";
import FaqEditForm from "../../../components/admin/posts/FaqEditForm";
import FaqAddForm from "../../../components/admin/posts/FaqAddForm";
import {
  faqAddApi,
  faqDeleteApi,
  faqListApi,
  faqModifyApi,
} from "../../../api/admin/posts/faqApi";

const INQUIRY_TYPE_OPTIONS = [
  { value: "DELIVERY", label: "배송문의" },
  { value: "ORDER", label: "주문/결제" },
  { value: "RETURN", label: "반품/교환/취소" },
  { value: "MEMBER_INFO", label: "회원정보" },
  { value: "MEMBER_POINT", label: "적립금/쿠폰" },
  { value: "ETC", label: "기타문의" },
];

const getInquiryTypeLabel = (value) => {
  const found = INQUIRY_TYPE_OPTIONS.find((option) => option.value === value);
  return found ? found.label : value;
};

export default function FaqManagementPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    inquiryType: "DELIVERY",
    title: "",
    answer: "",
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await faqListApi();
      setFaqs(data);
    } catch (error) {
      alert("FAQ 목록을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredFaqs = () => {
    return faqs.filter((faq) => {
      const categoryMatch =
        selectedCategory === "전체" ||
        getInquiryTypeLabel(faq.inquiryType) === selectedCategory;
      const keywordMatch =
        searchKeyword === "" ||
        faq.title.toLowerCase().includes(searchKeyword.toLowerCase());
      return categoryMatch && keywordMatch;
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ inquiryType: "DELIVERY", title: "", answer: "" });
  };

  const handleEditStart = (faq) => {
    setIsAdding(false);
    setEditingId(faq.id);
    setFormData({
      inquiryType: faq.inquiryType,
      title: faq.title,
      answer: faq.answer,
    });
  };

  const handleSave = async () => {
    // 입력값 검증
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!formData.answer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    try {
      if (editingId) {
        await faqModifyApi(editingId, formData);
        alert("수정 완료");
      } else {
        await faqAddApi(formData);
        alert("등록 완료");
      }

      setIsAdding(false);
      setEditingId(null);
      setFormData({ inquiryType: "DELIVERY", title: "", answer: "" });
      fetchFaqs();
    } catch (error) {
      alert("저장에 실패했습니다.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await faqDeleteApi(id);
      alert("삭제되었습니다.");
      fetchFaqs();
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ inquiryType: "DELIVERY", title: "", answer: "" });
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            자주묻는질문 관리
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            총 {filteredFaqs.length}건
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 cursor-pointer"
        >
          + FAQ 추가
        </button>
      </div>

      <div className="flex gap-6 border-b mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory("전체")}
          className={`pb-3 text-sm whitespace-nowrap cursor-pointer ${
            selectedCategory === "전체"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          전체
        </button>
        {INQUIRY_TYPE_OPTIONS.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedCategory(type.label)}
            className={`pb-3 text-sm whitespace-nowrap cursor-pointer ${
              selectedCategory === type.label
                ? "border-b-2 border-blue-600 text-blue-600 font-bold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="제목으로 검색..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full max-w-sm p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isAdding && (
        <FaqAddForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 w-16">
                번호
              </th>
              {/* 유형 열의 너비를 w-28에서 w-36 정도로 늘려줍니다 */}
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 w-36">
                유형
              </th>
              {/* 제목 열에 최소 너비를 설정합니다 */}
              <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 min-w-[300px]">
                제목
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 w-40">
                작성일
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 w-40">
                수정일
              </th>
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 w-32">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  로딩 중...
                </td>
              </tr>
            ) : filteredFaqs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-gray-400"
                >
                  FAQ가 없습니다.
                </td>
              </tr>
            ) : (
              filteredFaqs.map((faq) => (
                <React.Fragment key={faq.id}>
                  <FaqRow
                    faq={faq}
                    onEdit={handleEditStart}
                    onDelete={handleDelete}
                  />

                  {editingId === faq.id && (
                    <FaqEditForm
                      formData={formData}
                      setFormData={setFormData}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
