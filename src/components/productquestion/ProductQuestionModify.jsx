import React from "react";
import { X } from "lucide-react";

/** 수정 모달 (스켈레톤) */
export default function ProductQuestionModify({
  item,
  onClose = () => {},
  onSubmit = () => {},
}) {
  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: item.id });
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center">
          문의 수정
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs text-gray-500 block mb-1">제목</label>
            <input
              className="w-full h-10 px-3 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none"
              defaultValue={item.title}
              placeholder="문의 제목"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              잠금 비밀번호 (선택)
            </label>
            <input
              type="password"
              className="w-full h-10 px-3 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none"
              placeholder="비밀글 비밀번호"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              * 비밀글이면 확인 절차 필요
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">내용</label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none resize-y"
              defaultValue={item.question}
              placeholder="문의 내용을 입력하세요"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white rounded-md bg-gray-900 hover:bg-gray-700"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
