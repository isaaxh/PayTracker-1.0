import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "./useGlobal";
import { transactionSchema, TTransaction } from "@/constants/Transactions";
import { useState } from "react";

export type FetchFilteredTransactionsProps = {
    sortOrder?: 'asc' | 'desc',
    docLimit?: number | null
}

export const useFetchFilteredTransactions = ({ sortOrder = 'desc', docLimit }: FetchFilteredTransactionsProps) => {
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

            const filteredData = await
                getAllDocuments({
                    collectionName: `users/${userData?.uid}/transactions`,
                    sortBy: "date",
                    sortOrder: sortOrder,
                    docLimit
                }, transactionSchema)

            setFilteredTransactions(filteredData)
        } catch (e) {
            console.log("TransactionList: ", e);
        } finally {
            setLoading(false)
        }
    };
    return { fetchFilteredTransactions, filteredTransactions, loading };
};
