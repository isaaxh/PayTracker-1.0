import { SafeAreaView } from "react-native-safe-area-context";
import AddTransactionHeader from "@/components/AddTransactionHeader";
import AddTransactionBody from "@/components/AddTransactionBody";

export default function AddTransactionModal() {
  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1">
      <AddTransactionHeader />
      <AddTransactionBody />
    </SafeAreaView>
  );
}
