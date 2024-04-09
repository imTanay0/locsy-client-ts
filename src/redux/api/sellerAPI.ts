import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse, Login } from "@/types/api-types";

const server = import.meta.env.VITE_SERVER;

export const sellerAPI = createApi({
  reducerPath: "sellerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/seller/`,
  }),
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
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

export const { useSellerLoginMutation } = sellerAPI;
