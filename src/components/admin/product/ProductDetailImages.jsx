import { X, Plus, ChevronUp, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const initialImages = {
  detailImages: [],
};

export default function ProductDetailImages({ onChangeForm }) {
  const detailRef = useRef(null);
  const [images, setImages] = useState(initialImages);
  // 선택된 미리보기 이미지의 인덱스
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(null);
  // 전체 이미지 미리보기 모달
  const [showFullPreview, setShowFullPreview] = useState(false);

  useEffect(() => {
    onChangeForm([...images.detailImages]);
  }, [images]);

  const detailImgChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prev) => ({
        ...prev,
        detailImages: [...prev.detailImages, ...files],
      }));

      // 첫 이미지가 추가되면 자동으로 미리보기 표시
      if (images.detailImages.length === 0) {
        setSelectedPreviewIndex(0);
      }
    }
    // 파일 선택 후 input 값 초기화
    e.target.value = "";
  };

  // 이미지 삭제 핸들러
  const removeImageHandler = (index) => {
    setImages((prev) => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, i) => i !== index),
    }));

    // 미리보기 인덱스 재설정
    if (selectedPreviewIndex === index) {
      setSelectedPreviewIndex(images.detailImages.length > 1 ? 0 : null);
    } else if (selectedPreviewIndex > index) {
      setSelectedPreviewIndex((prev) => prev - 1);
    }
  };

  // 현재 선택된 미리보기 파일
  const currentPreviewFile = images.detailImages[selectedPreviewIndex];

  // 현재 선택된 파일의 URL
  const currentPreviewUrl = currentPreviewFile
    ? URL.createObjectURL(currentPreviewFile)
    : undefined;

  // 현재 선택된 파일의 정보
  const currentPreviewInfo = {
    fileName: currentPreviewFile?.name || "-",
    fileSize: currentPreviewFile?.size
      ? `${(currentPreviewFile.size / 1024 / 1024).toFixed(2)} MB`
      : "-",
    fileType: currentPreviewFile?.type || "-",
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-800">
          상품 상세 이미지
        </h2>
      </div>

      {
        <div>
          {/* 안내 메시지 */}
          <div className="mb-4 mt-4 px-2">
            <p className="text-sm text-gray-500">
              - 상품 상세 페이지에 표시될 세로로 긴 이미지를 등록하세요.
            </p>
            <p className="text-sm text-gray-500">
              - 여러 장의 이미지를 순서대로 등록할 수 있습니다.
            </p>
          </div>

          {/* 이미지 등록 테이블 */}
          <div className="border border-gray-300 mb-6 rounded-lg overflow-hidden shadow-lg">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr className="text-gray-700 font-semibold text-sm divide-x divide-gray-300">
                  <th className="px-3 py-3 text-center w-[80px]">순서</th>
                  <th className="px-3 py-3 text-center">이미지 파일명</th>
                  <th className="px-3 py-3 text-center">사진 수정</th>
                  <th className="px-3 py-3 text-center w-[100px]">상세보기</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* 상세 이미지 목록 */}
                {images.detailImages.map((file, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition divide-x divide-gray-200 ${
                      selectedPreviewIndex === index ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-3 py-3 text-center">{index + 1}</td>
                    <td className="px-3 py-3">{file?.name}</td>
                    <td className="px-3 py-3 text-center">
                      <button
                        className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm"
                        onClick={() => removeImageHandler(index)}
                      >
                        파일 삭제
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm"
                        onClick={() => setSelectedPreviewIndex(index)}
                      >
                        보기
                      </button>
                    </td>
                  </tr>
                ))}

                {/* 이미지가 없을 때 */}
                {images.detailImages.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-3 py-6 text-center text-gray-400"
                    >
                      등록된 상세 이미지가 없습니다.
                    </td>
                  </tr>
                )}

                {/* 파일 추가 버튼 행 */}
                <tr className="divide-x divide-gray-200">
                  <td colSpan="2" className="py-3 text-center bg-gray-50">
                    <label className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-md inline-flex items-center transition border border-green-200 shadow-sm">
                      <Plus size={16} className="mr-1" />
                      상세 이미지 추가
                      <input
                        type="file"
                        ref={detailRef}
                        onChange={detailImgChangeHandler}
                        multiple={true}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </td>
                  <td
                    colSpan="2"
                    className="px-3 py-3 text-left text-gray-500 bg-gray-50"
                  >
                    {images.detailImages.length}개의 상세 이미지가
                    등록되었습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 미리보기 영역 */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
              <div className="w-full px-4 py-3 text-gray-700 font-semibold flex justify-between items-center">
                <span>미리보기</span>
                {images.detailImages.length > 0 && (
                  <button
                    onClick={() => setShowFullPreview(true)}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md border border-blue-200 cursor-pointer transition shadow-sm text-sm font-normal"
                  >
                    전체 이미지 확인
                  </button>
                )}
              </div>
            </div>
            <div className="flex">
              {/* 선택된 이미지 미리보기 */}
              <div className="w-1/2 p-4 border-r border-gray-300 flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  {currentPreviewUrl ? (
                    <img
                      src={currentPreviewUrl}
                      alt="미리보기 이미지"
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] flex items-center justify-center text-gray-400">
                      미리보기
                    </div>
                  )}
                </div>
              </div>

              {/* 이미지 상세 정보 */}
              <div className="w-1/2 p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <div className="w-32 text-gray-500">이미지 구분</div>
                    <div className="text-gray-800">
                      {selectedPreviewIndex !== null
                        ? `상세 이미지 (${selectedPreviewIndex + 1}번째)`
                        : "-"}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-500">파일명</div>
                    <div className="text-gray-800 truncate flex-1">
                      {currentPreviewInfo.fileName}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-500">파일 크기</div>
                    <div className="text-gray-800">
                      {currentPreviewInfo.fileSize}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-500">파일 형식</div>
                    <div className="text-gray-800">
                      {currentPreviewInfo.fileType}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-500">주소</div>
                    <div className="text-gray-800 truncate flex-1">
                      {currentPreviewFile
                        ? URL.createObjectURL(currentPreviewFile)
                        : "-"}
                    </div>
                  </div>

                  {selectedPreviewIndex !== null && (
                    <div className="pt-3">
                      <button
                        className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm inline-flex items-center"
                        onClick={() => removeImageHandler(selectedPreviewIndex)}
                      >
                        <X size={16} className="mr-1" />
                        선택 이미지 삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {/* 전체 이미지 미리보기 모달 */}
      {showFullPreview && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFullPreview(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                전체 상세 이미지 미리보기
              </h3>
              <button
                onClick={() => setShowFullPreview(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* 모달 내용 - 이미지들을 세로로 나열 */}
            <div className="overflow-y-auto p-6 bg-gray-50">
              <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
                {images.detailImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`상세 이미지 ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                    {/* 이미지 순서 표시 */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-semibold">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* 안내 문구 */}
              <div className="text-center mt-4 text-sm text-gray-500">
                총 {images.detailImages.length}개의 이미지가 등록되었습니다.
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="p-4 border-t border-gray-300 bg-gray-50 text-center">
              <button
                onClick={() => setShowFullPreview(false)}
                className="bg-gray-900 text-white hover:bg-black px-6 py-2 rounded-md transition shadow-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
