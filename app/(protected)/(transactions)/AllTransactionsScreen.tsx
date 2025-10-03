import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFetchTransactions } from "@/hooks/useTransactions";

import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import { useUserData } from "@/hooks/useUserData";

const AllTransactionsScreen = () => {
  const localStartDate = new Date("2025-09-29T00:00:00+03:00");
  const localEndDate = new Date("2025-09-29T23:59:59+03:00");

  const startAmount = 100;
  const endAmount = 1500;

  const { data: userData } = useUserData();

  const {
    data: expenseTransactions,
    isLoading,
    refetch: refetchTransactions,
    error: transactionError,
  } = useFetchTransactions({ uid: userData?.uid ?? "" });

  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <SearchBar />
        <View className='px-6 mt-10'>
          <TransactionList
            transactions={expenseTransactions ?? []}
            transactionStatus={isLoading}
            transactionError={transactionError?.message ?? ""}
            refetchTransactions={refetchTransactions}
            showDate={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
