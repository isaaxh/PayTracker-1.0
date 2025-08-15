import { View, TextInput } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type AmountInputProps = {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
};

const AmountInput = (props: AmountInputProps) => {
  const { amount, setAmount } = props;
  const { colorScheme } = useColorScheme();
  return (
    <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row space-x-2 items-end py-3 px-20 mt-6 rounded-full">
      <UIText variant="subHeader3">SAR</UIText>
      <TextInput
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
          fontSize: 24,
        }}
      />
    </View>
  );
};

export default AmountInput;
