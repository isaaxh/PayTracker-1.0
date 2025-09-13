import { getDocument, TGetDocument, TUpdateFieldInDoc, updateFieldInDoc } from "@/services/api/firestoreApi";
import { TFirestoreUserData, TUserData } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UserState = {
    data: TUserData | null
    status: 'idle' | 'pending' | 'success' | 'failed'
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
                state.status = 'pending',
                    state.error = null
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<TUserData | null>) => {
                state.status = 'success',
                    state.data = action.payload,
                    state.error = null
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to fetch user data'
            })
            .addCase(updateUserData.pending, (state) => {
                state.status = 'pending',
                    state.error = null
            })
            .addCase(updateUserData.fulfilled, (state, action: PayloadAction<TUserData>) => {
                state.status = 'success',
                    state.data = action.payload,
                    state.error = null
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to update user data'
            });

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


export const updateUserData = createAsyncThunk<TUserData, TUpdateFieldInDoc>(
    'user/updateUserData',
    async (props, { getState, rejectWithValue }) => {
        const { fieldName, updateValue } = props

        const state = await getState() as RootState;
        const currentData = state.userData.data;

        if (!currentData) {
            console.log(state);

            return rejectWithValue('User data is not available.');
        }

        await updateFieldInDoc(props);

        const updatedUserData = {
            ...currentData,
            [fieldName]: updateValue,
        } as TUserData

        return updatedUserData;
    }
)

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;