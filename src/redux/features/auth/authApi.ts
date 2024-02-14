// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rootApi } from "../../root.api";
import { initAuthUser, initVerifyUser, logout } from "./authSlice";

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
          console.log("data", data);
          dispatch(initAuthUser(data.data));
        });
      },
    }),
    verifyToken: builder.mutation<VerifyUserPayload,{token: string}>({
      query: (body) => ({
        url: "/token/verify/",
        method: "POST",
        headers: {},
        body,
      }),
      onQueryStarted(__args, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((data) => {
            console.log("verify data",data)
            dispatch(initVerifyUser(data.data));
          })
          .catch(() => {
            dispatch(logout());
          });
      },
    }),
    signup: builder.mutation<SignupSuccessPayload, SignupPayload>({
      query: (data) => ({
        url: `/user/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyTokenMutation, useSignupMutation } = authApi;
