import { TextInput, TextInputProps, View } from "react-native";
import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { Control, Controller, FieldValue } from "react-hook-form";
import UIText from "./UIText";
import { TLoginSchema, TSignupSchema } from "@/utils/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { TTransaction } from "@/constants/Transactions";
import IconComponent from "../IconComponent";

type UIInputProps = {
  name: "name" | "email" | "password" | "confirmPassword" | "note";
  control: Control<TSignupSchema | TLoginSchema | TTransaction>;
  isPassword?: boolean;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
} & (UIInputPropsWithIcon | UIInputPropsWithoutIcon) &
  TextInputProps;

type UIInputPropsWithIcon = {
  showIcon: true;
  iconName: string;
};
type UIInputPropsWithoutIcon = {
  showIcon?: false;
};

const UIInput = forwardRef<TextInput, UIInputProps>(
  (props: UIInputProps, forwardedRef) => {
    const { name, control, containerStyles, showIcon } = props;
    const { colorScheme } = useColorScheme();

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <View
              className={cn(
                /* "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 space-x-6 rounded-md flex-row" */
                containerStyles ??
                  "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor border rounded-2xl px-3 py-2 mb-1 flex-row items-center justify-between",
                error
                  ? "border-red-400 bg-red-100"
                  : "border-gray-200 dark:border-zinc-700 dark:bg-darkBgSecondaryColor",
              )}
            >
              {showIcon ? (
                <IconComponent
                  name={props.iconName}
                  color={
                    colorScheme === "dark"
                      ? Colors.dark.tint
                      : Colors.light.tint
                  }
                />
              ) : null}
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
          </>
        )}
      />
    );
  },
);

export default UIInput;
