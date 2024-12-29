import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import sessionReducer from "./sessionSlice.tsx";
import productReducer, { productApi } from "./productSlice.tsx";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export default store;
