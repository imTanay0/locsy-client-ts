import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
  address: null,
  isLoading: false,
  isError: false,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: inititalState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    removeAddress: (state) => {
      state.address = null;
    },
  },
});

export const { setAddress, removeAddress } = addressSlice.actions;

export default addressSlice.reducer;
