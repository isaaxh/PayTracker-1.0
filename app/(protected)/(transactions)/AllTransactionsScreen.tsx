import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";

const AllTransactionsScreen = () => {
  const startDate = new Date("2025-09-01T00:00:00Z");
  const endDate = new Date("2025-09-01T23:59:59Z");

  const startAmount = 50;
  const endAmount = 200;
  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <View className='px-6'>
          <TransactionList
            dateOrder='desc'
            // filterQuery={{ field: "category", value: "food", dateOrder: "asc" }}
            // rangeFilterQuery={{
            //   field: "amount",
            //   start: 100,
            //   end: 300,
            //   order: "desc",
            // }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
