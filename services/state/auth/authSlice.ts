import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type AuthState = {
    user: TUser | null
}

export type TUser = ReturnType<typeof createSerializableUser>;

export const createSerializableUser = (user: User) => {
    if (!user) return null;

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
};

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state: AuthState, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
        clearAuthUser: (state: AuthState) => {
            state.user = null;
        }
    },
})

export const { setAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer;