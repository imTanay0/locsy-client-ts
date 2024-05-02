import { configureStore } from "@reduxjs/toolkit";

import { buyerAPI } from "./api/buyerAPI";

import { productAPI } from "./api/productAPI";
import { sellerAPI } from "./api/sellerAPI";
import addressReducer, { addressSlice } from "./slice/addressSlice";
import authReducer, { authSlice } from "./slice/authSlice";
import cartReducer, { cartSlice } from "./slice/cartSlice";
import productReducer, { productsSlice } from "./slice/productsSlice";
import sellerOrdersReducer, {
  sellerOrdersSlice,
} from "./slice/sellerOrdersSlice";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [buyerAPI.reducerPath]: buyerAPI.reducer,
    [sellerAPI.reducerPath]: sellerAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [authSlice.name]: authReducer,
    [productsSlice.name]: productReducer,
    [cartSlice.name]: cartReducer,
    [addressSlice.name]: addressReducer,
    [sellerOrdersSlice.name]: sellerOrdersReducer,
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
