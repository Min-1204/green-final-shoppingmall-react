import React from "react";
import { useDispatch } from "react-redux";
import {
  postChangeCartItemAsync,
  getCartItemsAsync,
  deleteCartItemAsync,
  deleteAllAsync,
} from "../redux/slices/features/cart/cartSlice";
import { clearCart } from "../redux/slices/features/cart/cartSlice";

const useCustomCart = () => {
  const dispatch = useDispatch();
  const refreshCart = (userId) => {
    return dispatch(getCartItemsAsync(userId)).unwrap();
    // console.log("refreshCart");
  };
  const changeCart = (cartProductDTO) => {
    return dispatch(postChangeCartItemAsync(cartProductDTO)).unwrap();
    // console.log("changeCart");
  };
  const removeItem = (id) => {
    return dispatch(deleteCartItemAsync(id)).unwrap();
    // console.log("removeItem");
  };
  const removeAll = (userId) => {
    return dispatch(deleteAllAsync(userId)).unwrap();
  };

  return { refreshCart, changeCart, removeItem, removeAll };
};

export default useCustomCart;
