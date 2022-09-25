import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "slices/global-slice";
import { dashboardSlice } from "slices/dashboard-slice";
import { transactionListApi } from "api/tx-api";
import { taggedTxSlice } from "slices/tagged-tx-slice";
export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    dashboard: dashboardSlice.reducer,
    tagged: taggedTxSlice.reducer,
    [transactionListApi.reducerPath]: transactionListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionListApi.middleware),
});
