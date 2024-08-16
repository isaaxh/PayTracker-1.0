import { TextInput, TextInputProps, View } from "react-native";
import React, { forwardRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Control, Controller, FieldValues } from "react-hook-form";
import UIText from "./UIText";
import { TLoginSchema, TSignupSchema } from "@/utils/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";

type UIInputProps = {
  name: "name" | "email" | "password" | "confirmPassword";
  control: Control<TSignupSchema | TLoginSchema>;
  isPassword?: boolean;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
} & TextInputProps;

type FormProps<T extends FieldValues> = {
  control: Control<T>;
};

const UIInput = forwardRef<TextInput, UIInputProps>(
  (props: UIInputProps, forwardedRef) => {
    const { name, control } = props;
    const [hidePass, setHidePass] = useState(false);
    const [inputStyles, setInputStyles] = useState("border-gray-200");
    const { colorScheme } = useColorScheme();

    const inputStylesOnFocus = () => {
      setInputStyles("border-primary-100 text-primary-100");
    };
    const inputStylesOnBlur = () => {
      setInputStyles("border-gray-200");
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View className="mb-3">
            <View
              className={cn(
                "border rounded-2xl px-3 py-2 mb-1 flex-row items-center justify-between",
                error
                  ? "border-red-400 bg-red-100"
                  : "border-gray-200 dark:border-zinc-700 dark:bg-darkBgSecondaryColor",
              )}
            >
              <TextInput
                ref={forwardedRef}
                className="flex-1 text-textLight dark:text-textDark"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
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

export default UIInput;
