import { View } from "react-native";
import React from "react";
import TransactionHeader from "./TransactionFeedHeader";
import TransactionList from "./TransactionList";

const TransactionHistoryFeed = () => {
  return (
    <View>
      <TransactionHeader />
      <TransactionList docLimit={5} showSections={false} />
    </View>
  );
};

export default TransactionHistoryFeed;
