import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice.tsx";

export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});
