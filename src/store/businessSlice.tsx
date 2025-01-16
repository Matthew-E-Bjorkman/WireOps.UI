import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Company } from "../types/Company.ts";
import { createSlice } from "@reduxjs/toolkit/react";
import { security } from "../security/security.ts";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    company: {} as Company,
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const businessApi = createApi({
  reducerPath: "businessApi",
  tagTypes: ["Company"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:8101/",
    prepareHeaders: async (headers) => {
      const options = {
        authorizationParams: {
          audience: "https://localhost:8101/",
          scope: "write:company",
        },
      };
      const accessToken = await security.getAccessTokenSilently()(options);

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCompanyById: builder.query<Company, string>({
      query: (id) => `company/${id}`,
    }),
    addCompany: builder.mutation<string, Partial<Company>>({
      query: (body) => ({
        url: "company",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    editCompany: builder.mutation<boolean, Partial<Company>>({
      query: (body) => ({
        url: `company/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Company"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setCompany(result));
        });
      },
    }),
  }),
});

export const {
  useGetCompanyByIdQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
} = businessApi;

export const { setCompany } = businessSlice.actions;

export default businessSlice.reducer;
