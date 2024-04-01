import { BuyerReducerInitialState } from "@/types/reducer-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/types/types";

const initialState: BuyerReducerInitialState = {
  user: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "buyerReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // state.role = action.payload.role;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    userNotExist: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { userExist, userNotExist } = authSlice.actions;
