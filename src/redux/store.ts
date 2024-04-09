import { configureStore } from "@reduxjs/toolkit";

import { buyerAPI } from "./api/buyerAPI";
import { buyerSlice } from "./slice/buyerSlice";
import buyerReducer from "./slice/buyerSlice";

import { authSlice } from "./slice/authSlice";
import authReducer from "./slice/authSlice";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [buyerAPI.reducerPath]: buyerAPI.reducer,
    [authSlice.name]: authReducer,
    [buyerSlice.name]: buyerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(buyerAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
