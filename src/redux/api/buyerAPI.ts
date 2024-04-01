import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse } from "@/types/api-types";
import { Login } from "@/types/types";

const server = import.meta.env.VITE_SERVER;

export const buyerAPI = createApi({
  reducerPath: "buyerAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/buyer/`,
  }),
  tagTypes: ["Buyer"],
  endpoints: (builder) => ({
    buyerLogin: builder.mutation<MessageResponse, Login>({
      query: (buyer) => ({
        url: "login",
        method: "POST",
        body: buyer,
      }),
    }),
  }),
});

export const { useBuyerLoginMutation } = buyerAPI;
