import React, { useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import { TDocOrderBy, TFilterQuery } from "@/services/api/firestoreApi";

import { useFetchTransactions } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilter";
import { useUserData } from "@/hooks/useUserData";

import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import TransactionsFilterSheet from "@/components/TransactionsFilterSheet";
import FilterButton from "@/components/FilterButton";

const AllTransactionsScreen = () => {
  const [filterQuery, setFilterQuery] = useState<TFilterQuery>({
    field: "all",
    value: "all",
  });
  const [docOrderBy, setDocOrderBy] = useState<TDocOrderBy>({
    field: "date",
    value: "desc",
  });

  const { data: userData } = useUserData();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {
    data: transactions,
    isLoading,
    refetch: refetchTransactions,
    error: transactionError,
  } = useFetchTransactions({
    uid: userData?.uid ?? "",
    filter: {
      filterQuery,
      docOrderBy,
    },
  });

  const { filter, setFilter, filteredTransactions } =
    useTransactionFilters(transactions);

  const handleSearchChange = (text: string) => {
    setFilter((prev) => ({ ...prev, searchQuery: text }));
  };

  const handleOpenSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.close();
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
        snapPoints={["50%", "80%"]}
        containerStyles='flex-1'
      >
        <TransactionsFilterSheet
          filterBy={filterQuery}
          onChangeFilterQuery={setFilterQuery}
          docOrderBy={docOrderBy}
          onChangeOrderBy={setDocOrderBy}
          handleCloseSheet={handleCloseSheet}
        />
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
