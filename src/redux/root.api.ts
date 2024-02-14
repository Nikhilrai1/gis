import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@/lib/urlConfig";

export const rootApi = createApi({
  reducerPath: "root",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.token;
      const token = localStorage.getItem("gis_auth_token") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "gis-data"
  ],
});
