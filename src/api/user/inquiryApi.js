import axios from "axios";
import { API_SERVER } from "./userapi";

const host = API_SERVER;
const INQUIRY_API = `${host}/api/inquiry`;

export const inquiryAddApi = async (inquiryData) => {
  try {
    const response = await axios.post(`${INQUIRY_API}/add`, inquiryData);
    console.log("여기는 1:1문의 API 응답 : ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
