import { rootApi } from "@/redux/root.api";
import { SearchParamsI } from "@/typing";



export interface ChartDetails {
    id: string;
    form: string;
    form_field: string;
    operation: string;
    title: string;
    x_axis_title: string;
    y_axis_title: string;
    chart: string;
  }
  
  export interface AllChartResponseI {
    current_page: number;
    total: number;
    per_page: number;
    total_pages: number;
    results: ChartDetails[];
  }
  
  export interface ChartAttibuteI {
    label: string;
    value: string;
  }
  export interface ChartFormAndFieldsI {
    form: {
      label: string;
      value: string;
    };
    attributes: ChartAttibuteI[];
  }
  
  export interface CreateChartFormI {
    form: string;
    form_field: string;
    operation: string;
    title: string;
    x_axis_title?: string;
    y_axis_title?: string;
    chart: string;
  }
  
  interface CreateChartDTO {
    id?: string;
    form: string;
    form_field: string;
    gis_file: string;
    operation?: string;
    title?: string;
    x_axis_title?: string;
    y_axis_title?: string;
    chart: string;
  }
  
  export interface DataSetI {
    label: string | number;
    data: number;
  }
  
  interface RetrieveChartResponseI {
    current_page: number;
    total: number;
    per_page: number;
    total_pages: number;
    results: DataSetI[];
    chart_details: CreateChartDTO;
  }

export const chartApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getFormsAndFields: builder.query<ChartFormAndFieldsI[], { gisId: string }>({
            query: ({ gisId }) => ({
                url: `/custom-form/froms-and-attributes/?gis_file=${gisId}`,
            }),
            providesTags: ["chart"],
        }),
        getAllCharts: builder.query<AllChartResponseI, { params: SearchParamsI }>({
            query: ({ params: { search, page, per_page } }) => ({
                url: `/chart/?search=${search}&page=${page}&per_page=${per_page}`,
            }),
            providesTags: ["chart"],
        }),
        createChart: builder.mutation<void, CreateChartDTO>({
            query: (data) => ({
                url: `/chart/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["chart"],
        }),
        retrieveChart: builder.query<RetrieveChartResponseI, { chartId: string }>({
            query: ({ chartId }) => ({
                url: `/chart/${chartId}/`,
            }),
            providesTags: ["chart"],
        }),

        deleteChart: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/chart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["chart"],
        }),
    }),
});

export const {
    useCreateChartMutation,
    useGetAllChartsQuery,
    useDeleteChartMutation,
    useGetFormsAndFieldsQuery,
    useRetrieveChartQuery
} = chartApi;
