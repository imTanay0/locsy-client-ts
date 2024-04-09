import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserReducerInitialState } from "@/types/reducer-types";

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

export const { userExist, userNotExist } = authSlice.actions;

export default authSlice.reducer;
