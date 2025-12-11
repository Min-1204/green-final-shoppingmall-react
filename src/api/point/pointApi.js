import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/point`;

export const getActivePoints = async (userId) => {
  const res = await axios.get(`${prefix}/${userId}`);
  console.log("getActivePoints 백엔드로 부터 받은 데이터=> ", res.data);
  return res.data;
};
