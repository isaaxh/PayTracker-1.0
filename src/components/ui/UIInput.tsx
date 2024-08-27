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
    rectangular: ["rounded-md "],
    withIcon: ["space-x-6"],
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
  const { variant, size, name, control, containerStyles, showIcon } = props;
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
              showIcon ? "space-x-6" : "",
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
            <TextInput
              ref={ref}
              className="flex-1 text-base text-textLight dark:text-textDark"
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
};

export default UIInput;
