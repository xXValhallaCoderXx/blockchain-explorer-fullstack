import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModalOpen: false,
  txCount: 5,
  chainId: 250,
  addresses: [],
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setIsAddModalOpen: (state, action) => {
      state.isAddModalOpen = action.payload.isOpen;
    },
    setTxCount: (state, action) => {
      console.log("ACTION: ", action);
      state.txCount = action.payload.txCount;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload.chainId;
    },
    setAddressess: (state, action) => {
      state.addresses = action.payload.addresses;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAddModalOpen, setTxCount, setChainId, setAddressess } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
