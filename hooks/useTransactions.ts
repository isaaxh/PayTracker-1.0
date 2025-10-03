import { useQuery } from "@tanstack/react-query";

import { TGetAllDocument } from './../services/api/firestoreApi';

import { createTransactionQueryOptions } from "@/utils/queryOptions/createTransactionQueryOptions";

export type UseTransactionProps = {
    uid: string;
    filter?: TransactionFilterProps
}

export type TransactionFilterProps = {
    filterQuery?: TGetAllDocument["filterQuery"];
    rangeFilterQuery?: TGetAllDocument["rangeFilterQuery"];
    dateOrder?: "asc" | "desc";
    docLimit?: number | null;
};

export function useFetchTransactions({ uid, filter }: UseTransactionProps) {

    return useQuery(createTransactionQueryOptions({ uid, filter }, { enabled: !!uid }));
}