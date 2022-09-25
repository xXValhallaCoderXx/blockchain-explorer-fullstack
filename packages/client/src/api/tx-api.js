import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionListApi = createApi({
  reducerPath: "tx-list-api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  tagTypes: ["WalletTx"],
  endpoints: (builder) => ({
    getTransactionList: builder.query({
      query: ({ txCount, chainId, addresses }) =>
        `transactions?txCount=${txCount}&chainId=${chainId}&addresses=${addresses}`,
      providesTags: ["WalletTx"],
    }),
    createUserTransactions: builder.mutation({
      query: (body) => {
        return {
          url: `/transactions`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetTransactionListQuery,
  useLazyGetTransactionListQuery,
  useCreateUserTransactionsMutation,
} = transactionListApi;
