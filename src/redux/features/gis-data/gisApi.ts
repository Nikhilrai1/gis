import { rootApi } from "@/redux/root.api";
import { SearchParamsI } from "@/typing";
import { GisAllFileResponseI, GisFileI, IGisPropertiesResponse } from "./gis";


export const gisApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllGisFile: builder.query<GisAllFileResponseI, { params: SearchParamsI }>({
            query: ({ params: { search, page, per_page } }) => ({
                url: `/gis-file-upload/?search=${search}&page=${page}&per_page=${per_page}`,
                method: "GET",
            }),
            providesTags: ["gis-data"],
        }),
        getSingleGisFile: builder.query<GisFileI, { id: string }>({
            query: ({ id }) => ({
                url: `/gis-file-upload/${id}/`,
            }),
            providesTags: ["gis-data"],
        }),
        postGisFile: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: `/gis-file-upload/`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["gis-data"],
        }),
        deleteGisFile: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/gis-file-upload/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["gis-data"],
        }),
        updateGisFile: builder.mutation<any, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/gis-file-upload/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["gis-data"],
        }),
        getGisProperties: builder.query<IGisPropertiesResponse, { id: string; params: SearchParamsI }>({
            query: ({ id, params: { search, page, per_page } }) => ({
                url: `/gis-file-upload/${id}/properties/?search=${search}&page=${page}&per_page=${per_page}`,
            }),
            providesTags: ["gis-data"],
        }),
    }),
});

export const {
    useGetAllGisFileQuery,
    useGetSingleGisFileQuery,
    usePostGisFileMutation,
    useUpdateGisFileMutation,
    useDeleteGisFileMutation,
    useGetGisPropertiesQuery
} = gisApi;
