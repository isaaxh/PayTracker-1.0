import React, { useCallback, useMemo, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useFetchTransactions } from "@/hooks/useTransactions";

import CustomHeader from "@/components/CustomHeader";
import TransactionList from "@/components/TransactionList";
import SearchBar from "@/components/SearchBar";
import { useUserData } from "@/hooks/useUserData";
import RenderIcon from "@/components/RenderIcon";
import UIText from "@/components/ui/UIText";
import UIButton from "@/components/ui/UIButton";
import { useColorScheme } from "nativewind";
import CustomBottomSheet from "@/components/CustomBottomSheet";

const AllTransactionsScreen = () => {
  const localStartDate = new Date("2025-09-29T00:00:00+03:00");
  const localEndDate = new Date("2025-09-29T23:59:59+03:00");

  const { colorScheme } = useColorScheme();

  const startAmount = 100;
  const endAmount = 1500;

  const { data: userData } = useUserData();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenSheet = () => {
    bottomSheetRef.current?.expand();

    console.log("Opening sheet");
  };

  const {
    data: expenseTransactions,
    isLoading,
    refetch: refetchTransactions,
    error: transactionError,
  } = useFetchTransactions({ uid: userData?.uid ?? "" });

  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <View className='flex-row items-center mx-6'>
          <SearchBar />
          <TouchableOpacity
            className='p-3 ml-1 rounded-xl bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'
            onPress={handleOpenSheet}
          >
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{
                name: "setting4",
              }}
            />
          </TouchableOpacity>
        </View>
        <View className='px-6 mt-3'>
          <TransactionList
            transactions={expenseTransactions ?? []}
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
        containerStyles=''
      >
        <UIText>Hello bottom sheet!</UIText>
        <UIButton>Apply</UIButton>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
