import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/point";

export const getActivePoints = async (userId) => {
  const res = await axiosInstance.get(`${prefix}/${userId}`);
  // console.log("getActivePoints 백엔드로 부터 받은 데이터=> ", res.data);
  return res.data;
};

export const earnPoint = async (dto) => {
  const res = await axiosInstance.post(`${prefix}/earn`, dto);
  console.log("earnPoint 백엔드로부터 받은 데이터 => ", res.data);
  return res.data;
};
