export default function ReturnModal({ item, closeModal }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">반품 신청</h2>

        <p className="text-sm text-gray-600 mb-2">{item.pname}</p>

        <textarea
          className="w-full border rounded p-2 text-sm"
          placeholder="반품 사유를 입력해주세요."
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => closeModal()}
          >
            닫기
          </button>
          <button
            className="px-4 py-2 bg-[#111] text-white rounded"
            onClick={() => closeModal()}
          >
            반품 요청
          </button>
        </div>
      </div>
    </div>
  );
}
