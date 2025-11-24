import axios from "axios";
import { API_SERVER_HOST } from "../product/productApi";

const prefix = `${API_SERVER_HOST}/api/categories`;

export const getCategoryList = async () => {
  const res = await axios.get(`${prefix}`);
  return res.data;
};
