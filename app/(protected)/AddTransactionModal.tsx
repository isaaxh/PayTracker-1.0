import { SafeAreaView } from "react-native-safe-area-context";
import AddTransactionHeader from "components/AddTransactionHeader";
import AddTransactionBody from "components/AddTransactionBody";
import { Platform } from "react-native";

export default function AddTransactionModal() {
  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      {Platform.OS !== "ios" && <AddTransactionHeader />}
      <AddTransactionBody />
    </SafeAreaView>
  );
}
