import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, UserUpdateRequest } from "../types/Identity.ts";
import { createSlice } from "@reduxjs/toolkit/react";

export const identitySlice = createSlice({
  name: "identity",
  initialState: {
    userId: "",
    accessToken: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserId, setAccessToken } = identitySlice.actions;

export default identitySlice.reducer;
