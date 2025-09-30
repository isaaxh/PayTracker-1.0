import React, { useCallback, useRef } from "react";
import { RefreshControl, SectionList, View } from "react-native";
import { useFocusEffect } from "expo-router";

import { TCategoryLabel } from "@/constants/CategoriesTypes";

import { useFetchAllTransactions } from "@/hooks/useFetchAllTransactions";
import { FetchFilteredTransactionsProps } from "hooks/useFetchFilteredTransactions";
import { useGroupedTransactions } from "@/hooks/useGroupedTransactions";

import TransactionSectionHeader from "./TransactionSectionHeader";
import TransactionEmptyState from "./TransactionEmptyState";
import TransactionCard from "./TransactionCard";

type TransactionListProps = {
  showSections?: boolean;
} & FetchFilteredTransactionsProps;

const TransactionList = ({ showSections = true }: TransactionListProps) => {
  const listRef = useRef<SectionList>(null);

  const {
    transactions,
    transactionStatus,
    refetch: refetchTransactions,
  } = useFetchAllTransactions();
  const sectionsData = transactions ? useGroupedTransactions(transactions) : [];

  useFocusEffect(
    useCallback(() => {
      listRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated: false,
        viewOffset: 0,
        viewPosition: 0,
      });
    }, [])
  );

  return (
    <View className='w-full h-full'>
      <SectionList
        ref={listRef}
        contentContainerStyle={{ paddingBottom: 370 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        sections={sectionsData}
        renderItem={({ item }) => (
          <TransactionCard
            categoryLabel={item.category as TCategoryLabel}
            transaction={item}
          />
        )}
        renderSectionHeader={({ section: { title } }) =>
          showSections ? <TransactionSectionHeader title={title} /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={transactionStatus === "pending"}
            onRefresh={refetchTransactions}
          />
        }
        ListEmptyComponent={() => <TransactionEmptyState />}
      />
    </View>
  );
};

export default TransactionList;
