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
export const recentSearches = async (userId, guestId) => {
  const { data } = await axios.get(`${prefix}/recent`, {
    params: {
      userId: userId ?? null,
      guestId: guestId ?? null,
    },
  });
  return data;
};

//인기 검색어
export const popularSearches = async () => {
  const { data } = await axios.get(`${prefix}/popular`);
  return data;
};

//검색어 저장
export const searchKeywordAdd = async (keyword, userId, guestId) => {
  await axios.post(`${prefix}/add`, null, {
    params: { keyword, userId: userId ?? null, guestId: guestId ?? null },
  });
};

//최근 검색어 개별 삭제
export const deleteOneRecentKeyword = async (keyword, userId, guestId) => {
  await axios.delete(`${prefix}/recent/one`, {
    params: {
      keyword,
      userId: userId ?? null,
      guestId: guestId ?? null,
    },
  });
};

//최근 검색어 전체 삭제
export const deleteAllRecentKeywords = async (userId, guestId) => {
  await axios.delete(`${prefix}/recent/all`, {
    params: {
      userId: userId ?? null,
      guestId: guestId ?? null,
    },
  });
};
