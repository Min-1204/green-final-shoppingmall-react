import React, { useState } from "react";
import { X, Lock } from "lucide-react";

/** 등록 모달: 잠금여부(boolean) + 선택적 비밀번호 */
export default function ProductQuestionAdd({
  onClose = () => {},
  onSubmit = () => {},
}) {
  // --- form state ---
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false); // <-- DB의 boolean과 매핑
  const [secretPwd, setSecretPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 선택 검증: 잠금 체크했는데 비번이 비어있다면 경고(정책에 맞게 조절)
    if (isSecret && !secretPwd.trim()) {
      alert("비밀글 비밀번호를 입력하세요.");
      return;
    }

    // 백엔드로 넘길 payload (예시)
    // is_secret: boolean, secret_password: string|null
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      is_secret: isSecret,
      secret_password: isSecret ? secretPwd : null,
    });
  };

  // 체크 해제 시 비밀번호 비우기(선택)
  const handleToggleSecret = () => {
    setIsSecret((prev) => {
      const next = !prev;
      if (!next) setSecretPwd("");
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center">
          문의 작성
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* 제목 */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">제목</label>
            <input
              className="w-full h-10 px-3 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none"
              placeholder="문의 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 잠금 여부 (boolean) */}
          <div className="flex items-start gap-3">
            <input
              id="secret"
              type="checkbox"
              className="mt-1.5 w-4 h-4 rounded border-gray-300"
              checked={isSecret}
              onChange={handleToggleSecret}
            />
            <div className="flex-1">
              <label
                htmlFor="secret"
                className="text-sm font-medium text-gray-800 cursor-pointer"
              >
                비밀글로 등록
              </label>
              <p className="text-[11px] text-gray-400">
                체크 시 목록에 <Lock className="inline w-3 h-3" /> 표시됩니다.
              </p>

              {/* 체크되었을 때만 비밀번호 입력 표시/활성화 */}
              <div
                className={`mt-2 ${isSecret ? "opacity-100" : "opacity-60"}`}
              >
                <label className="text-xs text-gray-500 block mb-1">
                  비밀글 비밀번호 (선택)
                </label>
                <input
                  type="password"
                  className="w-full h-10 px-3 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none disabled:bg-gray-50"
                  placeholder="비밀글 비밀번호"
                  value={secretPwd}
                  onChange={(e) => setSecretPwd(e.target.value)}
                  disabled={!isSecret}
                />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">내용</label>
            <textarea
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 rounded-md text-sm outline-none resize-y"
              placeholder="문의 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* 버튼 */}
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
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
