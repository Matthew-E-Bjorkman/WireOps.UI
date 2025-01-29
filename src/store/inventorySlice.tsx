import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Item } from "../types/Inventory/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";

interface InventoryState {
  items: Item[];
  selectedItem: Item | null;
  isNewItem: boolean;
  isEditingItem: boolean;
}

const initialState: InventoryState = {
  items: [],
  selectedItem: null,
  isNewItem: false,
  isEditingItem: false,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<Item | null>) {
      state.selectedItem = action.payload;
    },
    setIsNewItem(state, action: PayloadAction<boolean>) {
      state.isNewItem = action.payload;
    },
    setIsEditingItem(state, action: PayloadAction<boolean>) {
      state.isEditingItem = action.payload;
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  tagTypes: ["Item"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_INVENTORY_API_SERVER_URL,
    prepareHeaders: async (headers, { getState }) => {
      const access_token = (getState() as AppRootState).identity.access_token;

      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/product",
      providesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventorySlice.actions.setItems(result.data));
        });
      },
    }),
    getItemById: builder.query<Item, string>({
      query: (id) => `/product/${id}`,
    }),
    addItem: builder.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventoryApi.endpoints.getItems.initiate());
        });
      },
    }),
    editItem: builder.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: `/product/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventoryApi.endpoints.getItems.initiate());
        });
      },
    }),
    deleteItem: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventorySlice.actions.setSelectedItem(null));
          dispatch(inventoryApi.endpoints.getItems.initiate());
        });
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = inventoryApi;

export const {
  setItems,
  setSelectedItem,
  setIsNewItem,
  setIsEditingItem,
  addItem,
  updateItem,
} = inventorySlice.actions;

export default inventorySlice.reducer;
