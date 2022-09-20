import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "../slices/global-slice";
import { transactionListApi } from "../api/tx-api";
export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    [transactionListApi.reducerPath]: transactionListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionListApi.middleware),
});
