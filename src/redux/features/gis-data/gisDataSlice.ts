import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface InitialGisData {
    gisData: GisFile | null
}
interface GisFile {
    id: number;
    name: string;
    geojson?: any;
}


const initialState: InitialGisData = {
    gisData: null
}

export const gisDataSlice = createSlice({
    name: "gis",
    initialState,
    reducers: {
        initGisFileData: (_, { }: PayloadAction<any>) => {
            // localStorage.setItem("gis_auth_token", payload.data.access);
        },
        removeGisFileData: (state) => {
            // localStorage.setItem("gis_auth_token", payload.data.access);
            state.gisData = null;
        },
    },
});

export const { initGisFileData, removeGisFileData } = gisDataSlice.actions;
