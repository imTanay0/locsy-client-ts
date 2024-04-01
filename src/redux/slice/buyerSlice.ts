import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BuyerReducerInitialState } from "@/types/reducer-types";

export const initialState: BuyerReducerInitialState = {
  user: null,
  buyer: null,
  role: null,
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const buyerSlice = createSlice({
  name: "buyer",
  initialState,
  reducers: {
    buyerLoginStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    buyerLoginSuccess: (
      state,
      action: PayloadAction<BuyerReducerInitialState>
    ) => {
      state.user = action.payload.user;
      state.buyer = action.payload.role;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;
    },
    buyerLoginFailure: (state, action) => {
      state.user = null;
      state.buyer = null;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
    },

    buyerExist: (state, action: PayloadAction<BuyerReducerInitialState>) => {
      state.user = action.payload.user;
      state.buyer = action.payload.buyer;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    buyerNotExist: (state) => {
      state.user = null;
      state.buyer = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  buyerLoginStart,
  buyerLoginFailure,
  buyerLoginSuccess,
  buyerExist,
  buyerNotExist,
} = buyerSlice.actions;

export default buyerSlice.reducer;
