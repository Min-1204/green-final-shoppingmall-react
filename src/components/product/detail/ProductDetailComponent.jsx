import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../../api/admin/product/productApi";
import useCustomCart from "../../../hooks/useCustomCart";
import ProductQuestion from "../../productquestion/ProductQuestion";
import ReviewListComponent from "../../review/ReviewListComponent";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailOptions from "./ProductDetailOptions";
import ProductDetailQuantity from "./ProductDetailQuantity";
import ProductPurchaseInfo from "./ProductPurchaseInfo";

export default function ProductDetailComponent() {
  const navigate = useNavigate();

  // 장바구니에 담는 기능
  const { changeCart } = useCustomCart();
  // user의 id가 필요해서 redux에서 user 정보 가져옴
  const { user } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const [product, setProduct] = useState({});

  // 썸네일 이미지 (상세페이지에서 제일 크게 보이는 이미지)
  const [thumbnailImage, setThumbnailImage] = useState();

  const [liked, setLiked] = useState(false);

  // 선택된 옵션
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const productData = await fetchProductById(parseInt(id));
      setProduct(productData);
      // console.log("id : ", id);
      // console.log("product : ", productData);
      setThumbnailImage(productData?.mainImages[0]?.imageUrl);
    };
    loadData();
  }, [id]);

  useEffect(() => {
    if (selectedItems?.length === 0) {
      setTotalPrice(0);
      return;
    }

    const sum = selectedItems.reduce(
      (acc, option) => acc + option.sellingPrice * option.qty,
      0
    );

    setTotalPrice(sum);
  }, [selectedItems]);

  //하단 탭
  const [tab, setTab] = useState("info");

  //옵션 하나인 상품의 구매수량
  const [qty, setQty] = useState(1);

  const tabs = [
    { key: "info", label: "상품설명" },
    { key: "buy", label: "구매정보" },
    { key: "review", label: "리뷰" },
    { key: "qna", label: "Q&A" },
  ];

  const handleClickOrderOption = () => {
    if (
      product?.options &&
      product?.options?.length > 0 &&
      selectedItems?.length === 0
    )
      return alert("옵션을 선택해주세요.");

    // console.log("product", product);
    console.log("selectedItems", selectedItems);
    navigate("/order", {
      state: {
        items: selectedItems.map((option) => ({
          id: null,
          productOptionId: option?.id,
          brandName: product?.brand.name,
          productName: product?.basicInfo.productName,
          optionName: option?.optionName,
          sellingPrice: option?.sellingPrice,
          quantity: option?.qty,
          imageUrl: product?.mainImages.filter(
            (image) => image.imageType == "THUMBNAIL"
          )[0]?.imageUrl,
          deliveryPolicy: product?.deliveryPolicy,
        })),
      },
    });
  };

  const handleClickOrder = () => {
    navigate("/order", {
      state: {
        items: [
          {
            id: null,
            productOptionId: product?.options[0]?.id,
            brandName: product?.brand?.name,
            productName: product?.basicInfo?.productName,
            optionName: null,
            sellingPrice: product?.options[0]?.sellingPrice,
            quantity: qty,
            imageUrl: product?.mainImages.filter(
              (image) => image.imageType == "THUMBNAIL"
            )[0]?.imageUrl,
            deliveryPolicy: product?.deliveryPolicy,
          },
        ],
      },
    });
  };

  const handleAddCartOption = (selectedItems) => {
    if (
      product.options &&
      product.options.length > 0 &&
      selectedItems.length === 0
    )
      return alert("옵션을 선택해주세요.");

    // console.log("selectedItems", selectedItems);
    // console.log("user", user);

    selectedItems.forEach((option) => {
      const cartProductDTO = {
        userId: user?.id,
        id: null,
        productOptionId: option?.id,
        quantity: option?.qty,
      };

      changeCart(cartProductDTO);
    });
    alert("장바구니에 담았습니다.");
  };

  const handleAddCart = (product) => {
    // console.log("product", product);
    const cartProductDTO = {
      userId: user?.id,
      id: null,
      productOptionId: product?.options[0]?.id,
      quantity: qty,
    };
    // console.log("cartProductDTO", cartProductDTO);

    changeCart(cartProductDTO);
    alert("장바구니에 담았습니다.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12 pb-32">
      {/* 🔹 개선된 경로 (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 md:mb-8">
        <Link to="/" className="hover:text-gray-900 transition-colors">
          홈
        </Link>
        <span className="text-gray-300">/</span>
        <span className="hover:text-gray-900 transition-colors cursor-pointer">
          {product?.category?.parent?.parent?.name}
        </span>
        <span className="text-gray-300">/</span>
        <span className="hover:text-gray-900 transition-colors cursor-pointer">
          {product?.category?.parent?.name}
        </span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">
          {product?.category?.name}
        </span>
      </nav>

      {/* 상품 상단영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* ✅ 왼쪽: 메인 이미지 + 갤러리 */}
        <div>
          {/* 메인 이미지 */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 shadow-sm group">
            <img
              src={thumbnailImage}
              alt={"썸네일 이미지"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* 갤러리 이미지 리스트 */}
          {product?.mainImages?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-5">
              <img
                src={product?.mainImages[0]?.imageUrl}
                alt={product?.basicInfo?.productName}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-gray-900 transition"
                onClick={() =>
                  setThumbnailImage(product?.mainImages[0]?.imageUrl)
                }
              />
              {product?.mainImages
                ?.filter((_, idx) => idx !== 0)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img?.imageUrl}
                    alt={`gallery-${index}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-gray-900 transition"
                    onClick={() => setThumbnailImage(img?.imageUrl)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* ✅ 오른쪽: 상품 정보 */}
        <div className="space-y-6">
          {/* 브랜드 */}
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-sm text-gray-700 font-semibold border border-gray-200">
            {product?.brand?.name}
          </div>

          {/* 상품명 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product?.basicInfo?.productName}
          </h1>

          {/* 가격 */}
          <div className="py-5 border-y-2 border-gray-900">
            {product?.options?.length > 1 && (
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                {product?.options[0]?.sellingPrice?.toLocaleString()}원~
              </p>
            )}
            {product?.options?.length === 1 && (
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                {product?.options[0]?.sellingPrice?.toLocaleString()}원
              </p>
            )}
          </div>

          {/* 옵션 선택 */}
          {product?.options?.length > 1 && (
            <ProductDetailOptions
              product={product}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          )}

          {/* 수량 선택 (옵션 없을 때) */}
          {product?.options?.length === 1 && (
            <ProductDetailQuantity
              qty={qty}
              setQty={setQty}
              option={product?.options[0]}
            />
          )}

          {/*  상품 금액 합계 UI */}
          {product?.options?.length === 1 && (
            <div className="pt-4 pb-6 border-t border-gray-300">
              <div className="flex justify-between items-end">
                <span className="text-base font-semibold text-gray-900">
                  상품금액 합계
                </span>
                <span className="text-2xl font-extrabold text-[#ff6e18]">
                  {(product?.options[0]?.sellingPrice * qty).toLocaleString()}원
                  {/* 이 금액이 계산된 총액을 표시하게 됩니다. */}
                </span>
              </div>
            </div>
          )}
          {selectedItems.length !== 0 && (
            <div className="pt-4 pb-6 border-t border-gray-300">
              <div className="flex justify-between items-end">
                <span className="text-base font-semibold text-gray-900">
                  상품금액 합계
                </span>
                <span className="text-2xl font-extrabold text-[#ff6e18]">
                  {totalPrice.toLocaleString()}원
                  {/* 이 금액이 계산된 총액을 표시하게 됩니다. */}
                </span>
              </div>
            </div>
          )}

          {/*  버튼  */}
          <div className="flex gap-3 pt-6">
            {product?.options?.length > 1 ? (
              <>
                <button
                  className="flex-1 py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
                  onClick={() => handleAddCartOption(selectedItems)}
                >
                  장바구니
                </button>
                <button
                  className="flex-1 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
                  onClick={() => handleClickOrderOption()}
                >
                  바로구매
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex-1 py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95"
                  onClick={() => handleAddCart(product)}
                >
                  장바구니
                </button>
                <button
                  className="flex-1 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
                  onClick={() => handleClickOrder()}
                >
                  바로구매
                </button>
              </>
            )}
            <button
              onClick={() => setLiked(!liked)}
              className="p-4 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-300 active:scale-95"
            >
              {liked ? (
                <AiFillHeart className="w-6 h-6 text-red-500" />
              ) : (
                <AiOutlineHeart className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>

          {/*  배송 정보 */}
          <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">배송비</span>
              <span className="font-bold text-gray-900">
                {product?.deliveryPolicy?.basicDeliveryFee.toLocaleString()}원 (
                {product?.deliveryPolicy?.freeConditionAmount.toLocaleString()}
                원 이상 무료배송)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">배송기간</span>
              <span className="font-bold text-gray-900">평균 1~3일</span>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="sticky top-0 bg-white z-10 border-b-2 border-gray-200 shadow-sm">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 min-w-[100px] py-5 text-base font-bold transition-all relative ${
                tab === t.key
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mt-8">
        {tab === "info" && (
          <ProductDetailInfo detailImages={product.detailImages} />
        )}
        {tab === "buy" && (
          <ProductPurchaseInfo detailInfo={product.detailInfo} />
        )}
        {tab === "review" && <ReviewListComponent productId={product.id} />}
        {tab === "qna" && <ProductQuestion />}
      </div>
    </div>
  );
}
