import axios from "axios";
import { API_SERVER_HOST } from "../product/productApi";

const prefix = `${API_SERVER_HOST}/api/brands`;

export const getBrandList = async () => {
  const res = await axios.get(`${prefix}`);
  return res.data;
};
