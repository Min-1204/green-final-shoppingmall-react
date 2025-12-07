import { useEffect, useRef, useState } from "react";
import { reviewDelete, reviewModify } from "../../api/review/reviewApi";
import { useSelector } from "react-redux";

const ReviewModifyDelete = ({ closeModal, review, update }) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [images, setImages] = useState([]); // 이미지 미리보기+원본RUL
  const [newFiles, setNewFiles] = useState([]); // 새로 첨부한 파일 관리
  const [deleteImgUrls, setDeleteImgUrls] = useState([]); // 삭제할 기존 이미지 url
  const [originalImgUrls, setOriginalImgUrls] = useState([]); // 원본 이미지 URL 저장

  const { user } = useSelector((state) => state.authSlice);

  const uploadRef = useRef();

  useEffect(() => {
    if (review) {
      setReviewContent(review.content || review.review || "");
      setCurrentRating(review.rating || 0);
      setImages(review.imageUrls || []);
      setNewFiles([]);
      setDeleteImgUrls([]);
      setOriginalImgUrls(review.imageUrls);
    }
  }, [review, review.id, review.imageUrls.length]);

  //리뷰 수정(업데이트) 핸들러
  const reviewUpdatedHandler = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요");
      return;
    }
    const updateReview = await reviewModify(
      review.id,
      {
        content: reviewContent,
        rating: currentRating,
        newImages: newFiles,
        deleteImgUrls: deleteImgUrls,
      },
      user.id
    );
    alert("리뷰가 수정되었습니다.");

    if (update) {
      const formatReview = {
        ...review,
        content: reviewContent,
        rating: currentRating,
        imageUrls: updateReview.imageUrls || images,
      };
      update(formatReview);
    }
    closeModal();
  };

  //리뷰 삭제 핸들러
  const reviewDeleteHandler = async (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    await reviewDelete(id, user.id);

    alert("리뷰가 삭제되었습니다.");

    if (update) {
      update({ deleted: true, id: id });
    }
    closeModal();
  };

  // 사진 첨부 핸들러
  const imageAddHandler = () => {
    const files = Array.from(uploadRef.current.files);
    if (!files.length) return;

    const totalImg = review.imageUrls.length + files.length;
    if (totalImg > 5) {
      alert("사진은 최대 5장끼지 등록할 수 있습니다.");
      return;
    }

    //새 파일 상태에 추가
    setNewFiles((prev) =>
      [...prev, ...files].slice(0, 5 - originalImgUrls.length)
    );

    //미리보기 이미지
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => {
          const newImages = [...prev, e.target.result];
          return newImages.slice(0, 5);
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // 첨부 이미지 삭제 핸들러
  const imageRemoveHandler = (idx) => {
    const imageToRemove = images[idx];
    const originalImgCnt = originalImgUrls.length;

    // 기존 서버 이미지인 경우
    if (idx < originalImgCnt) {
      // deleteImgUrls에 추가
      setDeleteImgUrls((prev) => [...prev, imageToRemove]);
    } else {
      // 새로 추가한 이미지인 경우 newFiles에서 제거
      const newFileIdx = idx - originalImgCnt;
      setNewFiles((prev) => prev.filter((file, i) => i !== newFileIdx));
    }

    // images state에서 제거
    setImages((prev) => prev.filter((img, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center">
          리뷰 수정
          <button
            className="text-gray-400 text-3xl cursor-pointer"
            onClick={closeModal}
          >
            ×
          </button>
        </h2>

        {/* 상품 + 별점 */}
        <div className="flex items-center space-x-4 border-b pb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
            이미지
          </div>
          <div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-600 text-sm">별점:</span>
              <div className="flex space-x-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => {
                  let starClass = "cursor-pointer transition text-gray-300";
                  if (currentRating >= star)
                    starClass = "cursor-pointer transition text-yellow-500";
                  return (
                    <span
                      key={star}
                      className={starClass}
                      onClick={() => setCurrentRating(star)}
                    >
                      {currentRating >= star ? "★" : "☆"}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 리뷰 작성란 */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-green-500 focus:ring-green-500 resize-none placeholder:text-gray-400 mt-4"
          rows={8}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />

        {/* 사진 첨부/수정 */}
        <div className="flex justify-between items-center pt-2 border-t mt-4">
          <button
            type="button"
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-full cursor-pointer"
            onClick={() => {
              if (images.length >= 5) {
                alert("사진은 최대 5장까지 업로드할 수 있습니다.");
                return;
              }
              uploadRef.current.click();
            }}
          >
            📷 사진첨부 ({images.length}/5)
          </button>
          <input
            type="file"
            name="file"
            ref={uploadRef}
            multiple={true}
            onChange={imageAddHandler}
            className="hidden"
          />
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-400 bg-red-50 rounded-lg cursor-pointer"
              onClick={() => reviewDeleteHandler(review.id)}
            >
              삭제하기
            </button>
            <button
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg cursor-pointer"
              style={{ backgroundColor: "#111111" }}
              onClick={reviewUpdatedHandler}
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 첨부 이미지 미리보기 */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, idx) => {
            return (
              <div
                key={idx}
                className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-300 flex-shrink-0"
              >
                <button
                  onClick={() => imageRemoveHandler(idx)} //첨부된 이미지 삭제
                  className="absolute top-0 right-0 bg-black/70 text-white text-xs 
                   w-5 h-5 flex justify-center cursor-pointer"
                >
                  x
                </button>

                <img
                  src={img}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ReviewModifyDelete;
