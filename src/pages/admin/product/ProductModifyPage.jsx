import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  modifyProduct,
} from "../../../api/admin/product/productApi";

import ProductBasicInfoModify from "../../../components/admin/product/modify/ProductBasicInfoModify";
import ProductCategoryModify from "../../../components/admin/product/modify/ProductCategoryModify";
import ProductBrandModify from "../../../components/admin/product/modify/ProductBrandModify";
import ProductSaleInfoModify from "../../../components/admin/product/modify/ProductSaleInfoModify";
import DeliveryPolicyModify from "../../../components/admin/product/modify/DeliveryPolicyModify";
import ProductDetailInfoModify from "../../../components/admin/product/modify/ProductDetailInfoModify";
import OptionRegistrationModify from "../../../components/admin/product/modify/OptionRegistrationModify";
import ProductDetailImagesModify from "../../../components/admin/product/modify/ProductDetailImagesModify";
import ProductMainImagesModify from "../../../components/admin/product/modify/ProductMainImagesModify";

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
  mainImages: [],
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

// const createMainImagesForm = ()

const ProductModifyPage = () => {
  const [productForm, setProductForm] = useState(initForm);
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const productData = await fetchProductById(parseInt(id));

      setProductForm({
        category: { ...productData.category },
        brand: { ...productData.brand },
        basicInfo: { ...productData.basicInfo },
        saleInfo: productData.saleInfo,
        mainImages: [
          ...productData.mainImages.map((img) => ({
            ...img,
            file: null,
            type: "existing",
          })),
        ],
        detailImages: [
          ...productData.detailImages.map((img) => ({
            ...img,
            file: null,
            type: "existing",
          })),
        ],
        deliveryPolicy: { ...productData.deliveryPolicy },
        options: [
          ...productData.options.map((o) => ({
            ...o,
            file: null,
            type: "existing",
          })),
        ],
        detailInfo: { ...productData.detailInfo },
      });

      console.log("product : ", productData);
    };
    loadData();
  }, [id]);

  useEffect(() => {
    console.log("productForm : ", productForm);
  }, [productForm]);

  const submitHandler = () => {
    const modify = async () => {
      try {
        const data = await modifyProduct(id, productForm);

        console.log("응답 data :", data);

        alert("상품이 수정되었습니다.");
      } catch (error) {
        console.error("등록 실패:", error);
        alert("상품 수정에 실패했습니다.");
      }
    };
    modify();
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
        <ProductBrandModify
          existingData={productForm?.brand}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, brand: data }))
          }
        />
        <ProductSaleInfoModify
          existingData={productForm?.saleInfo}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, saleInfo: data }))
          }
        />
        <ProductMainImagesModify
          existingData={productForm?.mainImages}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, mainImages: data }))
          }
        />
        <ProductDetailImagesModify
          existingData={productForm?.detailImages}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, detailImages: data }))
          }
        />
        <DeliveryPolicyModify
          existingData={productForm?.deliveryPolicy}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, deliveryPolicy: data }))
          }
        />
        <OptionRegistrationModify
          existingData={productForm?.options}
          onChangeForm={(data) =>
            setProductForm((prev) => ({ ...prev, options: data }))
          }
        />
        <ProductDetailInfoModify
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
              상품 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModifyPage;
