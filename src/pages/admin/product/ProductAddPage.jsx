import { useEffect, useState } from "react";
import { registerProduct } from "../../../api/admin/product/productApi";
import DeliveryPolicy from "../../../components/admin/product/DeliveryPolicy";
import OptionRegistration from "../../../components/admin/product/OptionRegistration";
import ProductBasicInfo from "../../../components/admin/product/ProductBasicInfo";
import ProductBrand from "../../../components/admin/product/ProductBrand";
import ProductCategory from "../../../components/admin/product/ProductCategory";
import ProductMainImages from "../../../components/admin/product/ProductMainImages";
import ProductSaleInfo from "../../../components/admin/product/ProductSaleInfo";
import ProductDetailImages from "../../../components/admin/product/ProductDetailImages";
import ProductDetailInfo from "../../../components/admin/product/ProductDetailInfo";
import { useNavigate } from "react-router-dom";

const initForm = {
  category: {},
  brand: {},
  basicInfo: {
    productName: "",
    searchKeywords: "",
    description: "",
  },
  saleInfo: {
    saleStatus: "ON_SALE",
    exposureStatus: "EXPOSURE",
    isCancelable: true,
    useRestockNoti: false,
  },
  mainImages: {
    thumbnailImage: null,
    galleryImages: [],
  },
  detailImages: [],
  deliveryPolicy: {
    id: 2,
    name: "조건부 무료정책",
    policyType: "CONDITIONAL_FREE",
    basicDeliveryFee: 3000,
    freeConditionAmount: 50000,
    defaultPolicy: true,
  },
  options: [
    {
      optionName: "",
      purchasePrice: "",
      sellingPrice: "",
      currentStock: "",
      initialStock: "",
      safetyStock: "",
      image: null,
    },
  ],
  detailInfo: {
    capacity: "",
    skinType: "",
    usagePeriod: "",
    usageMethod: "",
    manufacturer: "",
    madeInCountry: "",
    ingredients: "",
    functionalCertification: "",
    caution: "",
    qualityGuarantee: "",
    customerServiceNumber: "",
  },
};

const ProductAddPage = () => {
  const [productForm, setProductForm] = useState(initForm);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(productForm);
  }, [productForm]);

  // 필수항목 상품멱, 카테고리, 브랜드, 썸네일 이미지, 옵션 필드, 상품 상세정보
  const validateRequiredField = () => {
    if (productForm.basicInfo.productName.trim() === "") {
      alert("상품명은 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (!productForm.category?.id) {
      alert("카테고리는 필수항목으로 반드시 선택하셔야 합니다.");
      return true;
    } else if (!productForm.brand?.id) {
      alert("브랜드는 필수항목으로 반드시 선택하셔야 합니다.");
      return true;
    } else if (!productForm.mainImages?.thumbnailImage) {
      alert("썸네일 이미지는 필수항목으로 반드시 추가하셔야 합니다.");
      return true;
    } else if (productForm.options.find((o) => o.optionName.trim() === "")) {
      alert("옵션명은 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (productForm.options.find((o) => o.purchasePrice.trim() === "")) {
      alert("옵션의 매입가는 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (productForm.options.find((o) => o.sellingPrice.trim() === "")) {
      alert("옵션의 판매가는 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (productForm.options.find((o) => o.currentStock.trim() === "")) {
      alert("옵션의 현재 재고는 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (productForm.options.find((o) => o.initialStock.trim() === "")) {
      alert("옵션의 초기재고는 필수항목으로 반드시 입력하셔야 합니다.");
      return true;
    } else if (
      Object.values(productForm.detailInfo).some((v) => v.trim() === "")
    ) {
      alert(
        "상품 상세정보의 모든항목은 필수항목으로 반드시 입력하셔야 합니다."
      );
      return true;
    }

    return false;
  };

  const submitHandler = () => {
    // 필수 항목 입력되어있는지 검증 로직
    if (validateRequiredField()) {
      return;
    }

    const register = async () => {
      try {
        const data = await registerProduct(productForm);

        console.log("응답 data :", data);

        if (data === "ok") {
          alert("상품이 등록되었습니다.");
          navigate("/admin/products");
        }
      } catch (error) {
        console.error("등록 실패:", error);
        alert("상품 등록에 실패했습니다.");
      }
    };
    register();
  };

  const onReset = () => {
    setProductForm(initForm);
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-8 pb-40">
        <ProductBasicInfo
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, basicInfo: data }))
          }
        />
        <ProductCategory
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, category: data }))
          }
        />
        <ProductBrand
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, brand: data }))
          }
        />
        <ProductSaleInfo
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, saleInfo: data }))
          }
        />
        <ProductMainImages
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, mainImages: data }))
          }
        />
        <ProductDetailImages
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, detailImages: data }))
          }
        />
        <DeliveryPolicy
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, deliveryPolicy: data }))
          }
        />
        <OptionRegistration
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, options: data }))
          }
        />
        <ProductDetailInfo
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, detailInfo: data }))
          }
        />
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onReset}
              className="px-6 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={submitHandler}
              // disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              상품 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;
