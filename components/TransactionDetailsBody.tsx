import { ScrollView, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useTransaction } from "@/hooks/useTransaction";
import { useUserData } from "@/hooks/useUserData";
import { useRemoveTransaction } from "@/hooks/useTransactions";

import TransactionDetailsList from "./TransactionDetailsList";
import TransactionDetailsActions from "./TransactionDetailsActions";
import TransactionDetailsSummaryCard from "./TransactionDetailsSummaryCard";

const TransactionDetailsBody = () => {
  const { id } = useLocalSearchParams();
  const { data: userData } = useUserData();

  const { transaction, loading } = useTransaction(userData?.uid, id.toString());
  const removeTransaction = userData?.uid
    ? useRemoveTransaction(userData?.uid)
    : null;

  const onPressDelete = () => {
    if (!userData || !transaction || !removeTransaction) {
      console.log("No userData or transaction or removeTransaction found.");
      return;
    }

    removeTransaction.mutate({
      id: transaction.id,
      collectionName: `users/${userData.uid}/transactions`,
    });

    router.back();
  };

  const onPressEdit = () => {};

  return (
    <View className='flex-1 w-full px-6 mt'>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 36,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TransactionDetailsSummaryCard transaction={transaction} />
        <TransactionDetailsList transaction={transaction} />
        <TransactionDetailsActions
          loading={loading}
          onPressDelete={onPressDelete}
          onPressEdit={onPressEdit}
        />
      </ScrollView>
    </View>
  );
};

export default TransactionDetailsBody;
