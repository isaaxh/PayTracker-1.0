import { View, Text, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UIText from "@/components/ui/UIText";
import { FlashList } from "@shopify/flash-list";
import { i18n } from "@/services/i18n/i18n";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useFetchAllTransactions } from "hooks/useFetchAllTransactions";
import TransactionCard from "@/components/TransactionCard";
import { TCategoryLabel } from "@/constants/Categories";
import { TTransactionType } from "@/constants/Transactions";
import CustomHeader from "@/components/CustomHeader";

const AllTransactionsScreen = () => {
  const { transactions, loading } = useGlobal() as GlobalContextProps;
  const { fetchAllTransactions } = useFetchAllTransactions();

  return (
    <SafeAreaView>
      <View className='w-full h-full'>
        <CustomHeader title='allTransactions' />
        <FlashList
          contentContainerStyle={{ paddingTop: 10 }}
          ListHeaderComponentStyle={{}}
          showsVerticalScrollIndicator={false}
          data={transactions}
          keyExtractor={(item) => item.id}
          estimatedItemSize={96}
          renderItem={({ item }) => (
            <View className='px-4'>
              <TransactionCard
                categoryLabel={item.category as TCategoryLabel}
                id={item.id}
                date={item.date}
                amount={item.amount}
                type={item.type as TTransactionType}
                category={item.category}
                note={item.note}
              />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchAllTransactions}
            />
          }
          ListEmptyComponent={() => (
            <View className='items-center justify-center pt-12'>
              <UIText>{i18n.t("noTransactionHistory")}</UIText>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllTransactionsScreen;
