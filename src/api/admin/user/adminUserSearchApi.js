import { axiosInstance } from "../../user/axiosIntance";

const prefix = "/api/admin/user";

export const userFilterSearch = async (condition) => {
  const { data } = await axiosInstance.post(`${prefix}/search`, condition);
  console.log("관리자 회원관리-회원조회 users=> ", data);
  return data;
};
