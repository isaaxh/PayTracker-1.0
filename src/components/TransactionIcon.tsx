import { View } from "react-native";
import React from "react";
import IconComponent from "./IconComponent";
import { TCategory } from "@/constants/Categories";

type TransactionIconProps = {
  category: TCategory | undefined;
};

const TransactionIcon = ({ category }: TransactionIconProps) => {
  return (
    <View
      className="bg-yellow-400 h-12 w-12 items-center justify-center rounded-full"
      style={{ backgroundColor: category?.color ?? "#000000" }}
    >
      <IconComponent name={category?.iconName ?? ""} color="#fefefe" />
    </View>
  );
};

export default TransactionIcon;
