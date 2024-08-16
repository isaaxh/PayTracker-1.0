import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { Link } from "expo-router";

const TransactionHeader = () => {
  return (
    <View className="flex-row justify-between items-center pb-1">
      <UIText variant="header3">Transactions</UIText>
      <Link href="/(transactions)/AllTransactionsScreen" asChild>
        <TouchableOpacity>
          <UIText variant="subHeader">View All</UIText>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TransactionHeader;
