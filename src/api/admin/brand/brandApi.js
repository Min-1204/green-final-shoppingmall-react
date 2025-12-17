import axios from "axios";
import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/brands";

export const getBrandList = async () => {
  const res = await axiosInstance.get(`${prefix}`);
  return res.data;
};
