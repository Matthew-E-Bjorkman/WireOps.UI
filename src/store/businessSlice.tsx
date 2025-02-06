import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Company } from "../types/Business/Company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";
import { Staffer, StafferGetParams } from "../types/Business/Staffer";

interface BusinessState {
  company: Company | null;
  isEditingCompany: boolean;
  staffers: Staffer[];
  currentStaffer: Staffer | null;
  selectedStaffer: Staffer | null;
  isNewStaffer: boolean;
  isEditingStaffer: boolean;
}

const initialState: BusinessState = {
  company: null,
  isEditingCompany: false,
  staffers: [],
  currentStaffer: null,
  selectedStaffer: null,
  isNewStaffer: false,
  isEditingStaffer: false,
};

export const businessSlice = createSlice({
  name: "business",
  initialState: initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company | null>) => {
      state.company = action.payload;
    },
    setIsEditingCompany: (state, action: PayloadAction<boolean>) => {
      state.isEditingCompany = action.payload;
    },
    setStaffers: (state, action: PayloadAction<Staffer[]>) => {
      state.staffers = action.payload;
    },
    setCurrentStaffer: (state, action: PayloadAction<Staffer | null>) => {
      state.currentStaffer = action.payload;
    },
    setSelectedStaffer: (state, action: PayloadAction<Staffer | null>) => {
      state.selectedStaffer = action.payload;
    },
    setIsNewStaffer: (state, action: PayloadAction<boolean>) => {
      state.isNewStaffer = action.payload;
    },
    setIsEditingStaffer: (state, action: PayloadAction<boolean>) => {
      state.isEditingStaffer = action.payload;
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
      onQueryStarted: (company_id, { dispatch, getState, queryFulfilled }) => {
        if (!company_id) {
          // Executed via tag invalidation
          company_id = (getState() as AppRootState).business.company!.id;
        }
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setStaffers(result.data));
        });
      },
    }),
    getStafferById: builder.query<Staffer, Partial<StafferGetParams>>({
      query: (body) => `/company/${body.company_id}/staffer/${body.id}`,
      onQueryStarted: (request, { getState }) => {
        if (!request.company_id) {
          request.company_id = (
            getState() as AppRootState
          ).business.company!.id;
        }
      },
    }),
    addStaffer: builder.mutation<Staffer, Partial<Staffer>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
    editStaffer: builder.mutation<Staffer, Partial<Staffer>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
    deleteStaffer: builder.mutation<boolean, Partial<StafferGetParams>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(null));
        });
      },
    }),
    linkStafferToUser: builder.mutation<Staffer, Partial<Staffer>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedStaffer(result.data));
        });
      },
    }),
    inviteStaffer: builder.mutation<Staffer, Partial<StafferGetParams>>({
      query: (body) => ({
        url: `/company/${body.company_id}/staffer/${body.id}/invite`,
        method: "POST",
      }),
      invalidatesTags: ["Staffer"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
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
  setIsEditingCompany,
  setStaffers,
  setCurrentStaffer,
  setSelectedStaffer,
  setIsNewStaffer,
  setIsEditingStaffer,
} = businessSlice.actions;

export default businessSlice.reducer;
