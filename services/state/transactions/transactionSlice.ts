import { firestoreTransactionSchema, TFirestoreTransaction, transactionSchema, TTransaction } from "@/constants/TransactionsTypes"
import { getAllDocuments, TGetAllDocument } from "@/services/api/firestoreApi"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export const { clearTransactions } = transactionSlice.actions
export default transactionSlice.reducer
