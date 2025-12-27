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
