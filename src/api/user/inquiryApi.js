import axios from "axios";
import { axiosObj } from "./userapi";

const INQUIRY_API = "/api/inquiry";

export const inquiryAddApi = async (inquiryData) => {
  try {
    const response = await axiosObj.post(`${INQUIRY_API}/add`, inquiryData);
    console.log("여기는 1:1문의 API 응답 : ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//prettier-ignore
export const inquiryReadApi = async (loginId) => {
  try {
    const response = await axiosObj.get(`${INQUIRY_API}/getRead`, {  params: { loginId }  });
    console.log("문의목록 조회 : ", response.data);
    return response.data;
  } catch (error) {
    console.log("문의목록 에러 : ", error)
    throw error;
  }
};

//prettier-ignore
export const inquiryModifyApi = async (inquiryId, inquiryData, loginId) => {
  try {
    const response = await axiosObj.put(
      `${INQUIRY_API}/inquiry-modify/${inquiryId}`, inquiryData, { params: { loginId } } );
    console.log("여기는 수정 API : ", response.data);
    return response.data;
  } catch (error) {
    console.log("문의 수정 API 에러 : ", error);
    throw error;
  }
};

//prettier-ignore
export const inquiryDeleteApi = async (inquiryId, loginId) => {
  try {
    const response = await axiosObj.delete(
      `${INQUIRY_API}/inquiry-delete/${inquiryId}`,  {  params: { loginId } } );
    return response.data;
  } catch (error) {
    console.log("문의 삭제 API 에러 : ", error);
    throw error;
  }
};
