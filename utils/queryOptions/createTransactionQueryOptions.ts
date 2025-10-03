import { firestoreTransactionSchema, TTransaction } from "@/constants/TransactionsTypes"
import { UseTransactionProps } from "@/hooks/useTransactions"
import { getAllDocuments } from "@/services/api/firestoreApi"
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";


export const createTransactionQueryOptions = <
    TData extends TTransaction[] = TTransaction[],
    TError = Error
>(
    { uid, filter }: UseTransactionProps,
    options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>) => {
    const { filterQuery, rangeFilterQuery, dateOrder = 'desc', docLimit } = filter ?? {}

    return queryOptions({
        ...options,
        queryKey: ["transactions", uid, { filterQuery, rangeFilterQuery, dateOrder, docLimit }],
        queryFn: async () => {
            const firestoreTransactions = await getAllDocuments({
                collectionName: `users/${uid}/transactions`,
                dateOrder,
                filterQuery,
                rangeFilterQuery,
                docLimit
            }, firestoreTransactionSchema)

            const transactions: TTransaction[] = firestoreTransactions.map((transaction) => ({
                ...transaction,
                date: transaction.date.toDate().toISOString(),
            }));

            return transactions as TData
        },
    })
}