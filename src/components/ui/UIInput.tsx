import { TextInput, TextInputProps, View } from "react-native";
import React, { ForwardedRef } from "react";
import { cn } from "@/utils/cn";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UIText from "./UIText";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import IconComponent from "../IconComponent";
import { VariantProps, cva } from "class-variance-authority";

type UIInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  isPassword?: boolean;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
  isAmountInput?: boolean;
} & VariantProps<typeof inputStyles> &
  (UIInputPropsWithIcon | UIInputPropsWithoutIcon) &
  TextInputProps;

type UIInputPropsWithIcon = {
  showIcon: true;
  iconName: string;
};
type UIInputPropsWithoutIcon = {
  showIcon?: false;
};

const inputVariants = {
  variant: {
    bare: [""],
    rounded: ["border rounded-2xl"],
    fullyRounded: ["items-end space-x-2 rounded-full py-3 px-16"],
    rectangular: ["rounded-md"],
  },
  size: {
    small: [""],
    default: [""],
    large: [""],
  },
};

const inputStyles = cva(
  [
    "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 flex-row items-center",
  ],
  {
    variants: inputVariants,
    defaultVariants: {
      variant: "rounded",
      size: "default",
    },
  },
);

const UIInput = <T extends FieldValues>(
  props: UIInputProps<T>,
  ref: ForwardedRef<TextInput>,
) => {
  const {
    variant,
    size,
    name,
    control,
    containerStyles,
    showIcon,
    isAmountInput,
  } = props;
  const { colorScheme } = useColorScheme();

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
              inputStyles({ variant: variant, size: size }),
              containerStyles,
              showIcon && "space-x-6",
              error
                ? "border-red-400 bg-red-100"
                : "border-gray-200 dark:border-zinc-700 dark:bg-darkBgSecondaryColor",
            )}
          >
            {showIcon ? (
              <IconComponent
                name={props.iconName}
                color={
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
                }
              />
            ) : null}
            {isAmountInput && <UIText variant="subHeader3">SAR</UIText>}
            <TextInput
              ref={ref}
              className={cn(
                "flex-1 text-base text-textLight dark:text-textDark",
                isAmountInput && "text-2xl",
              )}
              autoCapitalize="none"
              value={value}
              onChangeText={(text) => {
                if (!isAmountInput) {
                  onChange(text);
                  return;
                }
                const cleanedValue = text.replace(/[^0-9.]/g, "");
                const parsedValue = parseInt(cleanedValue, 10);
                if (!isNaN(parsedValue)) {
                  const boundedValue = Math.max(0, Math.min(parsedValue, 500));
                  onChange(boundedValue.toString());
                } else {
                  onChange("");
                }
              }}
              onBlur={onBlur}
              placeholderTextColor={
                colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
              }
              keyboardType={isAmountInput ? "numeric" : "default"}
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
};

export default UIInput;
