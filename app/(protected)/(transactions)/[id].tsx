import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import TransactionDetailsHeader from "components/TransactionDetailsHeader";
import TransactionDetailsBody from "components/TransactionDetailsBody";

export default function TransactionDetailsScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor flex-1 items-center'>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <TransactionDetailsHeader />
      <TransactionDetailsBody />
    </SafeAreaView>
  );
}
