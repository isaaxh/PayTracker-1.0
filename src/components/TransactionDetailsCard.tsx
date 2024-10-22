import { View } from "react-native";
import React from "react";
import { TTransaction } from "@/constants/Transactions";
import { formatDate } from "@/utils/dateHelperFn";
import TransactionDetailsCardItem from "./TransactionDetailsCardItem";

type TransactionDetailsCardProps = {
  transaction: TTransaction | null;
};

const TransactionDetailsCard = (props: TransactionDetailsCardProps) => {
  const { transaction } = props;
  return (
    <View className="border rounded-xl border-gray-300 dark:border-zinc-700 py-4 px-4 mx-6">
      <TransactionDetailsCardItem
        label={"Transaction ID"}
        content={transaction?.id.slice(-12, -1)}
      />
      <TransactionDetailsCardItem label={"Type"} content={transaction?.type} />
      <TransactionDetailsCardItem
        label={"Date"}
        content={transaction ? formatDate(new Date(transaction.date)) : ""}
      />
      <TransactionDetailsCardItem
        label={"Category"}
        content={transaction?.category}
      />
      <TransactionDetailsCardItem
        label={"Amount"}
        content={transaction?.amount}
      />
      <TransactionDetailsCardItem
        label={"Note"}
        content={transaction?.note === "" ? "no notes" : transaction?.note}
      />
    </View>
  );
};

export default TransactionDetailsCard;
