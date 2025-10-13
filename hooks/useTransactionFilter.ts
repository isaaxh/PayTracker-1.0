import { TCategories } from "@/constants/CategoriesTypes";
import { TTransaction } from "@/constants/TransactionsTypes"
import { useMemo, useState } from "react";

export type TransactionFilterState = {
    searchQuery: string;
    sortBy:
    | "date-newest"
    | "date-oldest"
    | "amount-highest"
    | "amount-lowest"
    | "category";
    by: {
        date: "all" | "today" | "week" | "month" | "custom";
        amount: "all" | "under-50" | "50-200" | "200+";
        category: "all" | TCategories;
    };
};

export const useTransactionFilters = (transactions: TTransaction[] | undefined) => {
    const [filter, setFilter] = useState<TransactionFilterState>({
        searchQuery: '',
        sortBy: 'date-newest',
        by: {
            date: 'all',
            amount: 'all',
            category: 'all'
        }
    })


    const filteredTransactions = useMemo(() => transactions?.filter((tx) => {
        const searchLower = filter.searchQuery.toLowerCase();
        if (!searchLower) return true;

        return (
            tx.entity.toLowerCase().includes(searchLower) ||
            tx.note?.toLowerCase().includes(searchLower) ||
            tx.category.toLowerCase().includes(searchLower) ||
            tx.amount.toString().includes(searchLower)
        );
    }), [transactions, filter.searchQuery]);

    return { filter, setFilter, filteredTransactions }
}