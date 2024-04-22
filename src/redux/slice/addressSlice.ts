import { createSlice } from "@reduxjs/toolkit";

import { AddressInitialState } from "@/types/reducer-types";

const inititalState: AddressInitialState = {
  address: null,
  isLoading: false,
  contactNo: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: inititalState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload.address;
      state.contactNo = action.payload.contactNo;
    },
    removeAddress: (state) => {
      state.address = null;
      state.contactNo = null;
    },
  },
});

export const { setAddress, removeAddress } = addressSlice.actions;

export default addressSlice.reducer;
