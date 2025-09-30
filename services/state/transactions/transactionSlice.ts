import { firestoreTransactionSchema, TTransaction } from "@/constants/TransactionsTypes"
import { addTransactionDocument, getAllDocuments, removeDocument, TAddTransactionDocument, TGetAllDocument, TRemoveDocument } from "@/services/api/firestoreApi"
import { AsyncThunkConfig, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TStatus = 'idle' | 'pending' | 'success' | 'failed'

type TransactionState = {
    data: TTransaction[] | null
    status: TStatus
    error: string | null
}

const initialState: TransactionState = {
    data: null,
    status: 'idle',
    error: null
};

const transactionSlice = createSlice({
    name: 'transactionState',
    initialState,
    reducers: {
        clearTransactions: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetching all transactions
            .addCase(fetchAllTransactionData.pending, (state) => {
                state.status = 'pending',
                    state.error = null
            })
            .addCase(fetchAllTransactionData.fulfilled, (state, action: PayloadAction<TTransaction[] | null>) => {
                state.status = 'success',
                    state.data = action.payload,
                    state.error = null
            })
            .addCase(fetchAllTransactionData.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to fetch transactions'
            })

            // adding transaction 
            .addCase(addTransaction.pending, (state) => {
                state.status = 'pending',
                    state.error = null
            })
            .addCase(addTransaction.fulfilled, (state) => {
                state.status = 'success',
                    state.error = null
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.status = 'failed',
                    state.error = action.error.message || 'Failed to add transaction'
            })

            // removing transaction 
            .addCase(removeTransaction.pending, (state, action) => {
                state.status = 'pending'
                state.error = null
                const id = action.meta.arg.transaction.id
                if (state.data)
                    state.data = state.data.filter(t => t.id !== id)
                console.log('pending: transaction removed.');

            })
            .addCase(removeTransaction.fulfilled, (state) => {
                state.status = 'success',
                    state.error = null

                console.log('success: no changes.');
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.status = 'failed';

                if (action.payload) {
                    state.data?.push(action.payload.transaction);
                    state.error = action.payload.error;
                    console.log('failed: transaction added back.');
                } else {
                    state.error = action.error.message || 'Failed to remove transaction';
                }
            });
        ;

    }
})

export const fetchAllTransactionData = createAsyncThunk<
    TTransaction[] | null, TGetAllDocument
>(
    'transactions/fetchAllTransactionData',
    async (props: TGetAllDocument, { rejectWithValue }) => {

        try {
            const firestoreTransactions = await getAllDocuments(props, firestoreTransactionSchema)

            const transactions: TTransaction[] = firestoreTransactions.map((transaction) => ({
                ...transaction,
                date: transaction.date.toDate().toISOString(),
            }));

            return transactions
        } catch (error) {
            return rejectWithValue('Failed to fetch all transactions');
        }
    }
)

export const addTransaction = createAsyncThunk<
    void,
    TAddTransactionDocument,
    AsyncThunkConfig
>(
    'transactions/addTransaction',
    async (props: TAddTransactionDocument, { rejectWithValue }) => {
        try {
            await addTransactionDocument(props)
        } catch (error) {
            console.log('Adding transaction document failed: ', error);
            return rejectWithValue('Adding transaction document failed.')
        }
    }
)

export const removeTransaction = createAsyncThunk<
    void,
    { transaction: TTransaction; props: TRemoveDocument },
    { rejectValue: { error: string; transaction: TTransaction } }
>(
    'transactions/removeTransaction',
    async ({ props, transaction }, { rejectWithValue }) => {
        try {
            console.log('removeTransaction: ', props);

            await removeDocument(props);
        } catch (error) {
            console.error('Removing transaction failed:', error);
            return rejectWithValue({
                error: 'Failed to remove transaction.',
                transaction,
            });
        }
    }
);

export const updateTransaction = () => { }

export const { clearTransactions } = transactionSlice.actions
export default transactionSlice.reducer
