import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserReducerInitialState } from "@/types/reducer-types";
import { MessageResponse } from "@/types/api-types";

const initialState: UserReducerInitialState = {
  user: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<MessageResponse>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.role = null;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.message = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<MessageResponse>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.isError = false;
    },
    registerFailure: (state) => {
      state.user = null;
      state.role = null;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.isSuccess = false;
    },
    userExist: (state, action: PayloadAction<UserReducerInitialState>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    userNotExist: (state) => {
      state.user = null;
      state.role = null;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  userExist,
  userNotExist,
} = authSlice.actions;

export default authSlice.reducer;
