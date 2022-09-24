import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
};

export const globalSlice = createSlice({
  name: "global-slice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthenticated } = globalSlice.actions;

export default globalSlice.reducer;
