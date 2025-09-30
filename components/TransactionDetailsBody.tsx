import { ScrollView, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/services/state/store";
import { removeTransaction } from "@/services/state/transactions/transactionSlice";
import { useTransaction } from "@/hooks/useTransaction";

import TransactionDetailsList from "./TransactionDetailsList";
import TransactionDetailsActions from "./TransactionDetailsActions";
import TransactionDetailsSummaryCard from "./TransactionDetailsSummaryCard";
import { useUserData } from "@/hooks/useUserData";

const TransactionDetailsBody = () => {
  const { id } = useLocalSearchParams();
  const { userData } = useUserData();

  const { transaction, loading } = useTransaction(userData?.uid, id.toString());

  const dispatch = useDispatch<AppDispatch>();

  const onPressDelete = () => {
    if (!userData || !transaction) {
      console.log("No userData or transaction found.");
      return;
    }

    dispatch(
      removeTransaction({
        transaction,
        props: {
          id: transaction.id,
          collectionName: `users/${userData.uid}/transactions`,
        },
      })
    );

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
