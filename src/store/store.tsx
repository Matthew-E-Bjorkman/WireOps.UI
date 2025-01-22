import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import productReducer, { productApi } from "./productSlice.tsx";
import identityReducer from "./identitySlice.tsx";
import businessReducer, { businessApi } from "./businessSlice.tsx";

export const store = configureStore({
  reducer: {
    product: productReducer,
    identity: identityReducer,
    company: businessReducer,
    [productApi.reducerPath]: productApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(businessApi.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
