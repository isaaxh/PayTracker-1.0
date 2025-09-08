import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { capitalizeText } from "utils/helperFns";

type DetailItemCardProps<T extends React.ReactNode> = {
  label: string;
  content: T;
  type?: string;
};

function DetailItemCard<T extends React.ReactNode>(
  props: DetailItemCardProps<T>
) {
  const { label, content, type } = props;

  return (
    <View className='px-4 py-2 mb-4 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
      <UIText
        variant={"caption"}
        textStyles='text-tintLight dark:text-tintInactiveDark'
      >
        {label}
      </UIText>
      <UIText
        variant={"bodyLg"}
        textStyles={
          type === "expense"
            ? "text-danger"
            : type === "income"
            ? "text-success"
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

export default DetailItemCard;
