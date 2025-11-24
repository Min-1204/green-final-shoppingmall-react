import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCartItem,
  getCartItems,
  postChangeCartItem,
} from "../../../../api/cart/cartApi";

export const getCartItemsAsync = createAsyncThunk(
  "getCartItemsAsync",
  (userId) => {
    return getCartItems(userId);
  }
);
export const postChangeCartItemAsync = createAsyncThunk(
  "postChangeCartItemAsync",
  (cartProductDTO) => {
    return postChangeCartItem(cartProductDTO);
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "deleteCartItemAsync",
  (id) => {
    return deleteCartItem(id);
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: [],
  reducers: {
    // addItem: (state, action) => {
    //   // action.payload = {id, name, qty, price ... }
    //   const existing = state.find(
    //     (item) =>
    //       item.id === action.payload.id &&
    //       item.option_id === action.payload.option_id
    //   );
    //   if (existing) {
    //     existing.qty += action.payload.qty; // 같은 상품이면 수량 증가
    //   } else {
    //     state.push(action.payload); // 새로 담기
    //   }
    // },
    // removeItem: (state, action) => {
    //   return state.filter((item) => item.id !== action.payload);
    // },
    // changeQty: (state, action) => {
    //   const { id, delta } = action.payload;
    //   const item = state.find((item) => item.id === id);
    //   if (item) {
    //     item.qty = Math.max(1, item.qty + delta); // 최소 1개 유지
    //   }
    // },
    clearCart: (state) => {
      return (state = []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        // console.log("getCartItemsAsync fulfilled action", action);
        return action.payload;
      })
      .addCase(postChangeCartItemAsync.fulfilled, (state, action) => {
        // console.log("postChangeCartItemAsync fulfilled action", action);
        return action.payload;
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        // console.log("deleteCartItemAsync fulfilled action", action);
        return action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
