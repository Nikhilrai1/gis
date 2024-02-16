import { rootApi } from "@/redux/root.api";
import { SearchParamsI } from "@/typing";
import { GetAllDynamicFormResponseI } from "./gis-form-template";




export const gisFormTemplateApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFormTemplates: builder.query<GetAllDynamicFormResponseI, { id?: string; feature?: string; params: SearchParamsI }>({
          query: ({ id, feature, params: { search, page, per_page } }) => ({
            url: `/custom-form/?${id ? "gis_file=" + id : ""}${feature ? "&feature=" + feature : ""
              }&search=${search}&page=${page}&per_page=${per_page}`,
          }),
          providesTags: ["gis-form-template"],
        }),
        // getDynamicFormById: builder.query<DynamicFormI, { id: string }>({
        //   query: ({ id }) => ({
        //     url: `/custom-form/${id}`,
    
        //     providesTags: ["gis-form-template"],
        //   }),
        // }),
        // postDynamicForm: builder.mutation<DynamicFormI, DynamicFormDTO>({
        //   query: (data) => ({
        //     url: `/custom-form/`,
        //     method: "POST",
        //     body: data,
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
    
        // updateDynamicForm: builder.mutation<any, DynamicFormUpdateDTO>({
        //   query: ({ id, data }) => ({
        //     url: `/custom-form/${id}/`,
        //     method: "PUT",
        //     body: data,
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
    
        // deleteDynamicForm: builder.mutation<any, { id: string }>({
        //   query: ({ id }) => ({
        //     url: `/custom-form/${id}`,
        //     method: "DELETE",
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
        // getAllDynamicFormData: builder.query<
        //   AllDynamicFormDataResponseI,
        //   { id: string; params: SearchParamsI; propertyId?: string }
        // >({
        //   query: ({
        //     id,
        //     propertyId,
        //     params: { search, page, per_page, filter },
        //   }) => ({
        //     url: `/custom-form/${id}/dynamic-form-data/?search=${search}&page=${page}&per_page=${per_page}${propertyId ? "&property=" + propertyId : ""
        //       }${filter
        //         ? "&" +
        //         filter
        //           .map((field) =>
        //             Object.entries(field)
        //               .map(([key, value]) => `${key}=${value}`)
        //               .join(", ")
        //           )
        //           .join("&")
        //         : ""
        //       }`,
        //   }),
        //   providesTags: ["gis-form-template"],
        // }),
        // getDynamicFormDataById: builder.query<any, { id: string; formId: string }>({
        //   query: ({ id, formId }) => ({
        //     url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
        //   }),
        //   providesTags: ["gis-form-template"],
        // }),
        // addDynamicFormData: builder.mutation<any, { id: string; data: any }>({
        //   query: ({ id, data }) => ({
        //     url: `/custom-form/${id}/dynamic-form-data/`,
        //     method: "POST",
        //     body: data,
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
        // updateDynamicFormData: builder.mutation<
        //   any,
        //   { id: string; formId: string; data: any }
        // >({
        //   query: ({ id, formId, data }) => ({
        //     url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
        //     method: "PUT",
        //     body: data,
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
        // deleteDynamicFormData: builder.mutation<
        //   any,
        //   { id: string; formId: string }
        // >({
        //   query: ({ id, formId }) => ({
        //     url: `/custom-form/${id}/dynamic-form-data/${formId}/`,
        //     method: "DELETE",
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
        // getFilterableFields: builder.query<
        //   { fields: FilterFieldI[] },
        //   { formId: string }
        // >({
        //   query: ({ formId }) => ({
        //     url: `/custom-form/${formId}/filter-fields/`,
        //   }),
        //   providesTags: ["gis-form-template"],
        // }),
        // uploadExcel: builder.mutation<any, { formId: string; data: FormData }>({
        //   query: ({ formId, data }) => ({
        //     url: `/custom-form/${formId}/upload-excel/`,
        //     method: "POST",
        //     body: data,
        //   }),
        //   invalidatesTags: ["gis-form-template"],
        // }),
      }),
});

export const {
  useGetAllFormTemplatesQuery
} = gisFormTemplateApi;
