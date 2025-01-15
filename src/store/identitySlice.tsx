import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../types/Identity.ts";
import { createSlice } from "@reduxjs/toolkit/react";
import { security } from "../security/security.ts";

export const identitySlice = createSlice({
  name: "identity",
  initialState: {
    userId: "",
    userDetails: {} as User,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const identityApi = createApi({
  reducerPath: "identityApi",
  tagTypes: ["Identity"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev-uwhi4hpgyvx5ddvc.us.auth0.com/api/v2/",
    prepareHeaders: async (headers) => {
      const options = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "vOWc2856Bvlg0ENuykdxLhaT61RTy2lu",
        client_secret:
          "eLgXREdlF6tL9736qHQOCcnY0rgW9BpUaXFrpDJSL0sn86fRBHs3gp0bCPlPB4od",
        audience: "https://dev-uwhi4hpgyvx5ddvc.us.auth0.com/api/v2/",
      });

      var accessToken = await fetch(
        "https://dev-uwhi4hpgyvx5ddvc.us.auth0.com/oauth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: options,
        }
      )
        .then((response) => response.json())
        .then((data) => data.access_token)
        .catch((error) => {
          console.error("Error:", error);
        });

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = identityApi;

export const { setUserId, setUserDetails } = identitySlice.actions;

export default identitySlice.reducer;
