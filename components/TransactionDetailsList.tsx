import { View } from "react-native";
import React from "react";
import DetailItemCard from "./DetailItemCard";
import { TTransaction } from "@/constants/TransactionsTypes";
import { formatDate } from "@/utils/dateHelperFn";

type TransactionDetailsListProps = {
  transaction: TTransaction | null;
};

const TransactionDetailsList = ({
  transaction,
}: TransactionDetailsListProps) => {
  return (
    <View>
      <DetailItemCard
        label={"Date"}
        content={transaction && formatDate(transaction.date, "datetime")}
      />
      <DetailItemCard
        label={"Transaction ID"}
        content={transaction?.id.slice(-12)}
      />
      <DetailItemCard label={"Category"} content={transaction?.category} />
      <DetailItemCard label={"Type"} content={transaction?.type} />
      <DetailItemCard
        label={"Note"}
        content={transaction?.note === "" ? "no notes" : transaction?.note}
      />
    </View>
  );
};

export default TransactionDetailsList;
