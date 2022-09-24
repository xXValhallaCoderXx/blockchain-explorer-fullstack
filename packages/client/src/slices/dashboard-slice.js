import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModalOpen: false,
  txCount: 5,
  chainId: 250,
  selectedAddresses: [],
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setIsAddModalOpen: (state, action) => {
      state.isAddModalOpen = action.payload.isOpen;
    },
    setTxCount: (state, action) => {
      state.txCount = action.payload.txCount;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload.chainId;
    },
    setAddressess: (state, action) => {
      state.selectedAddresses = action.payload.addresses;
    },
    addAddress: (state, action) => {
      state.selectedAddresses.push(action.payload)
    },
    removeAddress: (state, action) => {
      state.selectedAddresses = state.selectedAddresses.filter(
        (address) => address !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsAddModalOpen,
  setTxCount,
  setChainId,
  setAddressess,
  removeAddress,
  addAddress,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
