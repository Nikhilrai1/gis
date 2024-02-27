import { getAuthToken, rootApi } from "@/redux/root.api";
import { SearchParamsI } from "@/typing";
import { CollectionFilter, GetAllGeoJson, GisAllFileResponseI, IGisPropertiesResponse } from "./gis";
import { BASE_API_URL } from "@/lib/urlConfig";

// Function to fetch data from an API
interface FetchDataParams {
    url: string;
    payload?: any;
    method: "GET" | "POST"
}

async function fetchData({ url, payload, method = "GET" }: FetchDataParams) {
    const options = {
        method: method,
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    if (payload) {
        options.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${BASE_API_URL}${url}`, options);
        const responseData = await response.json();
        if (!response.ok) throw new Error(JSON.stringify(responseData));
        return responseData;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export interface FetchAttributeWithValuesResponse {
    unique_values: string[];
    data_type: string;
    attribute: string;
}

// Fetch data from all three APIs simultaneously
export const fetchAttributeWithValues = async (collection: string) => {
    try {
        const attributeData = fetchData({
            method: "POST",
            url: 'collection-atrributes/',
            payload: {
                collection
            }
        }).then((data) => {
            const apiData: Promise<FetchDataParams>[] = [];
            data.forEach((item) => {
                apiData.push(fetchData({
                    url: 'distinct-values/',
                    payload: {
                        collection,
                        attribute: item
                    },
                    method: "POST"
                }))
            })

            const allCombinedData = Promise.all(apiData)
                .then((combinedData) => {
                    // console.log(combinedData);
                    return combinedData;
                })
                .catch((error: any) => {
                    const errorMessage = error.message;
                    console.log('Error fetching data:', errorMessage);
                });
            return allCombinedData;
        }).catch((error) => error);

        // console.log("Attribute Data", await attributeData);
        return attributeData;
    } catch (error: any) {
        const errorMessage = error.message;
        console.log('Error fetching data:', errorMessage);
    }
}


export const gisApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllGisFile: builder.query<GisAllFileResponseI, { params: SearchParamsI }>({
            query: ({ params: { search, page, per_page } }) => ({
                url: `/gis-file-upload/?search=${search}&page=${page}&per_page=${per_page}`,
                method: "GET",
            }),
            providesTags: ["gis-data"],
        }),
        getSingleGisFileJson: builder.query<GetAllGeoJson, { id: string, page?: number, per_page?: number }>({
            query: ({ id }) => ({
                url: `/gis-file-upload/${id}/?page=${"all"}`,
                // url: `/gis-file-upload/${id}/?page=${page || 1}&per_page=${per_page || 10}`,
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
        getCollectionFilter: builder.mutation<CollectionFilter, { collection: string }>({
            query: ({ collection }) => ({
                url: `/collection-filter-fields/`,
                method: "POST",
                body: { collection },
            }),
            invalidatesTags: ["gis-data"],
        }),
    }),
});

export const {
    useGetAllGisFileQuery,
    useLazyGetSingleGisFileJsonQuery,
    useGetSingleGisFileJsonQuery,
    usePostGisFileMutation,
    useUpdateGisFileMutation,
    useDeleteGisFileMutation,
    useGetGisPropertiesQuery,
    useGetCollectionFilterMutation
} = gisApi;
