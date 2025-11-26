import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/features/cart/cartSlice";
import authSlice from "./slices/features/user/authSlice";
import signUpSlice from "./slices/features/user/signUpSlice";

export default configureStore({
  reducer: {
    cartSlice: cartSlice,
    authSlice: authSlice,
    signUpSlice: signUpSlice,
  },
});
