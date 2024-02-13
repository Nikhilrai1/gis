// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "../../root.api";
import { initAuthUser, logout } from "./authSlice";

export const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { username_or_phone: string; password: string }) => ({
        url: "/login/token/",
        method: "POST",
        body,
      }),
      onQueryStarted(_args, { dispatch, queryFulfilled }) {
        queryFulfilled.then((data) => {
          console.log("data",data);
          dispatch(initAuthUser(data.data));
        });
      },
    }),
    verifyToken: builder.mutation({
      query: (body: { token: string }) => ({
        url: "/verify-token/",
        method: "POST",
        headers: {},
        body,
      }),
      onQueryStarted(__args, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            dispatch(initAuthUser(data.data));
          })
          .catch(() => {
            dispatch(logout());
          });
      },
    }),
  }),
});

export const { useLoginMutation, useVerifyTokenMutation } = authApi;
