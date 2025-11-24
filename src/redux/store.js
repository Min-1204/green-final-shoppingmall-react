import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/features/cart/cartSlice";
import userSlice from "./slices/features/user/userSlice";
import signUpSlice from "./slices/features/user/signUpSlice";

export default configureStore({
  reducer: {
    cartSlice: cartSlice,
    userSlice: userSlice,
    signUpSlice: signUpSlice,
  },
});
