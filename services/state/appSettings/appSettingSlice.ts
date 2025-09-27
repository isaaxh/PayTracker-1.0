import { TAppSettings } from "@/constants/Settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppSettingState = {
    settings: TAppSettings
}

const initialState: AppSettingState = {
    settings: {
        theme: { label: 'Dark', value: 'dark' },
        currency: { label: 'Saudi Riyal', value: 'SAR' },
        language: { label: 'English', value: 'en' }
    }
}

const appSettingSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        resetSettings: (state) => {
            state.settings = initialState.settings
        },
        updateSettings: <K extends keyof TAppSettings>(
            state: AppSettingState,
            action: PayloadAction<{ key: K; value: TAppSettings[K] }>) => {

            state.settings[action.payload.key] = action.payload.value;
        }
    }
})

export const { resetSettings, updateSettings } = appSettingSlice.actions
export default appSettingSlice.reducer