import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { capitalizeText } from "@/utils/helperFns";

type TransactionDetailsCardItemProps<T extends React.ReactNode> = {
  label: string;
  content: T;
};

function TransactionDetailsCardItem<T extends React.ReactNode>(
  props: TransactionDetailsCardItemProps<T>,
) {
  const { label, content } = props;

  return (
    <View className="flex-row justify-between">
      <UIText variant={"header3"}>{label}:</UIText>
      <UIText variant={"base"}>
        {typeof content === "string" ? capitalizeText(content) : content}
      </UIText>
    </View>
  );
}

export default TransactionDetailsCardItem;
