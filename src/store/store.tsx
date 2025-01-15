import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import productReducer, { productApi } from "./productSlice.tsx";
import identityReducer, { identityApi } from "./identitySlice.tsx";

export const store = configureStore({
  reducer: {
    product: productReducer,
    identity: identityReducer,
    [productApi.reducerPath]: productApi.reducer,
    [identityApi.reducerPath]: identityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(identityApi.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
