import { X, Plus, ChevronUp, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const initialImages = {
  thumbnailImage: null,
  galleryImages: [],
};

function ProductMainImagesModify({ existingData, onChangeForm }) {
  const thumbnailRef = useRef(null);
  const galleryRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [images, setImages] = useState(initialImages);
  // 선택된 미리보기 이미지의 인덱스 (미리보기 상세 정보를 보여주기 위함)
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

  useEffect(() => {
    if (existingData) {
      const thumnailImg = {
        ...existingData.thumbnailImage,
        file: existingData?.thumbnailImage?.file
          ? existingData.thumbnailImage.file
          : null,
      };
      const galleryImgs = existingData.galleryImages.map((img) => ({
        ...img,
        file: img?.file ? img.file : null,
      }));
      setImages({ thumbnailImage: thumnailImg, galleryImages: galleryImgs });
    }
  }, [existingData]);

  const thumbnailImgChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedImages = { ...images, thumbnailImage: { file: file } };
      console.log("updatedImages", updatedImages);
      setImages(updatedImages);
      onChangeForm(updatedImages);

      // setImages((prev) => {
      //   const updatedImages = { ...prev, thumbnailImage: { file: file } };
      //   console.log("updatedImages", updatedImages);
      //   onChangeForm(updatedImages);
      //   return updatedImages;
      // });
      // 대표 이미지가 선택되면 자동으로 미리보기 상세 정보 표시 (인덱스 0)
      setSelectedPreviewIndex(0);
    }
  };

  const galleryImgChangeHandler = (e) => {
    if (!images?.thumbnailImage) {
      alert("썸네일 이미지를 먼저 등록해 주세요.");
    } else {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const updatedImages = {
          ...images,
          galleryImages: [
            ...images.galleryImages,
            ...files.map((f) => ({ file: f })),
          ],
        };
        console.log("updatedImages : ", updatedImages);
        setImages(updatedImages);
        onChangeForm(updatedImages);
        // setImages((prev) => {
        //   const updatedImages = {
        //     ...prev,
        //     galleryImages: [
        //       ...prev.galleryImages,
        //       ...files.map((f) => ({ file: f })),
        //     ],
        //   };
        //   console.log("updatedImages : ", updatedImages);
        //   onChangeForm(updatedImages);
        //   return updatedImages;
        // });
      }
      // 파일 선택 후 input 값 초기화 (같은 파일을 다시 선택해도 onChange 이벤트 발생시키기 위함)
      e.target.value = "";
    }
  };

  // 이미지 삭제 핸들러 (대표 이미지와 추가 이미지 모두 처리)
  const removeImageHandler = (index) => {
    if (index === 0) {
      // 대표 이미지 삭제
      const updatedImages = { ...images, thumbnailImage: null };
      console.log("updatedImages : ", updatedImages);
      setImages(updatedImages);
      onChangeForm(updatedImages);

      // setImages((prev) => {
      //   const updatedImages = { ...prev, thumbnailImage: null };
      //   console.log("updatedImages : ", updatedImages);
      //   onChangeForm(updatedImages);
      //   return updatedImages;
      // });
    } else {
      // 추가 이미지 삭제 (인덱스는 1부터 시작)
      const updatedImages = {
        ...images,
        galleryImages: images.galleryImages.filter(
          (_, idx) => idx !== index - 1
        ),
      };
      console.log("updatedImages : ", updatedImages);
      setImages(updatedImages);
      onChangeForm(updatedImages);

      // setImages((prev) => {
      //   const updatedImages = {
      //     ...prev,
      //     galleryImages: prev.galleryImages.filter((_, i) => i !== index - 1),
      //   };
      //   console.log("updatedImages : ", updatedImages);
      //   onChangeForm(updatedImages);
      //   return updatedImages;
      // });
    }

    // 미리보기 인덱스 재설정
    if (selectedPreviewIndex === index) {
      setSelectedPreviewIndex(0);
    } else if (selectedPreviewIndex > index) {
      setSelectedPreviewIndex((prev) => prev - 1);
    }
  };

  // 미리보기 목록
  const previewList = [images.thumbnailImage, ...images.galleryImages].filter(
    (img) => Boolean(img)
  );

  // 현재 선택된 미리보기 파일
  const currentPreviewFile = previewList[selectedPreviewIndex]?.file;

  // 현재 선택된 파일의 URL
  const currentPreviewUrl = currentPreviewFile
    ? URL.createObjectURL(currentPreviewFile)
    : previewList[selectedPreviewIndex]?.imageUrl;
  //    : "https://via.placeholder.com/300?text=No+Image"; // 대체 이미지 URL

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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-3 border-b"
      >
        <h2 className="text-lg font-semibold text-gray-800">상품 대표 사진</h2>

        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* 안내 메시지 */}
          <div className="mb-4 mt-4 px-2">
            <p className="text-sm text-gray-500">- 대표 사진은 필수입니다.</p>
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
                {/* 대표 이미지 */}
                <tr
                  className={`hover:bg-gray-50 transition divide-x divide-gray-200 ${
                    selectedPreviewIndex === 0 ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-3 py-3 text-center">1</td>
                  <td className="px-3 py-3">
                    {images.thumbnailImage?.file?.name || "썸네일 이미지"}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md border border-gray-300 transition shadow-sm inline-block">
                      대표 이미지 선택
                      <input
                        type="file"
                        ref={thumbnailRef}
                        onChange={thumbnailImgChangeHandler}
                        multiple={false}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <button
                      className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm"
                      onClick={() => setSelectedPreviewIndex(0)}
                    >
                      보기
                    </button>
                  </td>
                </tr>

                {/* 추가 이미지 */}
                {images.galleryImages.map((img, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition divide-x divide-gray-200 ${
                      selectedPreviewIndex === index + 1 ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-3 py-3 text-center">{index + 2}</td>
                    <td className="px-3 py-3">
                      {img?.file?.name || `이미지 ${index + 2}`}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm"
                        onClick={() => removeImageHandler(index + 1)}
                      >
                        파일 삭제
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm"
                        onClick={() => setSelectedPreviewIndex(index + 1)}
                      >
                        보기
                      </button>
                    </td>
                  </tr>
                ))}

                {/* 파일 추가 버튼 행 */}
                <tr className="divide-x divide-gray-200">
                  <td colSpan="2" className="py-3 text-center bg-gray-50">
                    <label className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-md inline-flex items-center transition border border-green-200 shadow-sm">
                      <Plus size={16} className="mr-1" />
                      추가 파일 선택
                      <input
                        type="file"
                        ref={galleryRef}
                        onChange={galleryImgChangeHandler}
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
                    {images.galleryImages.length}개의 추가 이미지가
                    등록되었습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 미리보기 영역 */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
              <div className="w-full px-4 py-3 text-gray-700 font-semibold">
                미리보기
              </div>
            </div>
            <div className="flex">
              {/* 선택된 이미지 미리보기 */}
              <div className="w-1/2 p-4 border-r border-gray-300 flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-xs aspect-square bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                  {currentPreviewUrl ? (
                    <img
                      src={currentPreviewUrl}
                      alt="미리보기 이미지"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                      {selectedPreviewIndex === 0
                        ? "대표 사진"
                        : `추가 사진 (${selectedPreviewIndex}번째)`}
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

                  <div className="pt-3">
                    <button
                      className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm inline-flex items-center"
                      onClick={() => removeImageHandler(selectedPreviewIndex)}
                    >
                      <X size={16} className="mr-1" />
                      선택 이미지 삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// React.memo를 사용하여 prop이 변경되었을 때만 리렌더링하도록 설정
export default React.memo(ProductMainImagesModify);
