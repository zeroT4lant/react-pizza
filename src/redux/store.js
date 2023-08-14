import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  //configureStore-создаёт хранилище
  reducer: {
    filter,
    cart,
  },
});
