import { TTransaction } from "@/constants/TransactionsTypes";
import { formatDate } from "@/utils/dateHelperFn";

export const useGroupedTransactions = (transactions: TTransaction[]) => {
    // if (!transactions) {
    //     console.log('Failed to group sectionsData, no transactions available.');
    //     return
    // }

    const grouped = transactions.reduce((acc, tx) => {
        const date = formatDate(tx.date, "date");
        if (!acc[date]) acc[date] = [];
        acc[date].push(tx);
        return acc;
    }, {} as Record<string, TTransaction[]>);

    return Object.entries(grouped).map(([date, data]) => ({
        title: date,
        data,
    }));
};