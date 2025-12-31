import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProductDetailInfo({ detailImages }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-12">
      {detailImages?.length > 0 && (
        <div className="space-y-0">
          {/* 첫 번째 이미지 */}
          <img
            src={detailImages?.[0]?.imageUrl}
            className="w-full rounded-lg shadow-sm"
            alt="상품 상세 이미지 1"
          />
        </div>
      )}

      {/* 더보기 영역 (나머지 이미지가 있을 때만) */}
      {detailImages?.length > 1 && !isExpanded && (
        <div className="relative mt-12">
          {/* 그라데이션 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>

          {/* 미리보기 이미지 (흐릿하게) */}
          <div className="overflow-hidden max-h-48 relative">
            <img
              src={detailImages[1]}
              className="w-full rounded-lg shadow-sm blur-sm"
              alt="상품 상세 이미지 미리보기"
            />
          </div>

          {/* 더보기 버튼 */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
            <button
              onClick={() => setIsExpanded(true)}
              className="px-32 py-4 bg-white border-2 border-gray-900 rounded-lg text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>더보기</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 펼쳐진 상태 - 나머지 이미지들 */}
      {isExpanded && (
        <>
          <div className="space-y-0">
            {detailImages.slice(1).map((image, i) => (
              <img
                key={i + 1}
                src={image.imageUrl}
                className="w-full rounded-lg shadow-sm"
                alt={`상품 상세 이미지 ${i + 2}`}
              />
            ))}
          </div>

          {/* 접기 버튼 */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-32 py-4 bg-white border-2 border-gray-900 rounded-lg text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>접기</span>
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
