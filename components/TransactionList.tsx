import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import TransactionCard from "./TransactionCard";
import { TTransactionType } from "@/constants/Transactions";
import { TCategoryLabel } from "@/constants/Categories";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useFetchAllTransactions } from "hooks/useFetchAllTransactions";
import { i18n } from "@/services/i18n/i18n";
import UIText from "./ui/UIText";

const TransactionList = () => {
  const { transactions, loading } = useGlobal() as GlobalContextProps;
  const { fetchAllTransactions } = useFetchAllTransactions();

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {!loading && !transactions.length && (
        <View className='pt-12 justify-center items-center'>
          <UIText>{i18n.t("noTransactionHistory")}</UIText>
        </View>
      )}
      <FlashList
        className='py-2'
        contentContainerStyle={{ paddingBottom: 370 }}
        showsVerticalScrollIndicator={false}
        data={transactions}
        estimatedItemSize={96}
        renderItem={({ item }) => (
          <TransactionCard
            categoryLabel={item.category as TCategoryLabel}
            id={item.id}
            date={item.date}
            amount={item.amount}
            type={item.type as TTransactionType}
            category={item.category}
            note={item.note}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchAllTransactions}
          />
        }
      />
    </View>
  );
};

export default TransactionList;
