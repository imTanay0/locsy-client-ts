import { configureStore } from "@reduxjs/toolkit";

import { buyerAPI } from "./api/buyerAPI";
import { buyerSlice } from "./slice/buyerSlice";
import buyerReducer from "./slice/buyerSlice";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [buyerAPI.reducerPath]: buyerAPI.reducer,
    [buyerSlice.name]: buyerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
