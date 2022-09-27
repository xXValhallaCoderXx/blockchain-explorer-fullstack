import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { store } from "../config/store";
import { globalSlice } from "../slices/global-slice";
// Define a service using a base URL and expected endpoints
// const baseQuery = fetchBaseQuery({
//   baseUrl: `${Constants.manifest.extra.baseUrl}/api/v1`,
//   prepareHeaders: async (headers) => {
//     // If we have a token set in state, let's assume that we should be passing it.
//     const jwtToken = await AsyncStorage.getItem("@producto-jwt-token");
//     if (jwtToken) {
//       headers.set("authorization", `Bearer ${jwtToken}`);
//     }
//     headers.set("Content-Type", "application/json");
//     return headers;
//   },
// });

const customBaseQuery = async (args, api, extraOptions) => {
  let result;
  try {
    result = await baseQuery(args, api, extraOptions);

    // const isAuthenticated = api.getState().global.isAuthenticated;

    // Handle unauthorized
    if (result.meta.response.status === 401) {
   
      api.dispatch(
        globalSlice.actions.setIsAuthenticated(false)
      );
    }

    return result;
  } catch (err) {
    return err;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = window.localStorage.getItem("jwt-token");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const transactionListApi = createApi({
  reducerPath: "tx-list-api",
  baseQuery: customBaseQuery,
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
  tagTypes: ["WalletTx", "UserTx"],
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const transactionListApi = createApi({
//   reducerPath: "tx-list-api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const accessToken = window.localStorage.getItem("jwt-token");
    //   if (accessToken) {
    //     headers.set("authorization", `Bearer ${accessToken}`);
    //   }
    //   return headers;
    // },
//   }),

//   tagTypes: ["WalletTx", "UserTx"],
// endpoints: (builder) => ({
//   getTransactionList: builder.query({
//     query: ({ txCount, chainId, addresses }) =>
//       `transactions?txCount=${txCount}&chainId=${chainId}&addresses=${addresses}`,
//     providesTags: ["WalletTx"],
//   }),
//   createUserTransactions: builder.mutation({
//     query: (body) => {
//       return {
//         url: `/user-transactions/bulk`,
//         method: "POST",
//         body,
//       };
//     },
//   }),
//   getTaggedTx: builder.query({
//     query: () => `/user-transactions`,
//     providesTags: ["UserTx"],
//   }),
//   registerUser: builder.mutation({
//     query: (body) => {
//       return {
//         url: `/auth/register`,
//         method: "POST",
//         body,
//       };
//     },
//   }),
//   loginUser: builder.mutation({
//     query: (body) => {
//       return {
//         url: `/auth/login`,
//         method: "POST",
//         body,
//       };
//     },
//   }),
// }),
// });

export const {
  useGetTransactionListQuery,
  useLazyGetTransactionListQuery,
  useCreateUserTransactionsMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetTaggedTxQuery
} = transactionListApi;
