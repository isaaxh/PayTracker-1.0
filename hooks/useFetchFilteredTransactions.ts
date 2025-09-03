import { GlobalContextProps, TFilterQuery } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { transactionSchema, TTransaction } from "@/constants/TransactionsTypes";
import { useState } from "react";

export type FetchFilteredTransactionsProps = {
    dateOrder?: 'asc' | 'desc',
    docLimit?: number,
    filterQuery?: TFilterQuery
}

export const useFetchFilteredTransactions = ({ dateOrder = 'desc', docLimit, filterQuery }: FetchFilteredTransactionsProps) => {
    const [filteredTransactions, setFilteredTransactions] = useState<
        TTransaction[] | []
    >([]);
    const { userData, getAllDocuments } = useGlobal() as GlobalContextProps;
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
                ...(filterQuery && { filterQuery })
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
