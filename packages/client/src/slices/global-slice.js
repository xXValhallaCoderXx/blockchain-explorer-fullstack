import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isSigninModalOpen: false
};

export const globalSlice = createSlice({
  name: "global-slice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setIsSigninModalOpen: (state, action) => {
      state.isSigninModalOpen = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthenticated, setIsSigninModalOpen } = globalSlice.actions;

export default globalSlice.reducer;
