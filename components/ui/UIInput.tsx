import { TextInput, TextInputProps, View } from "react-native";
import React, { ForwardedRef, forwardRef } from "react";
import { cn } from "utils/cn";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UIText from "./UIText";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { TIconsaxIconProps } from "../IconsaxIcon";
import { VariantProps, cva } from "class-variance-authority";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "hooks/useGlobal";
import RenderIcon from "../RenderIcon";

type UIInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  isPassword?: boolean;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
  isAmountInput?: boolean;
  formError?: string;
} & VariantProps<typeof inputStyles> &
  (UIInputPropsWithIcon | UIInputPropsWithoutIcon) &
  TextInputProps;

type UIInputPropsWithIcon =
  | {
      showIcon: true;
      iconProps: TIconsaxIconProps;
    }
  | {
      showIcon?: false;
      iconProps?: never;
    };
type UIInputPropsWithoutIcon = {
  showIcon?: false;
};

const inputVariants = {
  variant: {
    bare: [""],
    rounded: ["border rounded-xl"],
    fullyRounded: ["items-end space-x-2 rounded-full py-3 px-12"],
    rectangular: ["border rounded-md"],
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
  }
);

const UIInputInner = <T extends FieldValues>(
  props: UIInputProps<T>,
  ref: ForwardedRef<TextInput>
) => {
  const {
    variant,
    size,
    name,
    control,
    containerStyles,
    showIcon,
    isAmountInput,
    formError,
    ...rest
  } = props;
  const { colorScheme } = useColorScheme();
  const { appSettings } = useGlobal() as GlobalContextProps;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className='mb-3'>
          <View
            className={cn(
              inputStyles({ variant: variant, size: size }),
              containerStyles,
              showIcon && "space-x-6",
              error || formError
                ? "border-danger bg-red-100 dark:bg-red-900 dark:border-red-700"
                : "border-gray-200 dark:border-zinc-700 dark:bg-darkBgSecondaryColor"
            )}
          >
            {showIcon ? (
              <RenderIcon
                iconLibrary='iconsax'
                iconProps={{
                  name: props.iconProps?.name ?? "EmojiHappy",
                  color:
                    colorScheme === "dark"
                      ? Colors.dark.tint
                      : Colors.light.tint,
                }}
              />
            ) : null}
            {isAmountInput && (
              <UIText
                variant='bodyMd'
                textStyles={error || formError ? "text-danger" : ""}
              >
                {appSettings.currency.value}
              </UIText>
            )}
            <TextInput
              ref={ref}
              className={cn(
                "flex-1 h-7 text-base text-textLight dark:text-textDark",
                isAmountInput && "text-2xl"
              )}
              autoCapitalize='none'
              value={value}
              onChangeText={(text) => {
                if (!isAmountInput) {
                  onChange(text);
                  return;
                }
                const cleanedValue = text
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1")
                  .replace(/(\.\d{2})\d+/g, "$1");
                const parsedValue = parseFloat(cleanedValue);
                onChange(parsedValue);
              }}
              onBlur={onBlur}
              placeholderTextColor={
                error || formError
                  ? Colors.global.error
                  : colorScheme === "dark"
                  ? Colors.dark.tint
                  : Colors.light.tint
              }
              keyboardType={isAmountInput ? "numeric" : "default"}
              {...rest}
            />
          </View>
          {error || formError ? (
            <UIText
              variant='caption'
              textStyles={cn(
                "text-left ml-2 mt-2 self-stretch text-danger",
                isAmountInput && "text-center ml-0"
              )}
            >
              {error ? error.message : formError}
            </UIText>
          ) : null}
        </View>
      )}
    />
  );
};

const UIInput = forwardRef(UIInputInner) as <T extends FieldValues>(
  props: UIInputProps<T> & { ref?: ForwardedRef<TextInput> }
) => React.ReactElement;

export default UIInput;
