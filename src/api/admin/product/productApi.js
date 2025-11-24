import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/products`;

export const registerProduct = async (productForm) => {
  const product = {
    category: productForm?.category,
    brand: productForm?.brand,
    basicInfo: productForm?.basicInfo,
    saleInfo: productForm?.saleInfo,
    options: productForm?.options,
    deliveryPolicy: productForm?.deliveryPolicy,
  };

  console.log("product : ", product);
  const header = { headers: { "Content-Type": "application/json" } };
  const res = await axios.post(`${prefix}`, product, header);
  console.log("backend 로 부터 온 데이터 ", res);
  return res.data;
};
