import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

export const registerProduct = async (productForm) => {
  const formData = new FormData();
  formData.append(
    "product",
    new Blob(
      [
        JSON.stringify({
          category: productForm?.category,
          brand: productForm?.brand,
          basicInfo: productForm?.basicInfo,
          saleInfo: productForm?.saleInfo,
          options: productForm?.options.map((option) => ({
            ...option,
            image: null,
          })),
          deliveryPolicy: productForm?.deliveryPolicy,
          // todo : 제품 상세 이미지 (여러장)
          // todo : 상품 정보 공고 고시
        }),
      ],
      { type: "application/json" }
    )
  );

  for (var i = 0; i < productForm?.options.length; i++) {
    formData.append("optionImages", productForm?.options[i].image);
  }

  formData.append("mainImages", productForm.mainImages.thumbnailImage);

  for (var i = 0; i < productForm?.mainImages?.galleryImages.length; i++) {
    formData.append("mainImages", productForm?.mainImages?.galleryImages[i]);
  }

  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${prefix}`, formData, header);
  return res.data;
};

export const fetchProductsByThirdCategoryIds = async (thirdCategoryIds) => {
  const res = await axios.get(`${prefix}`, {
    params: {
      categoryId: thirdCategoryIds,
    },
  });
  return res.data;
};
