import { firestoreTransactionSchema, TFirestoreTransaction, transactionSchema, TTransaction } from "@/constants/TransactionsTypes"
import { addTransactionDocument, getAllDocuments, TAddTransactionDocument, TGetAllDocument } from "@/services/api/firestoreApi"
import { AsyncThunkConfig, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type TransactionState = {
    data: TTransaction[] | null
    status: 'idle' | 'pending' | 'success' | 'failed'
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
                    state.error = action.error.message || 'Failed to fetch transactions'
            });

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

export const { clearTransactions } = transactionSlice.actions
export default transactionSlice.reducer
