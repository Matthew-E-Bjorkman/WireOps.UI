import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/Product";
import { createSlice } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    showCreateModal: false,
    showEditModal: false,
    showConfirmModal: false,
    selectedProduct: {} as Product,
  },
  reducers: {
    setShowCreateModal: (state, action) => {
      state.showCreateModal = action.payload;
      if (!action.payload) {
        state.selectedProduct = {} as Product;
      }
    },
    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
      if (!action.payload) {
        state.selectedProduct = {} as Product;
      }
    },
    setShowConfirmModal: (state, action) => {
      state.showConfirmModal = action.payload;
    },
    updateSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8081/Product",
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = (getState() as AppRootState).identity.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
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
          dispatch(inventorySlice.actions.updateSelectedProduct({}));
          dispatch(inventoryApi.endpoints.getProductList.initiate());
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
          dispatch(inventorySlice.actions.updateSelectedProduct({}));
          dispatch(inventoryApi.endpoints.getProductList.initiate());
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
          dispatch(inventorySlice.actions.updateSelectedProduct({}));
          dispatch(inventoryApi.endpoints.getProductList.initiate());
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
} = inventoryApi;

export const {
  setShowCreateModal,
  setShowEditModal,
  setShowConfirmModal,
  updateSelectedProduct,
} = inventorySlice.actions;

export default inventorySlice.reducer;
