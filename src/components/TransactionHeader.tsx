import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { Link } from "expo-router";
import { i18n } from "@/services/i18n/i18n";

const TransactionHeader = () => {
  return (
    <View className="flex-row justify-between items-center pb-1">
      <UIText variant="header3">{i18n.t("transactions")}</UIText>
      <Link href="/(transactions)/AllTransactionsScreen" asChild>
        <TouchableOpacity>
          <UIText variant="subHeader">{i18n.t("viewAll")}</UIText>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TransactionHeader;
