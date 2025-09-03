import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { TTransaction } from "@/constants/TransactionsTypes";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import TransactionDetailsCard from "./TransactionDetailsCard";
import UIButton from "./ui/UIButton";
import { useFetchFilteredTransactions } from "hooks/useFetchFilteredTransactions";

const TransactionDetailsBody = () => {
  const { id } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<TTransaction | null>(null);
  const {
    userData,
    getDocument,
    removeDocument,
    transactions,
    setTransactions,
  } = useGlobal() as GlobalContextProps;
  const { fetchFilteredTransactions, loading } = useFetchFilteredTransactions({
    dateOrder: "desc",
  });

  useEffect(() => {
    const getTransactionDoc = async () => {
      try {
        const transaction = await getDocument<TTransaction>({
          collectionName: `users/${userData?.uid}/transactions`,
          id: id.toString(),
        });

        if (transaction !== null) {
          setTransaction(transaction);
        }
      } catch (e) {
        console.log("error loading transaction details: ", e);
      }
    };
    getTransactionDoc();
  }, []);

  const onPressDelete = () => {
    if (transaction) {
      const filteredTransactions = transactions.filter(
        (trans) => transaction?.id !== trans.id
      );

      removeDocument({
        id: transaction?.id,
        collectionName: `users/${userData?.uid}/transactions`,
      });

      setTransactions(filteredTransactions);
      fetchFilteredTransactions();
    } else {
      console.log("no transaction found");
    }

    router.back();
  };

  return (
    <View className='flex-1 w-full px-6 '>
      <TransactionDetailsCard transaction={transaction} />
      <View className='mt-auto mb-4 space-y-3'>
        <UIButton variant={"fill"} size={"large"} disabled={loading}>
          Edit
        </UIButton>
        <UIButton
          onPress={() => {
            onPressDelete();
          }}
          variant={"fill"}
          size={"large"}
          type={"danger"}
          disabled={loading}
        >
          Delete
        </UIButton>
      </View>
    </View>
  );
};

export default TransactionDetailsBody;
