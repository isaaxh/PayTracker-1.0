import { View } from "react-native";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";

const TransactionEmptyState = () => (
  <View className='items-center justify-center pt-12'>
    <UIText>{i18n.t("noTransactionHistory")}</UIText>
  </View>
);

export default TransactionEmptyState;
