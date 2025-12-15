import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/search`;

//상품 검색
export const searchProductList = async (keyword) => {
  const { data } = await axios.get(`${prefix}/product`, {
    params: { keyword: keyword },
  });
  return data;
};

//최근 검색어
export const recentSearches = async (userId) => {
  const { data } = await axios.get(`${prefix}/recent`, {
    params: { userId: userId },
  });
  return data;
};

//인기 검색어
export const popularSearches = async () => {
  const { data } = await axios.get(`${prefix}/popular`);
  return data;
};

//검색어 저장
export const searchKeywordAdd = async (keyword, userId) => {
  await axios.post(`${prefix}/add`, null, {
    params: userId
      ? { keyword: keyword, userId: userId }
      : { keyword: keyword },
  });
};
