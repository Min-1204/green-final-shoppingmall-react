import { useEffect, useState } from "react";
import { fetchProductById } from "../../api/admin/product/productApi";

const ReviewSee = ({ closeModal, review }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!review) return;

    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(review.productId);
        setProduct(data);
      } catch (error) {
        console.error("상품 정보 조회 실패:", error);
      }
    };
    fetchProduct();
  }, [review]);

  const rating = review?.rating ?? 0;
  const content = review?.content ?? "";
  const images = review?.imageUrl ?? [];

  const productImage = product?.mainImages?.[0]?.imageUrl;
  const productName = product?.basicInfo?.productName;
  const productOption = product?.options?.[0]?.optionName;
  const productPrice = product?.options?.[0]?.sellingPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[76vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex justify-between items-center mb-4">
          리뷰 보기
          <button
            className="text-gray-400 text-3xl cursor-pointer"
            onClick={closeModal}
          >
            ×
          </button>
        </h2>

        {/* 상품 + 별점 */}
        <div className="flex items-center space-x-4 border-b pb-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
            {productImage && (
              <img
                src={productImage}
                alt="product"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800">{productName}</p>
            <p className="text-xs text-gray-500 mt-1">{productOption}</p>
            <p className="text-xs text-gray-500 mt-0.5">{productPrice} 원</p>

            <div className="flex items-center space-x-4 mt-2">
              {/* 별점 */}
              <div className="flex items-center space-x-1 text-[15px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }
                  >
                    {rating >= star ? "★" : "☆"}
                  </span>
                ))}
              </div>
              {/* 작성일자 */}
              <span className="text-gray-500 text-sm">
                작성일자: {review.createdAt?.slice(0, 10).replace(/-/g, ".")}
              </span>
            </div>
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="w-full h-50 border border-gray-300 rounded-lg p-3 text-sm text-gray-700 overflow-y-auto whitespace-pre-wrap">
          {content}
        </div>

        {/* 첨부 이미지: 가로 스크롤 - 이미지가 있을 때만 표시 */}
        {images && images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-2 mt-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-64 h-64 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`리뷰 이미지 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSee;
