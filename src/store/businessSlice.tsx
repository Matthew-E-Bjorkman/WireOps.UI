import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Company } from "../types/Business/Company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";
import {
  Staffer,
  StafferGetParams,
  StafferLinkToUserRequest,
  StafferRequest,
} from "../types/Business/Staffer";

interface BusinessState {
  company: Company | null;
  staffers: Staffer[];
  current_staffer: Staffer | null;
  selected_staffer: Staffer | null;
  is_new_staffer: boolean;
}

const initialState: BusinessState = {
  company: null,
  staffers: [],
  current_staffer: null,
  selected_staffer: null,
  is_new_staffer: false,
};

export const businessSlice = createSlice({
  name: "business",
  initialState: initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company | null>) => {
      state.company = action.payload;
    },
    setStaffers: (state, action: PayloadAction<Staffer[]>) => {
      state.staffers = action.payload;
    },
    setCurrentStaffer: (state, action: PayloadAction<Staffer | null>) => {
      state.current_staffer = action.payload;
    },
    setSelectedStaffer: (state, action: PayloadAction<Staffer | null>) => {
      state.selected_staffer = action.payload;
    },
    setIsNewStaffer: (state, action: PayloadAction<boolean>) => {
      state.is_new_staffer = action.payload;
    },
  },
});

export const businessApi = createApi({
  reducerPath: "businessApi",
  tagTypes: ["Company", "Staffer"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BUSINESS_API_SERVER_URL,
    prepareHeaders: async (headers, { getState }) => {
      const access_token = (getState() as AppRootState).identity.access_token;

      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //Company endpoints
    getCompanyById: builder.query<Company, string>({
      query: (id) => `company/${id}`,
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setCompany(result.data));
          dispatch(businessApi.endpoints.getStaffers.initiate(result.data.id));
        });
      },
    }),
    addCompany: builder.mutation<Company, Partial<Company>>({
      query: (body) => ({
        url: "company",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setCompany(result.data));
          dispatch(businessApi.endpoints.getStaffers.initiate(result.data.id));
        });
      },
    }),
    editCompany: builder.mutation<Company, Partial<Company>>({
      query: (body) => ({
        url: `company/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Company"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setCompany(result.data));
        });
      },
    }),
    //Staffer endpoints
    getStaffers: builder.query<Staffer[], string>({
      query: (company_id) => `company/${company_id}/staffer`,
      providesTags: ["Staffer"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setStaffers(result.data));
        });
      },
    }),
    getStafferById: builder.query<Staffer, StafferGetParams>({
      query: (body) => `/company/${body.company_id}/staffer/${body.id}`,
    }),
    addStaffer: builder.mutation<Staffer, StafferRequest>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staffer"],
    }),
    editStaffer: builder.mutation<Staffer, Partial<Staffer>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
    deleteStaffer: builder.mutation<boolean, StafferGetParams>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(null));
        });
      },
    }),
    linkStafferToUser: builder.mutation<Staffer, StafferLinkToUserRequest>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
    inviteStaffer: builder.mutation<Staffer, StafferGetParams>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "POST",
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (_, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
  }),
});

export const {
  useGetCompanyByIdQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useGetStaffersQuery,
  useGetStafferByIdQuery,
  useAddStafferMutation,
  useEditStafferMutation,
  useDeleteStafferMutation,
  useLinkStafferToUserMutation,
  useInviteStafferMutation,
} = businessApi;

export const {
  setCompany,
  setStaffers,
  setCurrentStaffer,
  setSelectedStaffer,
  setIsNewStaffer,
} = businessSlice.actions;

export default businessSlice.reducer;
