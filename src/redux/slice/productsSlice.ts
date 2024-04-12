import { ProductInititalState } from "@/types/reducer-types";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductInititalState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    getProductsSuccess: (
      state,
      action
    ) => {
      state.isLoading = false;
      state.products = action.payload;
      state.isError = false;
    },
    getProductsFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    createProductStart: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    createProductSuccess: (
      state,
    ) => {
      state.isLoading = false;
      state.isError = false;
    },
    createProductFailure: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
