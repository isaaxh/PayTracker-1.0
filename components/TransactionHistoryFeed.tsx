import React from "react";
import { View } from "react-native";

import { useFetchTransactions } from "@/hooks/useTransactions";

import TransactionHeader from "./TransactionFeedHeader";
import TransactionList from "./TransactionList";
import { useUserData } from "@/hooks/useUserData";

const TransactionHistoryFeed = () => {
  const { data: userData } = useUserData();
  const {
    data: recentTransactions,
    isPending,
    refetch: refetchTransactions,
    error: transactionError,
  } = useFetchTransactions({
    uid: userData?.uid ?? "",
    filter: {
      docOrderBy: { field: "date", value: "desc" },
      docLimit: 5,
    },
  });

  return (
    <View>
      <TransactionHeader />
      <TransactionList
        showSections={false}
        transactions={recentTransactions ?? []}
        transactionStatus={isPending}
        transactionError={transactionError?.message ?? ""}
        refetchTransactions={refetchTransactions}
        showDate
      />
    </View>
  );
};

export default TransactionHistoryFeed;
