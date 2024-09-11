import { FlatList, View } from "react-native";
import React from "react";
import TransactionCard from "./TransactionCard";
import { TTransactionType } from "@/constants/Transactions";
import { TCategoryLabel } from "@/constants/Categories";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import UIText from "./ui/UIText";

const TransactionList = () => {
  const { transactions, loading } = useGlobal() as GlobalContextProps;

  return (
    <>
      {!loading && transactions?.length ? (
        <FlatList
          className="py-2"
          contentContainerStyle={{ paddingBottom: 320 }}
          showsVerticalScrollIndicator={false}
          data={transactions}
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
        />
      ) : (
        <View className="items-center justify-center">
          <UIText>Loading transactions...</UIText>
        </View>
      )}
    </>
  );
};

export default TransactionList;
