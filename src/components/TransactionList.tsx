import { FlatList } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { TTransactionType, transactions } from "@/constants/Transactions";
import { TCategoryLabel } from "@/constants/Categories";

const TransactionList = () => {
  return (
    <FlatList
      className="py-2"
      contentContainerStyle={{ paddingBottom: 320 }}
      showsVerticalScrollIndicator={false}
      data={transactions}
      renderItem={({ item }) => (
        <TransactionCard
          categoryLabel={item.category as TCategoryLabel}
          transactionId={item.id}
          type={item.type as TTransactionType}
          amount={item.amount}
          date={item.date}
          note={item.note}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TransactionList;
