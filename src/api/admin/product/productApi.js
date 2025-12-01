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
          detailInfo: productForm?.detailInfo,
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

  for (var i = 0; i < productForm?.detailImages?.length; i++) {
    formData.append("detailImages", productForm?.detailImages?.[i]);
  }

  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.post(`${prefix}`, formData, header);
  return res.data;
};

export const modifyProduct = async (id, productForm) => {
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
          // options: productForm?.options.map((option) => ({
          //   ...option,
          //   image: null,
          // })),
          deliveryPolicy: productForm?.deliveryPolicy,
          detailInfo: productForm?.detailInfo,
        }),
      ],
      { type: "application/json" }
    )
  );

  // for (var i = 0; i < productForm?.options.length; i++) {
  //   formData.append("optionImages", productForm?.options[i].image);
  // }

  // 이미지파일과 url 을 별도로 보내라고 한다.
  // thumbnailImage 가 파일일 수도 있고, url 일수도 있다 어떻게 처리해서 보내지?
  // mainImages 들이 url 과 File 이 섞여 있다. 별도로 보내면 서버에서 순서를 어떻게 구분하지?

  // formData.append("mainImages", productForm.mainImages.thumbnailImage?.file instanceof File ?
  //   productForm.mainImages.thumbnailImage.file : productForm.mainImages.thumbnailImage.imageUrl
  // );

  // for (var i = 0; i < productForm?.mainImages?.galleryImages.length; i++) {
  //   formData.append("mainImages", productForm?.mainImages?.galleryImages[i]?.file instanceof File ?
  //     productForm?.mainImages?.galleryImages[i]?.file : productForm?.mainImages?.galleryImages[i]?.imageUrl

  //   );
  // }

  // for (var i = 0; i < productForm?.detailImages?.length; i++) {
  //   formData.append("detailImages", productForm?.detailImages?.[i]);
  // }

  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${prefix}/${id}`, formData, header);
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

export const fetchProductById = async (id) => {
  const res = await axios.get(`${prefix}/${id}`);
  console.log(res.data);
  return res.data;
};

export const searchProductsByCondition = async (condition) => {
  const res = await axios.post(`${prefix}/search`, condition);
  return res.data;
};
