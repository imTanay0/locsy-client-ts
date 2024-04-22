import { configureStore } from "@reduxjs/toolkit";

import { buyerAPI } from "./api/buyerAPI";
import buyerReducer, { buyerSlice } from "./slice/buyerSlice";

import { sellerAPI } from "./api/sellerAPI";
import authReducer, { authSlice } from "./slice/authSlice";
import productReducer, { productsSlice } from "./slice/productsSlice";
import { productAPI } from "./api/productAPI";
import cartReducer, { cartSlice } from "./slice/cartSlice";
import addressReducer, { addressSlice } from "./slice/addressSlice";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [buyerAPI.reducerPath]: buyerAPI.reducer,
    [sellerAPI.reducerPath]: sellerAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [authSlice.name]: authReducer,
    [buyerSlice.name]: buyerReducer,
    [productsSlice.name]: productReducer,
    [cartSlice.name]: cartReducer,
    [addressSlice.name]: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(buyerAPI.middleware)
      .concat(sellerAPI.middleware)
      .concat(productAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
