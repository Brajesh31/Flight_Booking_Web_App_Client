import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./Slices/paymentSlice"
import userReducer from "./Slices/userSlice"

const store = configureStore({
  reducer: {
    payment : paymentReducer,
    user : userReducer
  },
});

export default store;
