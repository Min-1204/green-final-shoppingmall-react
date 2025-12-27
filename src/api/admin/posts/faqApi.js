import { axiosInstance } from "../../user/axiosIntance";

const FAQ_API = "/api/admin/posts";

export const faqListApi = async () => {
  try {
    const response = await axiosInstance.get(`${FAQ_API}/list`);
    console.log("FAQ 목록 조회 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("FAQ 목록 조회 API 에러:", error);
    throw error;
  }
};

export const faqAddApi = async (faqData) => {
  try {
    const response = await axiosInstance.post(`${FAQ_API}/add`, faqData);
    console.log("FAQ 추가 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("FAQ 추가 API 에러:", error);
    throw error;
  }
};

export const faqModifyApi = async (faqId, faqData) => {
  try {
    const response = await axiosInstance.put(
      `${FAQ_API}/modify/${faqId}`,
      faqData
    );
    console.log("FAQ 수정 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("FAQ 수정 API 에러:", error);
    throw error;
  }
};

export const faqDeleteApi = async (faqId) => {
  try {
    const response = await axiosInstance.delete(`${FAQ_API}/delete/${faqId}`);
    console.log("FAQ 삭제 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("FAQ 삭제 API 에러:", error);
    throw error;
  }
};
