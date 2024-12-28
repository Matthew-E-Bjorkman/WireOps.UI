import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/Product";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8081/Product",
  }),
  endpoints: (builder) => ({
    getProductList: builder.query<Product[], void>({
      query: () => "",
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductListQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productApi;
