import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Login, MessageResponse } from "@/types/api-types";

const server = import.meta.env.VITE_SERVER;

export const sellerAPI = createApi({
  reducerPath: "sellerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/seller/`,
  }),
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
    registerSeller: builder.mutation({
      query: (seller) => {
        return {
          url: "register",
          method: "POST",
          body: seller,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          credentials: "include",
        };
      },
    }),
    sellerLogin: builder.mutation<MessageResponse, Login>({
      query: (seller) => ({
        url: "login",
        method: "POST",
        body: seller,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useRegisterSellerMutation, useSellerLoginMutation } = sellerAPI;
