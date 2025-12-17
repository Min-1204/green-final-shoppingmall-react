import axios from "axios";
import { axiosInstance } from "../user/axiosIntance";

const prefix = "/api/cart";

export const getCartItems = async (userId) => {
  try {
    const res = await axiosInstance.get(`${prefix}/items/${userId}`);
    // console.log("Success getCartItems", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err; //thunk 에러 전파
  }
};
export const postChangeCartItem = async (dto) => {
  try {
    const res = await axiosInstance.post(`${prefix}/change`, dto);
    // console.log("Success change", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const res = await axiosInstance.delete(`${prefix}/${id}`);
    // console.log("Success delete", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err;
  }
};

export const deleteAllByUserId = async (userId) => {
  try {
    const res = await axiosInstance.delete(`${prefix}/delete/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err;
  }
};
