import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Company } from "../types/Business/Company";
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppRootState } from "./store";
import { Staffer, StafferGetParams } from "../types/Business/Staffer";
import { Role, RoleGetParams } from "../types/Business/Role";

interface BusinessState {
  company: Company | null;
  isEditingCompany: boolean;
  roles: Role[];
  selectedRole: Role | null;
  isNewRole: boolean;
  isEditingRole: boolean;
  staffers: Staffer[];
  currentStaffer: Staffer | null;
  selectedStaffer: Staffer | null;
  isNewStaffer: boolean;
  isEditingStaffer: boolean;
}

const initialState: BusinessState = {
  company: null,
  isEditingCompany: false,
  roles: [],
  selectedRole: null,
  isNewRole: false,
  isEditingRole: false,
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
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload;
    },
    setIsNewRole: (state, action: PayloadAction<boolean>) => {
      state.isNewRole = action.payload;
    },
    setIsEditingRole: (state, action: PayloadAction<boolean>) => {
      state.isEditingRole = action.payload;
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
  tagTypes: ["Company", "Role", "Staffer"],
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
    //Role endpoints
    getRoles: builder.query<Role[], string>({
      query: (company_id) => `company/${company_id}/role`,
      providesTags: ["Role"],
      onQueryStarted: (company_id, { dispatch, getState, queryFulfilled }) => {
        company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setRoles(result.data));
        });
      },
    }),
    getRoleById: builder.query<Role, Partial<RoleGetParams>>({
      query: (body) => `company/${body.company_id}/role/${body.id}`,
      onQueryStarted: (request, { getState }) => {
        if (!request.company_id) {
          request.company_id = (
            getState() as AppRootState
          ).business.company!.id;
        }
      },
    }),
    addRole: builder.mutation<Role, Partial<Role>>({
      query: (body) => ({
        url: `/company/${body.company_id}/role`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedRole(result.data));
        });
      },
    }),
    editRole: builder.mutation<Role, Partial<Role>>({
      query: (body) => ({
        url: `/company/${body.company_id}/role/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedRole(result.data));
        });
      },
    }),
    deleteRole: builder.mutation<boolean, Partial<RoleGetParams>>({
      query: (body) => ({
        url: `/company/${body.company_id}/role/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
      onQueryStarted: (request, { dispatch, getState, queryFulfilled }) => {
        request.company_id = (getState() as AppRootState).business.company!.id;
        queryFulfilled.then((result) => {
          dispatch(businessSlice.actions.setSelectedRole(null));
        });
      },
    }),
    //Staffer endpoints
    getStaffers: builder.query<Staffer[], string>({
      query: (company_id) => `company/${company_id}/staffer`,
      providesTags: ["Staffer"],
      onQueryStarted: (company_id, { dispatch, getState, queryFulfilled }) => {
        if (!company_id) {
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
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useAddRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
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
  setRoles,
  setSelectedRole,
  setIsNewRole,
  setIsEditingRole,
  setStaffers,
  setCurrentStaffer,
  setSelectedStaffer,
  setIsNewStaffer,
  setIsEditingStaffer,
} = businessSlice.actions;

export default businessSlice.reducer;
