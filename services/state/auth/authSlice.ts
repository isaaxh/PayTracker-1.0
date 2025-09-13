import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "firebaseConfig";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer;