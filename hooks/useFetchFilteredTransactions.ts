import { transactionSchema, TTransaction } from "@/constants/TransactionsTypes";
import { useState } from "react";
import { useFetchUserData } from "./useFetchUserData";
import { getAllDocuments, TFilterQuery, TRangeFilterQuery } from "@/services/api/firestoreApi";

export type FetchFilteredTransactionsProps = {
    dateOrder?: 'asc' | 'desc',
    docLimit?: number,
    filterQuery?: TFilterQuery,
    rangeFilterQuery?: TRangeFilterQuery
}

export const useFetchFilteredTransactions = ({ dateOrder = 'desc', docLimit, filterQuery, rangeFilterQuery }: FetchFilteredTransactionsProps) => {
    const [filteredTransactions, setFilteredTransactions] = useState<
        TTransaction[] | []
    >([]);
    const { userData } = useFetchUserData()
    const [loading, setLoading] = useState(false)

    const fetchFilteredTransactions = async () => {
        setLoading(true)
        try {
            if (!userData) {
                return;
            }

            const params = {
                collectionName: `users/${userData?.uid}/transactions`,
                dateOrder: dateOrder,
                docLimit,
                ...(filterQuery && { filterQuery }),
                ...(rangeFilterQuery && { rangeFilterQuery })
            };

            const filteredData = await getAllDocuments(params, transactionSchema);

            setFilteredTransactions(filteredData)
        } catch (e) {
            console.log("FilteredTransactionList: ", e);
        } finally {
            setLoading(false)
        }
    };
    return { fetchFilteredTransactions, filteredTransactions, loading };
};
