import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/admin/user";

export const userFilterSearch = async (condition, page, size, sort) => {
  const { data } = await axiosInstance.post(`${prefix}/search`, condition, {
    params: { page: page, size: size, sort: sort },
  });
  return data;
};
