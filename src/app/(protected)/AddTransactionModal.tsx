import { SafeAreaView } from "react-native-safe-area-context";
import AddTransactionHeader from "@/components/AddTransactionHeader";
import AddTransactionBody from "@/components/AddTransactionBody";
import { Platform } from "react-native";

export default function AddTransactionModal() {
  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1">
      {Platform.OS !== "ios" && <AddTransactionHeader />}
      <AddTransactionBody />
    </SafeAreaView>
  );
}
