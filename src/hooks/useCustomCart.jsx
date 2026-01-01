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
    dispatch(getCartItemsAsync(userId));
    // console.log("refreshCart");
  };
  const changeCart = (cartProductDTO) => {
    return dispatch(postChangeCartItemAsync(cartProductDTO)).unwrap();
    // console.log("changeCart");
  };
  const removeItem = (id) => {
    dispatch(deleteCartItemAsync(id));
    // console.log("removeItem");
  };
  const removeAll = (userId) => {
    dispatch(deleteAllAsync(userId));
  };

  return { refreshCart, changeCart, removeItem, removeAll };
};

export default useCustomCart;
