import { View } from "@/components/Themed";
import UIText from "@/components/ui/UIText";
import NavButton from "@/components/NavButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { useState } from "react";
import UIDropDown from "@/components/ui/UIDropDown";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import AddTransactionHeader from "@/components/AddTransactionHeader";

export default function AddTransactionModal() {
  const [amount, setAmount] = useState("0");
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1">
      <AddTransactionHeader />
      <View className="bg-bgColor dark:bg-darkBgColor items-center mt-16">
        <UIText variant="header3">Add Transaction</UIText>
        <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row space-x-3 items-center py-3 px-20 mt-6 rounded-full">
          <UIText variant="subHeader3">SAR</UIText>
          {/* <UIText variant="header" textStyles="m-0 p-0"></UIText> */}
          <TextInput
            keyboardType="numeric"
            /* className="bg-orange-200" */
            value={amount}
            onChangeText={setAmount}
            style={{
              color:
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            }}
          />
        </View>
        <View className="w-full px-8 mt-12 flex-1">
          <UIDropDown />
        </View>
      </View>
    </SafeAreaView>
  );
}
