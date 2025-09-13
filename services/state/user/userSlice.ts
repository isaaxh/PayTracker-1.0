import { getDocument, TGetDocument } from "@/services/api/firestoreApi";
import { formatDate } from "@/utils/dateHelperFn";
import { TFirestoreUserData, TUserData } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    data: TUserData | null
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}

const initialState: UserState = {
    data: null,
    status: 'idle',
    error: null
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading',
                    state.error = null,
                    state.data = null
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<TUserData | null>) => {
                state.status = 'success',
                    state.data = action.payload,
                    state.error = null
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to fetch user data',
                    state.data = null
            })
    }
})

export const fetchUserData = createAsyncThunk<TUserData | null, TGetDocument>(
    'user/fetchUserData',
    async ({ collectionName, id }: TGetDocument) => {
        const firestoreUserData = await getDocument<TFirestoreUserData>({ collectionName, id });

        if (firestoreUserData) {
            const userData: TUserData = {
                ...firestoreUserData,
                createdAt: firestoreUserData.createdAt.toDate().toISOString(),
            }

            return userData;
        }
        return null;
    }
)

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;