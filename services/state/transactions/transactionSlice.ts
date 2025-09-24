import { TTransaction } from "@/constants/TransactionsTypes"
import { TGetAllDocument } from "@/services/api/firestoreApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
    reducers: {}
})

 /* const fetchAllTransactionData = createAsyncThunk<TTransaction[] | null, TGetAllDocument>({ */
 /*     'transactions/fetchAllTransactionData', */
 /*     async (props:TGetAllDocument, {rejectWithValue}) => { */
 /**/
 /*         try { */
 /**/
 /*         } catch (error) { */
 /**/
 /*         } */
 /**/
 /*     } */
 /* }) */

export const { } = transactionSlice.actions
export default transactionSlice.reducer
