import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Item } from "../types/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";

interface InventoryState {
  items: Item[];
  selectedItem: Item | null;
  isNewItem: boolean;
}

const initialState: InventoryState = {
  items: [],
  selectedItem: null,
  isNewItem: false,
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
    baseUrl: "https://localhost:8081/Product", //Todo: adjust api
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = (getState() as AppRootState).identity.accessToken;

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItemList: builder.query<Item[], void>({
      query: () => "",
      providesTags: ["Item"],
    }),
    getItemById: builder.query<Item, string>({
      query: (id) => `/${id}`,
    }),
    addItem: builder.mutation<string, Partial<Item>>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventorySlice.actions.setSelectedItem(null));
          dispatch(inventoryApi.endpoints.getItemList.initiate());
        });
      },
    }),
    editItem: builder.mutation<boolean, Partial<Item>>({
      query: (body) => ({
        url: `/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventorySlice.actions.setSelectedItem(null));
          dispatch(inventoryApi.endpoints.getItemList.initiate());
        });
      },
    }),
    deleteItem: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(inventorySlice.actions.setSelectedItem(null));
          dispatch(inventoryApi.endpoints.getItemList.initiate());
        });
      },
    }),
  }),
});

export const {
  useGetItemListQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = inventoryApi;

export const { setItems, setSelectedItem, setIsNewItem, addItem, updateItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
