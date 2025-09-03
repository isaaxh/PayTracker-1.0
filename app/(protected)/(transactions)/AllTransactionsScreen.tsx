import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";

const AllTransactionsScreen = () => {
  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <View className='px-6'>
          <TransactionList
            filterQuery={{
              field: "category",
              value: "entertainment",
              dateOrder: "desc",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
