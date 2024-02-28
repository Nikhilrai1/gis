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
    // min?: number | null;
    // max?: number | null;
    // mean?: number | null;
    // st_dev?: number | null;
}

interface InitialGisData {
    gisData: GisData | null;
    attributeValueConfig: AttributeValueColorConfig | null;
}


const initialState: InitialGisData = {
    gisData: null,
    attributeValueConfig: null
}

export const gisDataSlice = createSlice({
    name: "gis",
    initialState,
    reducers: {
        initGisFileData: (state, { payload }: PayloadAction<GisData>) => {
            state.gisData = payload;
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

export const { initGisFileData, initAttributeColorConfig, removeGisFileData } = gisDataSlice.actions;
