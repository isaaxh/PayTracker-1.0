import { View, TextInput, TextInputProps } from "react-native";
import React, { forwardRef } from "react";
import IconComponent from "../IconComponent";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { cn } from "@/utils/cn";
import UIText from "./UIText";
import { Control, Controller } from "react-hook-form";
import { TTransaction } from "@/constants/Transactions";

type UITextInputProps = {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  control: Control<TTransaction>;
} & TextInputProps;

const UITextInput = forwardRef<TextInput, UITextInputProps>(
  (props: UITextInputProps, forwardRef) => {
    const { note, setNote, control } = props;
    const { colorScheme } = useColorScheme();
    return (
      <Controller
        name={"note"}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View className="mb-3">
            <View
              className={cn(
                "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 space-x-6 rounded-md flex-row",
                error
                  ? "border-red-400 bg-red-100"
                  : "border-gray-200 dark:border-zinc-700 dark:bg-darkBgSecondaryColor",
              )}
            >
              <IconComponent
                name="document text"
                color={
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
                }
              />
              <TextInput
                ref={forwardRef}
                className="flex-1 text-textLight dark:text-textDark"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Note"
                placeholderTextColor={
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
                }
                {...props}
              />
            </View>
            {error && (
              <UIText
                variant="bodyText"
                textStyles={"text-left ml-2 self-stretch text-red-400"}
              >
                {error.message}
              </UIText>
            )}
          </View>
        )}
      />
    );
  },
);

export default UITextInput;

{
  /* <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 space-x-6 rounded-md flex-row"> */
}
{
  /*   <IconComponent */
}
{
  /*     name="document text" */
}
{
  /*     color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint} */
}
{
  /*   /> */
}
{
  /*   <TextInput */
}
{
  /*     className="text-base text-textLight dark:text-textDark flex-1" */
}
{
  /*     value={note} */
}
{
  /*     onChangeText={setNote} */
}
{
  /*     placeholder="Note" */
}
{
  /*   /> */
}
{
  /* </View> */
}
