import { createSlice } from "@reduxjs/toolkit/react";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    loggedIn: localStorage.getItem("loggedIn") === "true",
  },
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
      localStorage.setItem("loggedIn", "true");
    },
    logOut: (state) => {
      state.loggedIn = false;
      localStorage.setItem("loggedIn", "false");
    },
  },
});

export const { logIn, logOut } = sessionSlice.actions;

export default sessionSlice.reducer;
