import { View } from "react-native";
import React from "react";
import IconComponent from "./IconComponent";
import { CategoryType } from "@/constants/Categories";

type TransactionIconProps = {
  category: CategoryType;
};

const TransactionIcon = ({ category }: TransactionIconProps) => {
  return (
    <View
      className="bg-yellow-400 p-4 rounded-full"
      style={{ backgroundColor: category.color }}
    >
      <IconComponent name={category.iconName} color="#fefefe" />
    </View>
  );
};

export default TransactionIcon;
