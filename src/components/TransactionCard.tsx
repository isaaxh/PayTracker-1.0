import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import TransactionIcon from "./TransactionIcon";
import { CategoryLabelType, categories } from "@/constants/Categories";
import { GlobalStyles } from "@/utils/globalStyles";
import { Link } from "expo-router";

type TransactionIconProps = {
  category: CategoryLabelType;
  transactionId: number;
  amount: number;
  date: string;
};

const TransactionCard = ({
  category,
  transactionId,
  amount,
  date,
}: TransactionIconProps) => {
  return (
    <Link
      href={{
        pathname: `/(transactions)/${transactionId}`,
        params: { id: transactionId },
      }}
      asChild
    >
      <TouchableOpacity
        className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row px-6 py-6 mb-3 rounded-3xl items-center"
        /* style={GlobalStyles.shadow} */
      >
        <TransactionIcon category={categories[category]} />
        <View className="flex-1 ml-3">
          <UIText textStyles="font-bold">{categories[category].label}</UIText>
        </View>
        <View className="items-end">
          <UIText variant="subHeader2">SAR {amount.toFixed(2)}</UIText>
          <UIText variant="subHeader">{date}</UIText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionCard;
