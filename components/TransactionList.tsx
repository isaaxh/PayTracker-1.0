import { RefreshControl, SectionList, View } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { TTransaction, TTransactionType } from "@/constants/Transactions";
import { TCategoryLabel } from "@/constants/Categories";
import { i18n } from "@/services/i18n/i18n";
import UIText from "./ui/UIText";
import { formatDate } from "@/utils/dateHelperFn";
import {
  FetchFilteredTransactionsProps,
  useFetchFilteredTransactions,
} from "hooks/useFetchFilteredTransactions";

type TransactionListProps = {
  showSections?: boolean;
} & FetchFilteredTransactionsProps;

const TransactionList = ({
  showSections = true,
  sortOrder = "desc",
  docLimit,
}: TransactionListProps) => {
  const { fetchFilteredTransactions, filteredTransactions, loading } =
    useFetchFilteredTransactions({ sortOrder: sortOrder, docLimit: docLimit });

  const groupTransactionsByDate = (filteredTransactions: TTransaction[]) => {
    const grouped = filteredTransactions.reduce((acc, filteredTransaction) => {
      const date = formatDate(filteredTransaction.date, "date");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(filteredTransaction);
      return acc;
    }, {} as Record<string, TTransaction[]>);

    return Object.entries(grouped).map(([date, data]) => ({
      title: date,
      data: data,
    }));
  };

  const sectionsData = groupTransactionsByDate(filteredTransactions);

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
            id={item.id}
            date={item.date}
            amount={item.amount}
            type={item.type as TTransactionType}
            category={item.category}
            note={item.note}
            showDate={!showSections}
          />
        )}
        renderSectionHeader={({ section: { title } }) =>
          showSections ? (
            <View className='fixed inset-0 flex px-4 py-2 bg-bgColor/90 dark:bg-darkBgColor/95 blur-xl'>
              <UIText
                variant={"labelLg"}
                textStyles='text-tintLight dark:text-tintDark'
              >
                {title}
              </UIText>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchFilteredTransactions}
          />
        }
        ListEmptyComponent={() => (
          <View className='items-center justify-center pt-12'>
            <UIText>{i18n.t("noTransactionHistory")}</UIText>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionList;
