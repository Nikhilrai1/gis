import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GisData } from "./gis";


interface InitialGisData {
    gisData: GisData | null
}




const initialState: InitialGisData = {
    gisData: null
}

export const gisDataSlice = createSlice({
    name: "gis",
    initialState,
    reducers: {
        initGisFileData: (state, { payload }: PayloadAction<GisData>) => {
            state.gisData = payload;
            localStorage.setItem("selected_gis_file", JSON.stringify(payload));
        },
        removeGisFileData: (state) => {
            state.gisData = null;
            localStorage.removeItem("selected_gis_file");
        },
    },
});

export const { initGisFileData, removeGisFileData } = gisDataSlice.actions;
