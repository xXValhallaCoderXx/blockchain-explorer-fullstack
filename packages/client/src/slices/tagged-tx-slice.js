import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddresses: [],
};

export const taggedTxSlice = createSlice({
  name: "taggedTxSlice",
  initialState,
  reducers: {
    setAddressess: (state, action) => {
      state.selectedAddresses = action.payload.addresses;
    },
    addAddress: (state, action) => {
      state.selectedAddresses.push(action.payload);
    },
    removeAddress: (state, action) => {
      state.selectedAddresses = state.selectedAddresses.filter(
        (address) => address !== action.payload
      );
    },
  },
});

export const { setAddressess, removeAddress, addAddress } =
  taggedTxSlice.actions;

export default taggedTxSlice.reducer;
