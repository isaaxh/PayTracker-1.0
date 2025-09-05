import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";

const AllTransactionsScreen = () => {
  const startDate = new Date("2025-08-31T00:00:00Z");
  const endDate = new Date("2025-09-06T23:59:59Z");

  const startAmount = 50;
  const endAmount = 200;
  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <SearchBar />
        <View className='px-6 mt-10'>
          <TransactionList
            dateOrder='desc'
            // filterQuery={{ field: "category", value: "food", dateOrder: "asc" }}
            rangeFilterQuery={{
              field: "date",
              start: startDate,
              end: endDate,
              order: "desc",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
