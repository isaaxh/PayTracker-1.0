import { loginUser, signupUser } from "@/services/api/firebaseAuthApi";
import { TLoginSchema, TSignupSchema } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateProfile, User } from "firebase/auth";
import { addUserDocument } from "../user/userSlice";

type AuthState = {
    user: TUser | null
    status: 'idle' | 'pending' | 'success' | 'failed',
    error: string | null
}

export type TSerializedUser = ReturnType<typeof createSerializableUser>

export type TUser = TSerializedUser;

export const createSerializableUser = (user: User) => {
    if (!user) return null;

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
    };
};

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null
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
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "pending"
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success"
                state.user = action.payload
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Login failed"
            })
    }
})

export const login = createAsyncThunk<TSerializedUser, TLoginSchema, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, thunkAPI) => {

        try {
            const response = await loginUser({ email, password })

            const serializedUser: TUser = createSerializableUser(response.user)

            return serializedUser
        } catch (error) {
            console.log('Failed to login.');
            return thunkAPI.rejectWithValue('Failed to login.')
        }

    }
)

export const signup = createAsyncThunk<TSerializedUser, TSignupSchema, { rejectValue: string }>(
    'auth/signup',
    async ({ name, email, password, confirmPassword }, thunkAPI) => {

        try {

            const response = await signupUser({ name, email, password, confirmPassword })

            if (!response.user) {
                return thunkAPI.rejectWithValue("No user found");
            }

            await updateProfile(response.user, {
                displayName: name,
            });

            const serializedUser: TUser = createSerializableUser(response.user)
            thunkAPI.dispatch(addUserDocument({
                id: response.user.uid, collectionName: `users`,
                data: {
                    uid: response.user.uid,
                    email: response.user.email ?? '',
                    displayName: response.user.displayName ?? ''
                }
            }))

            return serializedUser
        } catch (error) {
            console.log('Failed to register user: ', error);
            return thunkAPI.rejectWithValue('Failed to register user.')

        }
    }
)

export const { setAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer;