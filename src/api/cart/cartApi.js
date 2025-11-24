import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async (userId) => {
  try {
    const res = await axios.get(`${prefix}/items/${userId}`);
    // console.log("Success getCartItems", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err; //thunk 에러 전파
  }
};
export const postChangeCartItem = async (dto) => {
  try {
    const res = await axios.post(`${prefix}/change`, dto);
    // console.log("Success change", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err;
  }
};

export const deleteCartItem = async (id) => {
  try {
    const res = await axios.delete(`${prefix}/${id}`);
    // console.log("Success delete", res.data);
    return res.data;
  } catch (err) {
    console.error("Axios error", err.response || err);
    throw err;
  }
};

export const deleteAll = async () => {
    try {
      const res = await axios.delete(`${prefix}/delete`)
      console.log(res.data)
      return res.data
    } catch (err) {
      console.error("Axios error", err.response || err)
      throw err;
    }
  }
