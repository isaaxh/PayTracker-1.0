import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        authState: authReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
