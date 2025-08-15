import { View } from "react-native";
import React from "react";
import NavButton from "./NavButton";

const TransactionDetailsHeader = () => {
  return (
    <View className="flex-row w-full py-4 px-6">
      <NavButton variant="back" />
    </View>
  );
};

export default TransactionDetailsHeader;
