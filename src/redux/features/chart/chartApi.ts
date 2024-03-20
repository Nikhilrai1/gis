import { rootApi } from "@/redux/root.api";
import { SearchParamsI } from "@/typing";
import { AllSavedLineChartResponse, GetChartFilter } from "./chart";


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

export interface LineChartRequest {
  feature_id: string[];
  form: string;
  date_field: string;
  value: string;
  collection_name: string;
}

export interface LineChartResponse {
  data: number[] | string[];
  label: string[];
  property: {
    _id: string;
    label: string;
    feature_id: string;
  }
}



interface SaveLineChartRequest {
  title: string;
  x_axis_title: string;
  y_axis_title: string;
  description: string;
  image: string;
  gis_file: string;
  form: string;
  x_field: string;
  y_field: string;
  feature_ids: string[];
}

export interface LineChartFilterType {
  dropdowns: Dropdown[];
  range_filters: Rangefilter[];
}

interface Rangefilter {
  key: string;
  data_type: string;
  gte: string;
  lte: string;
}

interface Dropdown {
  key: string;
  data_type: string;
  value: string;
  operators: string;
}


interface CreateLineChartRequest {
  gis_id: string | number;
  feature_id: string[];
  form: string;
  x_field: string;
  y_field: string;
  filters?: LineChartFilterType;
}
export const chartApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getFormsAndFields: builder.query<ChartFormAndFieldsI[], { gisId: string }>({
      query: ({ gisId }) => ({
        url: `/custom-form/froms-and-attributes/?gis_file=${gisId}`,
      }),
      providesTags: ["chart"],
    }),

    getAllCharts: builder.query<AllChartResponseI, { params: SearchParamsI, gisId: string }>({
      query: ({ gisId }) => ({
        url: `/chart/?gis_file=${parseInt(gisId)}`,
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

    createLineChart: builder.mutation<LineChartResponse[], CreateLineChartRequest>({
      query: (data) => ({
        url: `/line-chart/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chart"],
    }),
    saveLineChart: builder.mutation<LineChartResponse, SaveLineChartRequest>({
      query: (data) => ({
        url: `/line-charts/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chart"],
    }),

    getAllSavedCharts: builder.query<AllSavedLineChartResponse, { gisId: string, params: SearchParamsI }>({
      query: ({ gisId }) => ({
        url: `/line-charts/?gis_file=${gisId}`,
      }),
      providesTags: ["chart"],
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
    getChartsFilter: builder.mutation<GetChartFilter, { collection: string }>({
      query: (data) => ({
        url: `/filterable-fields/`,
        method: "POST",
        body: data,
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
  useRetrieveChartQuery,
  useCreateLineChartMutation,
  useSaveLineChartMutation,
  useGetAllSavedChartsQuery,
  useGetChartsFilterMutation,
} = chartApi;
