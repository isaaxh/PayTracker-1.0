import { useUserData } from '@/hooks/useUserData';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";

import { addDocument, removeDocument, TDocOrderBy, TGetAllDocument, TRemoveDocument } from './../services/api/firestoreApi';

import { firestoreTransactionSchema, TFirestoreTransaction, TTransaction } from "@/constants/TransactionsTypes";

import { createTransactionQueryOptions } from "@/utils/queryOptions/createTransactionQueryOptions";

import { ZodError } from "zod";


export type UseTransactionProps = {
    uid: string;
    filter?: FilterProps
}

export type FilterProps = {
    filterQuery?: TGetAllDocument["filterQuery"];
    rangeFilterQuery?: TGetAllDocument["rangeFilterQuery"];
    docOrderBy?: TDocOrderBy;
    docLimit?: number | null;
};

export function useFetchTransactions({ filter }: UseTransactionProps) {
    const uid = useUserData().data?.uid ?? ''
    return useQuery(createTransactionQueryOptions({ uid, filter }, { enabled: !!uid }));
}



export function useAddTransaction() {
    const { data: userData } = useUserData()
    const uid = userData?.uid
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTransaction: TTransaction) => {

            const firestoreReady = {
                ...newTransaction,
                date: Timestamp.fromDate(new Date(newTransaction.date)),
            };
            const parsedTransaction = firestoreTransactionSchema.parse(firestoreReady);

            return addDocument<TFirestoreTransaction>({
                id: newTransaction.id,
                collectionName: `users/${uid}/transactions`,
                data: parsedTransaction
            })
        },
        onMutate: async (newTransaction) => {
            // Cancel any outgoing refetches so they don’t overwrite optimistic update
            await queryClient.cancelQueries({
                queryKey: ['transactions', uid],
            });

            // Snapshot the previous value
            const previousTransactions = queryClient.getQueryData<TTransaction[]>([
                "transactions",
                uid,
            ]);

            // Optimistically update cache
            queryClient.setQueryData<TTransaction[]>(["transactions", uid], (oldTransactions) => [
                ...(oldTransactions ?? []),
                newTransaction,
            ]);

            // Return context for rollback if error
            return { previousTransactions };
        },
        onError: (_err, _variables, context) => {
            console.log('Adding transaction failed.');

            if (!uid || !context?.previousTransactions) return;

            if (_err instanceof ZodError) {
                console.error("Validation error:", _err.errors);
            } else {
                console.error("Error adding transaction:", _err);
            }

            if (context?.previousTransactions)
                queryClient.setQueryData(
                    ['transactions', uid],
                    context.previousTransactions
                );
        },
        onSettled: () => {
            if (!uid) return;

            queryClient.invalidateQueries({
                queryKey: ['transactions', uid],
            });
        },
    })
}


export function useRemoveTransaction(uid: string, filter?: FilterProps) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, collectionName }: TRemoveDocument) => {
            return removeDocument({ id, collectionName })
        },
        onMutate: async ({ id }) => {
            if (!uid) return;

            // Cancel any outgoing refetches so they don’t overwrite optimistic update
            await queryClient.cancelQueries({
                queryKey: createTransactionQueryOptions({ uid, filter }).queryKey,
            });

            // Snapshot the previous value
            const previousTransactions = queryClient.getQueryData<TTransaction[]>(
                createTransactionQueryOptions({ uid, filter }).queryKey
            );

            // Optimistically update cache
            queryClient.setQueryData<TTransaction[]>(
                createTransactionQueryOptions({ uid, filter }).queryKey,
                old => old ? old.filter(tx => tx.id !== id) : []
            );

            // Return context for rollback if error
            return { previousTransactions };
        },
        onError: (_err, _variables, context) => {
            if (!uid || !context?.previousTransactions) return;

            queryClient.setQueryData(
                createTransactionQueryOptions({ uid, filter }).queryKey,
                context.previousTransactions
            );
        },
        onSettled: () => {
            if (!uid) return;

            queryClient.invalidateQueries({
                // queryKey: createTransactionQueryOptions({ uid, filter }).queryKey,
                queryKey: ['transactions', uid],
            });
        },
    })
}
