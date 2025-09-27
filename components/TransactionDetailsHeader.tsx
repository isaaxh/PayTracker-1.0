import { View } from "react-native";
import React from "react";
import NavButton from "./NavButton";

const TransactionDetailsHeader = () => {
  return (
    <View className='flex-row w-full px-6 pt-4 pb-4'>
      <NavButton variant='back' />
    </View>
  );
};

export default TransactionDetailsHeader;
