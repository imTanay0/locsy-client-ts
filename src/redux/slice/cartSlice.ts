import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartExist: (state, action) => {
      state.cart = action.payload.cart;
      state.isLoading = false;
    },
    cartNotExist: (state) => {
      state.cart = null;
      state.isLoading = false;
    },
  },
});

export const { cartExist, cartNotExist } = cartSlice.actions;

export default cartSlice.reducer;
