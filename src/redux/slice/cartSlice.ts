import { createSlice } from "@reduxjs/toolkit";

import { CartInitialState } from "@/types/reducer-types";

const initialState: CartInitialState = {
  cart: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartLoading: (state) => {
      state.isLoading = true;
    },
    cartExist: (state, action) => {
      state.cart = action.payload.cart;
      state.isLoading = false;
    },
    cartNotExist: (state) => {
      state.cart = null;
      state.isLoading = false;
    },
    addToCart: (state, action) => {
      state.cart = action.payload.cart;
      state.isLoading = false;
    },
    updateCartitems: (state, action) => {
      state.cart = action.payload.cart;
      state.isLoading = false;
    },
  },
});

export const { cartLoading, cartExist, cartNotExist, addToCart, updateCartitems } = cartSlice.actions;

export default cartSlice.reducer;
