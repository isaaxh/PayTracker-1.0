import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { TTransaction } from "@/constants/Transactions";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useLocalSearchParams } from "expo-router";
import TransactionDetailsCard from "./TransactionDetailsCard";

const TransactionDetailsBody = () => {
  const { id } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<TTransaction | null>(null);
  const { userData, getDocument } = useGlobal() as GlobalContextProps;

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

  return (
    <View className="w-full">
      <TransactionDetailsCard transaction={transaction} />
    </View>
  );
};

export default TransactionDetailsBody;
