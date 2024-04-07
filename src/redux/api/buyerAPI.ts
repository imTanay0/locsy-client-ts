import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { LoginBuyer, MessageResponse, RegisterBuyer } from "@/types/api-types";

const server = import.meta.env.VITE_SERVER;

export const buyerAPI = createApi({
  reducerPath: "buyerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/buyer/`,
  }),
  tagTypes: ["Buyer"],
  endpoints: (builder) => ({
    buyerCreate: builder.mutation<MessageResponse, RegisterBuyer>({
      query: (buyer) => ({
        url: "register",
        method: "POST",
        body: buyer,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    buyerLogin: builder.mutation<MessageResponse, LoginBuyer>({
      query: (buyer) => ({
        url: "login",
        method: "POST",
        body: buyer,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useBuyerCreateMutation, useBuyerLoginMutation } = buyerAPI;
