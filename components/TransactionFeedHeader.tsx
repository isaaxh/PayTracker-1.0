import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { Link } from "expo-router";
import { i18n } from "@/services/i18n/i18n";

const TransactionFeedHeader = () => {
  return (
    <View className='flex-row items-center justify-between mb-3'>
      <UIText variant='base'>{i18n.t("transactions")}</UIText>
      <Link href='/(transactions)/AllTransactionsScreen' asChild>
        <TouchableOpacity>
          <UIText variant='labelLg'>{i18n.t("viewAll")}</UIText>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TransactionFeedHeader;
