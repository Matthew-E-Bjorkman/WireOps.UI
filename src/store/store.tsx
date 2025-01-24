import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import inventoryReducer, { inventoryApi } from "./inventorySlice";
import identityReducer from "./identitySlice";
import businessReducer, { businessApi } from "./businessSlice";

export const store = configureStore({
  reducer: {
    product: inventoryReducer,
    identity: identityReducer,
    company: businessReducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(inventoryApi.middleware)
      .concat(businessApi.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
