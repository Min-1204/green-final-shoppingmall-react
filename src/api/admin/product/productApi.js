import axios from "axios";
import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/products";

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
            image: null
          })),
          deliveryPolicy: productForm?.deliveryPolicy,
          detailInfo: productForm?.detailInfo
        })
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

  for (var i = 0; i < productForm?.detailImages?.length; i++) {
    formData.append("detailImages", productForm?.detailImages?.[i]);
  }

  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axiosInstance.post(`${prefix}`, formData, header);
  return res.data;
};

export const modifyProduct = async (id, productForm) => {
  const formData = new FormData();

  // 이미지 순서, url 정보 만들기
  const mainImagesOrderData = productForm.mainImages.map((img) => ({
    type: img.type,
    imageUrl: img.type === "existing" ? img.imageUrl : null,
    displayOrder: img.displayOrder,
    imageType: img.imageType
  }));

  const detailImagesOrderData = productForm.detailImages.map((img) => ({
    type: img.type,
    imageUrl: img.type === "existing" ? img.imageUrl : null,
    displayOrder: img.displayOrder
  }));

  const optionsOrderData = productForm.options.map((o) => ({
    ...o,
    file: null
  }));

  formData.append(
    "product",
    new Blob(
      [
        JSON.stringify({
          category: productForm?.category,
          brand: productForm?.brand,
          basicInfo: productForm?.basicInfo,
          saleInfo: productForm?.saleInfo,
          deliveryPolicy: productForm?.deliveryPolicy,
          detailInfo: productForm?.detailInfo,
          mainImages: mainImagesOrderData,
          detailImages: detailImagesOrderData,
          options: optionsOrderData
        })
      ],
      { type: "application/json" }
    )
  );

  // 이미지 파일 담기
  for (const img of productForm.mainImages.filter(
    (img) => img.type === "new"
  )) {
    formData.append(`mainImageFile-${img.displayOrder}`, img?.file);
  }

  for (const img of productForm.detailImages.filter(
    (img) => img.type === "new"
  )) {
    formData.append(`detailImageFile-${img.displayOrder}`, img?.file);
  }

  productForm.options
    .filter((o) => o.type === "new")
    .forEach((o) => {
      formData.append(`optionImageFile-${o.displayOrder}`, o?.file);
    });

  // const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axiosInstance.put(`${prefix}/${id}`, formData);
  return res.data;
};

export const fetchProductsByThirdCategoryIds = async ({
  thirdCategoryIds,
  brandId,
  page,
  size,
  sort
}) => {
  const params = new URLSearchParams();

  thirdCategoryIds?.forEach((id) => {
    params.append("categoryId", id);
  });
  params.append("brandId", brandId || 0);
  params.append("page", page || 1);
  params.append("size", size || 24);
  params.append("sort", sort || "latest");

  const url = `${prefix}?${params.toString()}`;
  const res = await axiosInstance.get(url);

  return res.data;
};

export const fetchBrandsByThirdCategoryIds = async ({ thirdCategoryIds }) => {
  const params = new URLSearchParams();
  thirdCategoryIds?.forEach((id) => {
    params.append("categoryId", id);
  });

  const url = `${prefix}/brands?${params.toString()}`;
  const res = await axios.get(url);

  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axiosInstance.get(`${prefix}/${id}`);
  console.log(res.data);
  return res.data;
};

export const searchProductsByCondition = async (condition, page, size) => {
  const res = await axiosInstance.post(
    `${prefix}/search?page=${page}&size=${size}`,
    condition
  );
  return res.data;
};

export const restockOption = async (updatedOptions) => {
  const res = await axiosInstance.patch(
    `${API_SERVER_HOST}/api/product_options/restock`,
    updatedOptions
  );
  return res.data;
};

export const applyRestockAlarm = async (userId, optionId) => {
  const res = await axios.post(`${API_SERVER_HOST}/api/restock-notification`, {
    userId,
    optionId
  });
  return res.data;
};
