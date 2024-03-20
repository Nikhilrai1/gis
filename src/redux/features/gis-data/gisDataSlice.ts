import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GisData } from "./gis";


export interface AttributeValue {
    [key: string]: {
        color: string;
        attributeName: string;
        min?: number;
        max?: number;
    };
}
export interface AttributeValueColorConfig {
    attribute: string;
    values: AttributeValue,
    dataType: string;
}

interface InitialGisData {
    gisData: GisData | null;
    attributeValueConfig: AttributeValueColorConfig | null;
    specificPlot: boolean;
    gisAttribute: string | null;
}


const initialState: InitialGisData = {
    gisData: null,
    attributeValueConfig: null,
    specificPlot: false,
    gisAttribute: null
}

export const gisDataSlice = createSlice({
    name: "gis",
    initialState,
    reducers: {
        initGisFileData: (state, { payload }: PayloadAction<GisData>) => {
            state.gisData = payload;
            state.specificPlot = false;
            localStorage.setItem("selected_gis_file", JSON.stringify(payload));
        },
        initGisAttribute: (state, { payload }: PayloadAction<string>) => {
            state.gisAttribute = payload;
            localStorage.setItem("selected_gis_attribute", JSON.stringify(payload));
        },
        initSpecificGisFileData: (state, { payload }: PayloadAction<{specificPlot: boolean; gisData:GisData}>) => {
            state.gisData = payload?.gisData;
            state.specificPlot = payload?.specificPlot;
            localStorage.setItem("selected_gis_file", JSON.stringify(payload));
        },
        initAttributeColorConfig: (state, { payload }: PayloadAction<AttributeValueColorConfig>) => {
            state.attributeValueConfig = payload;
        },
        removeGisFileData: (state) => {
            state.gisData = null;
            localStorage.removeItem("selected_gis_file");
        },
    },
});

export const { initGisFileData, initSpecificGisFileData, initAttributeColorConfig, removeGisFileData, initGisAttribute } = gisDataSlice.actions;
