import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  registerProduct,
} from "../../../api/admin/product/productApi";
import DeliveryPolicy from "../../../components/admin/product/DeliveryPolicy";
import OptionRegistration from "../../../components/admin/product/OptionRegistration";
import ProductBrand from "../../../components/admin/product/ProductBrand";
import ProductDetailImages from "../../../components/admin/product/ProductDetailImages";
import ProductDetailInfo from "../../../components/admin/product/ProductDetailInfo";
import ProductMainImages from "../../../components/admin/product/ProductMainImages";
import ProductSaleInfo from "../../../components/admin/product/ProductSaleInfo";
import ProductBasicInfoModify from "../../../components/admin/product/modify/ProductBasicInfoModify";
import ProductCategoryModify from "../../../components/admin/product/modify/ProductCategoryModify";

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

const ProductModifyPage = () => {
  const [productForm, setProductForm] = useState(initForm);
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const productData = await fetchProductById(parseInt(id));
      setProduct(productData);
      setProductForm({
        category: { ...productData.category },
        brand: { ...productData.brand },
        basicInfo: { ...productData.basicInfo },
        saleInfo: productData.saleInfo,
        mainImages: {
          thumbnailImage: { ...productData.mainImages[0], image: null },
          galleryImages: [
            ...productData.mainImages.filter((_, idx) => idx !== 0),
          ],
        },
        detailImages: [...productData.detailImages],
        deliveryPolicy: { ...productData.deliveryPolicy },
        options: [...productData.options],
        detailInfo: { ...productData.detailInfo },
      });
      console.log("id : ", id);
      console.log("product : ", productData);
    };
    loadData();
  }, [id]);

  useEffect(() => {
    console.log("productForm : ", productForm);
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
        <ProductBasicInfoModify
          existingData={productForm?.basicInfo}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, basicInfo: data }))
          }
        />
        <ProductCategoryModify
          existingData={productForm?.category}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, category: data }))
          }
        />
        <ProductBrand
          existingData={productForm?.brand}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, brand: data }))
          }
        />
        <ProductSaleInfo
          existingData={productForm?.saleInfo}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, saleInfo: data }))
          }
        />
        <ProductMainImages
          existingData={productForm?.mainImages}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, mainImages: data }))
          }
        />
        <ProductDetailImages
          existingData={productForm?.detailImages}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, detailImages: data }))
          }
        />
        <DeliveryPolicy
          existingData={productForm?.deliveryPolicy}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, deliveryPolicy: data }))
          }
        />
        <OptionRegistration
          existingData={productForm?.options}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, options: data }))
          }
        />
        <ProductDetailInfo
          existingData={productForm?.detailInfo}
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

export default ProductModifyPage;
