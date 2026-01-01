import { axiosInstance } from "../../user/axiosIntance";

const ADMIN_INQUIRY_API = "/api/admin/posts";

export const getAdminInquiries = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.status && filters.status !== "ALL") {
      params.append("status", filters.status);
    }

    if (filters.type && filters.type !== "전체") {
      params.append("type", filters.type);
    }

    if (filters.keyword && filters.keyword.trim() !== "") {
      params.append("keyword", filters.keyword.trim());
    }

    const response = await axiosInstance.get(`${ADMIN_INQUIRY_API}/inquiries`, {
      params: filters
    });

    return response.data;
  } catch (error) {
    console.log("catch 문의 목록 조회 실패 : ", error);
    throw error;
  }
};

export const createAnswer = async (inquiryId, answerContent) => {
  try {
    const response = await axiosInstance.post(
      `${ADMIN_INQUIRY_API}/inquiries/${inquiryId}/answer`,
      { answerContent }
    );
    return response.data;
  } catch (error) {
    console.error("답변 등록 실패:", error);
    throw error;
  }
};

export const updateAnswer = async (inquiryId, answerContent) => {
  try {
    const response = await axiosInstance.put(
      `${ADMIN_INQUIRY_API}/inquiries/${inquiryId}/answer`,
      { answerContent }
    );
    return response.data;
  } catch (error) {
    console.error("답변 수정 실패:", error);
    throw error;
  }
};

export const deleteInquiry = async (inquiryId) => {
  try {
    await axiosInstance.delete(`${ADMIN_INQUIRY_API}/inquiries/${inquiryId}`);
    return { success: true };
  } catch (error) {
    console.error("문의 삭제 실패:", error);
    throw error;
  }
};
