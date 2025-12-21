import { useState } from "react";
import { X } from "lucide-react";

const SmsModal = ({ isOpen, onClose, selectedUsers, onSend }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!message.trim()) {
      alert("메시지를 입력해주세요.");
      return;
    }

    if (selectedUsers.length === 0) {
      alert("발송할 사용자를 선택해주세요.");
      return;
    }

    setIsSending(true);
    try {
      // SMS 발송 API 호출
      await onSend(selectedUsers, message);
      alert("SMS가 성공적으로 발송되었습니다.");
      setMessage("");
      onClose();
    } catch (error) {
      alert(error.message || "SMS 발송에 실패했습니다.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">SMS 발송</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-4">
          {/* 선택된 사용자 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              발송 대상 ({selectedUsers.length}명)
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-32 overflow-y-auto">
              {selectedUsers.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  선택된 사용자가 없습니다.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <span
                      key={user.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {user.loginId}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 메시지 입력 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              메시지 내용
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="전송할 SMS 메시지를 입력하세요..."
              className="w-full h-40 border border-gray-300 rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              maxLength={90}
            />
            <div className="flex justify-end items-center mt-2">
              <span className="text-xs text-gray-500">
                {message.length} / 90자
              </span>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            disabled={isSending}
          >
            취소
          </button>
          <button
            onClick={handleSend}
            disabled={isSending || selectedUsers.length === 0}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSending ? "발송 중..." : "발송"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmsModal;
