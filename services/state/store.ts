import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import transactionReducer from "./transactions/transactionSlice";

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        authState: authReducer,
        transactionData: transactionReducer

    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
