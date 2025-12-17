import axios from "axios";
import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/categories";

export const fetchCategoryList = async () => {
  const res = await axiosInstance.get(`${prefix}`);
  return res.data;
};
