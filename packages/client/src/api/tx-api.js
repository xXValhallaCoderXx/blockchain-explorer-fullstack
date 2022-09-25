import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionListApi = createApi({
  reducerPath: "tx-list-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = window.localStorage.getItem("jwt-token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  tagTypes: ["WalletTx", "UserTx"],
  endpoints: (builder) => ({
    getTransactionList: builder.query({
      query: ({ txCount, chainId, addresses }) =>
        `transactions?txCount=${txCount}&chainId=${chainId}&addresses=${addresses}`,
      providesTags: ["WalletTx"],
    }),
    createUserTransactions: builder.mutation({
      query: (body) => {
        return {
          url: `/user-transactions/bulk`,
          method: "POST",
          body,
        };
      },
    }),
    getTaggedTx: builder.query({
      query: () => `/user-transactions`,
      providesTags: ["UserTx"],
    }),
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body,
        };
      },
    }),
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/login`,
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
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetTaggedTxQuery
} = transactionListApi;
