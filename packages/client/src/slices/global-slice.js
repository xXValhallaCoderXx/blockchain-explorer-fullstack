import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isSigninModalOpen: false,
  isRegisterModalOpen: false,
  modals: {
    logout: false
  }
};

export const globalSlice = createSlice({
  name: "global-slice",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setModal: (state, action) => {
      state.modals[action.payload.modal] = action.payload.isOpen;
    },
    setLoginModal: (state, action) => {
      state.isSigninModalOpen = action.payload;
    },
    setRegisterModal: (state, action) => {
      state.isRegisterModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthenticated, setLoginModal, setRegisterModal, setModal } =
  globalSlice.actions;

export default globalSlice.reducer;
