import { useRef, useState } from "react";
import { reviewAdd } from "../../api/review/reviewApi";
import { useSelector } from "react-redux";

const ReviewAddComponent = ({ closeModal, orderItem }) => {
  console.log("orderItem => ", orderItem);
  const [currentRating, setCurrentRating] = useState(0);
  //주문 아이템에서 필요한 데이터 추출
  const { productId, orderId, productName, imageUrl, totalAmount } = orderItem;
  //서버 전송용 파일 객체
  const [review, setReview] = useState({
    content: "",
    rating: 0,
    images: [],
    productId: productId,
    orderId: orderId,
  });

  const [images, setImages] = useState([]); //이미지 미리보기용
  const uploadRef = useRef();

  const reviewAddHandler = async () => {
    if (!review.content.trim()) {
      alert("리뷰 내용을 입력해주세요");
      return;
    }
    reviewAdd(review);
    alert("리뷰가 등록되었습니다");
    closeModal();
  };

  // 사진 첨부 핸들러
  const imageAddHandler = () => {
    const files = Array.from(uploadRef.current.files);
    if (!files) return;

    //업로드 파일 개수 제한
    if (review.images.length + files.length > 5) {
      alert("사진은 최대 5장끼지 등록할 수 있습니다.");
      return;
    }

    //원본 파일 저장
    setReview((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5),
    }));

    //미리보기 이미지
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);

        if (previews.length === files.length) {
          setImages((prev) => [...prev, ...previews].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 첨부 이미지 삭제 핸들러
  const imageRemoveHandler = (idx) => {
    setImages((prev) => prev.filter((review, i) => i !== idx));

    setReview((prev) => ({
      ...prev,
      images: prev.images.filter((review, i) => i !== idx),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full space-y-4">
        {/* 헤더 */}
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center">
          리뷰 작성
          <button
            className="text-gray-400 text-3xl cursor-pointer"
            onClick={closeModal}
          >
            ×
          </button>
        </h2>

        {/* 상품 정보 영역 */}
        <div className="flex items-center gap-4 border-b pb-4">
          {/* 상품 이미지 */}
          <img
            src={imageUrl}
            alt={productName}
            className="w-16 h-16 object-cover rounded-md border"
          />

          <div>
            {/* 상품명 */}
            <p className="text-sm font-semibold">{productName}</p>

            {/* 상품 가격 */}
            <p className="text-xs text-gray-500">
              {totalAmount.toLocaleString()}원
            </p>

            {/* 별점 */}
            <div className="flex gap-1 mt-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${
                    currentRating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentRating(star);
                    setReview({ ...review, rating: star });
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 리뷰 입력 */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-green-500 focus:ring-green-500 resize-none placeholder:text-gray-400 mt-4"
          rows={8}
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
          placeholder="상품에 대한 솔직한 의견을 작성해주세요."
        />

        {/* 사진 첨부 */}
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
          <button
            className="px-5 py-2 text-sm font-semibold text-white rounded-lg cursor-pointer"
            style={{ backgroundColor: "#111111" }}
            onClick={reviewAddHandler}
          >
            등록하기
          </button>
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

export default ReviewAddComponent;
