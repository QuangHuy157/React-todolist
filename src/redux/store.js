import { configureStore } from "@reduxjs/toolkit";
import totoReducer from "../redux/slice/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: totoReducer,
  },
});
