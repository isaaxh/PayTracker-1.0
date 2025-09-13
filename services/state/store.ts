import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./user/userSlice";

export const store = configureStore({
    reducer: {
        userData: userDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
