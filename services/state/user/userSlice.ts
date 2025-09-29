import { addDocument, AddDocumentProps, getDocument, TGetDocument, TUpdateFieldInDoc, updateFieldInDoc } from "@/services/api/firestoreApi";
import { TFirestoreUserData, TUserData } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Timestamp } from "firebase/firestore";
import { formatDate } from "@/utils/dateHelperFn";

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

export const fetchUserData = createAsyncThunk<TUserData | null, TGetDocument>(
    'user/fetchUserData',
    async ({ collectionName, id }: TGetDocument, { rejectWithValue }) => {

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
                return rejectWithValue('Request was aborted');
            }
            return rejectWithValue(error.message || 'Failed to fetch user data');
        }

        return null;
    }
)


export const updateUserData = createAsyncThunk<TUserData, TUpdateFieldInDoc>(
    'user/updateUserData',
    async (props, { getState, rejectWithValue }) => {

        try {

            const { fieldName, updateValue } = props

            const state = await getState() as RootState;
            const currentData = state.userData.data;

            if (!currentData) {
                return rejectWithValue('User data is not available.');
            }

            await updateFieldInDoc(props);

            const updatedUserData = {
                ...currentData,
                [fieldName]: updateValue,
            } as TUserData

            return updatedUserData;
        } catch (error: any) {
            if (error.message === 'AbortError') {
                return rejectWithValue('Request was aborted');
            }
        }
        return rejectWithValue('Failed to update user data');
    }
)

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;