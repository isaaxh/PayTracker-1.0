import React, { useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import { useFetchTransactions } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilter";
import { useUserData } from "@/hooks/useUserData";

import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import TransactionsFilterSheet from "@/components/TransactionsFilterSheet";
import FilterButton from "@/components/FIlterButton";

const AllTransactionsScreen = () => {
  const { data: userData } = useUserData();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    data: transactions,
    isLoading,
    refetch: refetchTransactions,
    error: transactionError,
  } = useFetchTransactions({ uid: userData?.uid ?? "", filter: {} });

  const { filter, setFilter, filteredTransactions } =
    useTransactionFilters(transactions);

  const handleSearchChange = (text: string) => {
    setFilter((prev) => ({ ...prev, searchQuery: text }));
  };

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />

        <View className='flex-row items-center mx-6'>
          <SearchBar value={filter.searchQuery} onChange={handleSearchChange} />
          <FilterButton onPress={handleOpenSheet} />
        </View>

        <View className='px-6 mt-3'>
          <TransactionList
            transactions={filteredTransactions ?? []}
            transactionStatus={isLoading}
            transactionError={transactionError?.message ?? ""}
            refetchTransactions={refetchTransactions}
            showDate={false}
          />
        </View>
      </View>

      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={["30%"]}
        containerStyles='flex-1'
      >
        <TransactionsFilterSheet />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;

// const localStartDate = new Date("2025-09-29T00:00:00+03:00");
// const localEndDate = new Date("2025-09-29T23:59:59+03:00");
// const { colorScheme } = useColorScheme();
// const startAmount = 100;
// const endAmount = 1500;
