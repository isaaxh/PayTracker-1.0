import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage, { AsyncStorageStatic } from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import userDataReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transactions/transactionSlice";
import appSettingsReducer from "./appSettings/appSettingSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['userData', 'appSettings', 'authState']
}

const rootReducer = {
    authState: persistReducer(persistConfig, authReducer),
    userData: persistReducer(persistConfig, userDataReducer),
    appSettings: persistReducer(persistConfig, appSettingsReducer),
    transactionData: transactionReducer,
}


export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
