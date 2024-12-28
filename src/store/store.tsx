import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import sessionReducer from "./sessionSlice.tsx";
import { productApi } from "./productSlice.tsx";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export default store;
