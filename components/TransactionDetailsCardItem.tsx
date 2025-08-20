import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { capitalizeText } from "utils/helperFns";

type TransactionDetailsCardItemProps<T extends React.ReactNode> = {
  label: string;
  content: T;
  type?: string;
};

function TransactionDetailsCardItem<T extends React.ReactNode>(
  props: TransactionDetailsCardItemProps<T>
) {
  const { label, content, type } = props;

  const expenseStyles = "text-red-600";
  const incomeStyles = "text-green-600";

  return (
    <View className='flex-row justify-between'>
      <UIText variant={"caption"}>{label}</UIText>
      <UIText
        variant={"labelSm"}
        textStyles={
          type === "expense"
            ? expenseStyles
            : type === "income"
            ? incomeStyles
            : ""
        }
      >
        {!content
          ? "-"
          : typeof content === "string" && label !== "Transaction ID"
          ? capitalizeText(content)
          : content}
      </UIText>
    </View>
  );
}

export default TransactionDetailsCardItem;
