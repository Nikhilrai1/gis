import { rootApi } from "@/redux/root.api";
export const gisApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadExcel: builder.mutation<Blob, { customFormId: string, data: FormData }>({
            query: ({ customFormId, data }) => ({
                url: `/custom-form/${customFormId}/upload-excel/`,
                method: "POST",
                body: data,
            }),
        }),
        downloadExcel: builder.query<Blob, string | undefined>({
            query: (customFormId) => ({
                url: `/custom-form/${customFormId}/sample-excel/`,
                method: "GET",
                responseType: "blob",
            }),
        }),
    }),
});

export const {
   useDownloadExcelQuery,
   useUploadExcelMutation
} = gisApi;
