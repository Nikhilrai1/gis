import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
  noAuth: boolean;
  authenticated: boolean;
  authUser: any;
  token: string | null;
}

const initialState: InitialStateI = {
  noAuth: true,
  authenticated: false,
  authUser: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    initAuthUser: (state, { payload }: PayloadAction<LoginPayload>) => {
      state.noAuth = false;
      state.authenticated = true;
      state.authUser = payload.user;
      state.token = payload.data.access;

      localStorage.setItem("gis_auth_token", payload.data.access);
    },

    logout: (state) => {
      state.authUser = null;
      state.authenticated = false;
      state.noAuth = false;

      localStorage.removeItem("gis_auth_token");
    },
  },
});

export const { initAuthUser, logout } = AuthSlice.actions;
