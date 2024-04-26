import { createSlice } from "@reduxjs/toolkit";

import { SellerOrders } from "@/types/reducer-types";

const initialState: SellerOrders = {
  isLoading: false,
  orders: [],
};

export const sellerOrdersSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {
    loadingSellerOrders: (state) => {
      state.isLoading = true;
    },
    setSellerOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    removeSellerOrders: (state) => {
      state.orders = [];
      state.isLoading = false;
    },
    completeSellerOrders: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  loadingSellerOrders,
  setSellerOrders,
  removeSellerOrders,
  completeSellerOrders,
} = sellerOrdersSlice.actions;

export default sellerOrdersSlice.reducer;
