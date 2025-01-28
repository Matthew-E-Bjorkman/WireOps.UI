import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface IdentityState {
  user_id: string;
  access_token: string;
  tenant_id: string;
}

const initialState: IdentityState = {
  user_id: "",
  access_token: "",
  tenant_id: "",
};

export const identitySlice = createSlice({
  name: "identity",
  initialState: initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    setTenantId: (state, action: PayloadAction<string>) => {
      state.tenant_id = action.payload;
    },
  },
});

export const { setUserId, setAccessToken, setTenantId } = identitySlice.actions;

export default identitySlice.reducer;
