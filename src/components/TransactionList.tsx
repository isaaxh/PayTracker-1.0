import { FlatList } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { transactions } from "@/constants/Transactions";
import { CategoryLabelType } from "@/constants/Categories";

const TransactionList = () => {
  return (
    <FlatList
      className="py-2"
      contentContainerStyle={{ paddingBottom: 320 }}
      showsVerticalScrollIndicator={false}
      data={transactions}
      renderItem={({ item }) => (
        <TransactionCard
          category={item.category as CategoryLabelType}
          transactionId={item.id}
          amount={item.amount}
          date={item.date}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TransactionList;
