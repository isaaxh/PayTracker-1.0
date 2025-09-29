import { Timestamp } from "firebase/firestore";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    addDocument,
    AddDocumentProps,
    getDocument,
    TGetDocument,
    TUpdateDocFields,
    updateDocFields
} from "@/services/api/firestoreApi";

import { TFirestoreUserData, TUserData } from "@/utils/types";
import { formatDate } from "@/utils/dateHelperFn";

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
            // add user document
            .addCase(addUserDocument.pending, (state) => {
                state.status = 'pending',
                    state.error = null
            })
            .addCase(addUserDocument.fulfilled, (state, action: PayloadAction<TUserData | null>) => {
                state.status = 'success',
                    state.data = action.payload,
                    state.error = null
            })
            .addCase(addUserDocument.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to add user data'
            })

            // fetch user document
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

            // update user document
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

export const addUserDocument = createAsyncThunk<TUserData,
    AddDocumentProps<{ uid: string, displayName: string, email: string }>,
    { rejectValue: string }>(
        'user/addUserDocument',
        async ({ collectionName, id, data }, thunkAPI) => {
            try {
                const createdAt = new Date()
                const firestoreReadyUserData: TFirestoreUserData = {
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    createdAt: Timestamp.fromDate(createdAt),
                    grandTotal: 0,
                    monthlyTotal: {
                        month: formatDate(createdAt, 'month'),
                        income: 0,
                        expenses: 0,
                        total: 0,
                    },
                }
                await addDocument<TFirestoreUserData>({ collectionName, id, data: firestoreReadyUserData })

                return {
                    ...firestoreReadyUserData,
                    createdAt: createdAt.toISOString()
                }
            } catch (error) {
                console.log('Failed to add user document: ', error);
                return thunkAPI.rejectWithValue('Failed to add user document.')
            }
        }
    )

export const fetchUserData = createAsyncThunk<TUserData | null, TGetDocument, { rejectValue: string }>(
    'user/fetchUserData',
    async ({ collectionName, id }: TGetDocument, thunkAPI) => {

        try {
            const firestoreUserData = await getDocument<TFirestoreUserData>({ collectionName, id });

            if (firestoreUserData) {
                const userData: TUserData = {
                    ...firestoreUserData,
                    createdAt: firestoreUserData.createdAt.toDate().toISOString(),
                }

                return userData;
            }
        } catch (error: any) {
            if (error.message === 'AbortError') {
                return thunkAPI.rejectWithValue('Request was aborted');
            }
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch user data.');
        }

        return null;
    }
)


export const updateUserData = createAsyncThunk<
    TUserData,
    TUpdateDocFields<TUserData>,
    { rejectValue: string }
>(
    'user/updateUserData',
    async (props, thunkAPI) => {
        try {
            const { id, collectionName, updates } = props

            const state = thunkAPI.getState() as RootState;
            const currentData = state.userData.data;

            if (!currentData) {
                return thunkAPI.rejectWithValue('User data is not available.');
            }

            await updateDocFields<TUserData>({
                id,
                collectionName,
                updates
            });

            const updatedUserData: TUserData = {
                ...currentData,
                ...updates,
            }

            return updatedUserData;
        } catch (error: any) {
            if (error.message === 'AbortError') {
                return thunkAPI.rejectWithValue('Request was aborted');
            }
        }
        return thunkAPI.rejectWithValue('Failed to update user data.');
    }
)

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;