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
  detailInfo: {},
};

const ProductAddPage = () => {
  const [productForm, setProductForm] = useState(initForm);

  // const formDataHandler = (data) => {};

  useEffect(() => {
    console.log(productForm);
  }, [productForm]);

  const submitHandler = () => {
    const register = async () => {
      try {
        const data = await registerProduct(productForm);

        console.log("응답 data :", data);

        alert("상품이 등록되었습니다.");
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
        <ProductBasicInfo
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, basicInfo: data }))
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
