import { View } from "react-native";
import React from "react";
import TransactionHeader from "./TransactionHeader";
import TransactionList from "./TransactionList";

const TransactionHistoryFeed = () => {
  return (
    <View>
      <TransactionHeader />
      <TransactionList />
    </View>
  );
};

export default TransactionHistoryFeed;
