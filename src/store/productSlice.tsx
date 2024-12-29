import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/Product";
import { createSlice } from "@reduxjs/toolkit/react";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    showCreateModal: false,
    showEditModal: false,
    showConfirmModal: false,
    selectedProduct: {} as Product,
  },
  reducers: {
    setShowCreateModal: (state, action) => {
      state.showCreateModal = action.payload;
    },
    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    setShowConfirmModal: (state, action) => {
      state.showConfirmModal = action.payload;
    },
    updateSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8081/Product",
  }),
  endpoints: (builder) => ({
    getProductList: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),
    addProduct: builder.mutation<string, Partial<Product>>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(productSlice.actions.updateSelectedProduct({}));
          dispatch(productApi.endpoints.getProductList.initiate());
        });
      },
    }),
    editProduct: builder.mutation<boolean, Partial<Product>>({
      query: (body) => ({
        url: `/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(productSlice.actions.updateSelectedProduct({}));
          dispatch(productApi.endpoints.getProductList.initiate());
        });
      },
    }),
    deleteProduct: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(productSlice.actions.updateSelectedProduct({}));
          dispatch(productApi.endpoints.getProductList.initiate());
        });
      },
    }),
  }),
});

export const {
  useGetProductListQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;

export const {
  setShowCreateModal,
  setShowEditModal,
  setShowConfirmModal,
  updateSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
