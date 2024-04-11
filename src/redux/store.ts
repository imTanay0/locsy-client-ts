import { configureStore } from "@reduxjs/toolkit";

import { buyerAPI } from "./api/buyerAPI";
import buyerReducer, { buyerSlice } from "./slice/buyerSlice";

import { sellerAPI } from "./api/sellerAPI";
import authReducer, { authSlice } from "./slice/authSlice";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [buyerAPI.reducerPath]: buyerAPI.reducer,
    [sellerAPI.reducerPath]: sellerAPI.reducer,
    [authSlice.name]: authReducer,
    [buyerSlice.name]: buyerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(buyerAPI.middleware).concat(sellerAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
