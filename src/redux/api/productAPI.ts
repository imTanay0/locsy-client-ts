import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER;

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/product/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "get",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "create",
        method: "POST",
        body: product,
        credentials: "include"
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productAPI;
