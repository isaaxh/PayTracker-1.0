import React, { useCallback, useRef } from "react";
import { RefreshControl, SectionList, View } from "react-native";
import { useFocusEffect } from "expo-router";

import { TCategoryLabel } from "@/constants/CategoriesTypes";
import { TTransaction } from "@/constants/TransactionsTypes";

import { FetchFilteredTransactionsProps } from "hooks/useFetchFilteredTransactions";
import { useGroupedTransactions } from "@/hooks/useGroupedTransactions";

import TransactionSectionHeader from "./TransactionSectionHeader";
import TransactionEmptyState from "./TransactionEmptyState";
import TransactionCard from "./TransactionCard";

type TransactionListProps = {
  showSections?: boolean;
  transactions: TTransaction[];
  // transactionStatus: TStatus;
  transactionStatus: boolean;
  transactionError: string | null;
  refetchTransactions: () => void;
  showDate?: boolean;
} & FetchFilteredTransactionsProps;

const TransactionList = ({
  showSections = true,
  transactions,
  transactionStatus,
  transactionError,
  refetchTransactions,
  showDate = true,
}: TransactionListProps) => {
  const sectionsData = transactions ? useGroupedTransactions(transactions) : [];

  return (
    <View className='w-full h-full'>
      <SectionList
        contentContainerStyle={{ paddingBottom: 370 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        sections={sectionsData}
        renderItem={({ item }) => (
          <TransactionCard
            categoryLabel={item.category as TCategoryLabel}
            transaction={item}
            showDate={showDate}
          />
        )}
        renderSectionHeader={({ section: { title } }) =>
          showSections ? <TransactionSectionHeader title={title} /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={transactionStatus}
            onRefresh={refetchTransactions}
          />
        }
        ListEmptyComponent={() => <TransactionEmptyState />}
      />
    </View>
  );
};

export default TransactionList;
