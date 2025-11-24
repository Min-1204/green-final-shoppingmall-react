import React from "react";
import { useDispatch } from "react-redux";
import {
  postChangeCartItemAsync,
  getCartItemsAsync,
  deleteCartItemAsync,
} from "../redux/slices/features/cart/cartSlice";
import { clearCart } from "../redux/slices/features/cart/cartSlice";

const useCustomCart = () => {
  const dispatch = useDispatch();
  const refreshCart = (userId) => {
    dispatch(getCartItemsAsync(userId));
    // console.log("refreshCart");
  };
  const changeCart = (cartProductDTO) => {
    dispatch(postChangeCartItemAsync(cartProductDTO));
    // console.log("changeCart");
  };
  const removeItem = (id) => {
    dispatch(deleteCartItemAsync(id));
    // console.log("removeItem");
  };

  return { refreshCart, changeCart, removeItem };
};

export default useCustomCart;
