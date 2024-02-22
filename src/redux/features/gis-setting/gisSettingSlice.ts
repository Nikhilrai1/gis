import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
    color: string;
    outline: boolean;
    fill: boolean;
    gisMapProvider: string;
}

const initialState: InitialStateI = {
    color: "#ffffff",
    outline: false,
    fill: true,
    gisMapProvider: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

export const gisSettingSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        changeProvider: (state, { payload }: PayloadAction<string>) => {
            state.gisMapProvider = payload;
        },
        changeColor: (state, { payload }: PayloadAction<string>) => {
            state.color = payload;
        },
        changeOutline: (state, { payload }: PayloadAction<boolean>) => {
            state.outline = payload;
        },
        changeFill: (state, { payload }: PayloadAction<boolean>) => {
            state.fill = payload;
        },
    },
});

export const { changeProvider, changeColor, changeFill, changeOutline } = gisSettingSlice.actions;
