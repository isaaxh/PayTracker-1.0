import { View, TouchableOpacity } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import TransactionIcon from "./TransactionIcon";
import { TCategory, TCategoryLabel, categories } from "@/constants/Categories";
import { Link } from "expo-router";
import { TTransactionType } from "@/constants/Transactions";

type TransactionIconProps = {
  categoryLabel: TCategoryLabel;
  transactionId: number;
  type: TTransactionType;
  amount: string;
  date: string;
};

const TransactionCard = ({
  categoryLabel,
  transactionId,
  type,
  amount,
  date,
}: TransactionIconProps) => {
  const category: TCategory | undefined = categories.find(
    (cat) => categoryLabel === cat.label,
  );

  return (
    <Link
      href={{
        pathname: `/(transactions)/${transactionId}`,
        params: { id: transactionId },
      }}
      asChild
    >
      <TouchableOpacity className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row px-6 py-6 mb-3 rounded-3xl items-center">
        <TransactionIcon category={category} />
        <View className="flex-1 ml-3">
          <UIText textStyles="font-bold">{categoryLabel}</UIText>
        </View>
        <View className="items-end">
          <UIText variant="subHeader2">
            {type === "income" ? "+" : "-"} SAR {Number(amount).toFixed(2)}
          </UIText>
          <UIText variant="subHeader">{date}</UIText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionCard;
