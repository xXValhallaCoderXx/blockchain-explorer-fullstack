import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionListApi = createApi({
  reducerPath: "tx-list-api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    getTransactionList: builder.query({
      query: ({ txCount, chainId, addresses }) =>
        `transactions?txCount=${txCount}&chainId=${chainId}&addresses=${addresses}`,
    }),
  }),
});

export const { useGetTransactionListQuery } = transactionListApi;
