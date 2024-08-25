import { View, TextInput } from "react-native";
import React from "react";
import IconComponent from "../IconComponent";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type UITextInputProps = {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
};

const UITextInput = (props: UITextInputProps) => {
  const { note, setNote } = props;
  const { colorScheme } = useColorScheme();
  return (
    <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 space-x-6 rounded-md flex-row">
      <IconComponent
        name="document text"
        color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
      />
      <TextInput
        className="text-base text-textLight dark:text-textDark flex-1"
        value={note}
        onChangeText={setNote}
        placeholder="Note"
        placeholderTextColor={
          colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
        }
      />
    </View>
  );
};

export default UITextInput;
