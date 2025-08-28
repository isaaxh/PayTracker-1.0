import { View } from "react-native";
import React from "react";
import { TTransaction } from "@/constants/Transactions";
import { formatDate } from "utils/dateHelperFn";
import TransactionDetailsCardItem from "./TransactionDetailsCardItem";
import UIText from "./ui/UIText";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "hooks/useGlobal";

type TransactionDetailsCardProps = {
  transaction: TTransaction | null;
};

const TransactionDetailsCard = (props: TransactionDetailsCardProps) => {
  const { transaction } = props;
  const { appSettings } = useGlobal() as GlobalContextProps;
  return (
    <View className='border rounded-xl border-gray-300 dark:border-zinc-700 py-4 px-4'>
      <View className='mb-3'>
        <UIText variant={"headingXs"}>Transaction Details</UIText>
      </View>
      <TransactionDetailsCardItem
        label={"Transaction ID"}
        content={transaction?.id.slice(-12)}
      />
      <TransactionDetailsCardItem label={"Type"} content={transaction?.type} />
      <TransactionDetailsCardItem
        label={"Date"}
        content={transaction && formatDate(transaction.date)}
      />
      <TransactionDetailsCardItem
        label={"Category"}
        content={transaction?.category}
      />
      <TransactionDetailsCardItem
        label={"Amount"}
        content={
          transaction && `${appSettings.currency.value} ${transaction.amount}`
        }
        type={transaction?.type}
      />
      <TransactionDetailsCardItem
        label={"Note"}
        content={transaction?.note === "" ? "no notes" : transaction?.note}
      />
    </View>
  );
};

export default TransactionDetailsCard;
