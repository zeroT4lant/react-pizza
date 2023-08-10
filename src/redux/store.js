import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";

export const store = configureStore({
  //configureStore-создаёт хранилище
  reducer: {
    filter,
  },
});
