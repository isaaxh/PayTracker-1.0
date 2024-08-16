import { Pressable, PressableProps, Text, View } from "react-native";
import React, { ReactNode, forwardRef, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Icon, { TIconProps } from "../Icon";

type UIButtonProps = {
  children?: ReactNode;
  loading?: boolean;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
} & PressableProps &
  OptionalButtonProps &
  iconProps &
  VariantProps<typeof btnStyles>;

type OptionalButtonProps =
  | {
      multiText: true;
      text2: ReactNode;
    }
  | {
      multiText?: false;
    };

type iconProps = {
  iconName?: TIconProps["name"];
  iconSize?: TIconProps["size"];
  iconColor?: TIconProps["color"];
};

const buttonVariants = {
  text: {
    baseText: "text-center font-GiloryRegular",
    smallText: "text-xs font-GilorySemiBold",
    defaultText: "text-base text-gray-600 font-GiloryMedium",
    largeText: "text-base font-GilorySemiBold",
  },
  variant: {
    bare: [""],
    outline: ["border border-gray-400"],
    fill: ["border-orange-200"],
    icon: [""],
  },
  size: {
    bare: [""],
    small: ["px-3 py-1"],
    default: ["py-2 px-4"],
    large: ["py-4 mx-4 flex-1 items-center rounded-3xl"],
  },
};

const btnStyles = cva(["rounded"], {
  variants: buttonVariants,
  defaultVariants: {
    variant: "fill",
    size: "default",
  },
});

const UIButton = forwardRef<View, UIButtonProps>(
  (Props: UIButtonProps, forwardedRef) => {
    const {
      children,
      variant,
      size,
      loading,
      iconName,
      iconSize = 24,
      iconColor = "#000000",
      containerStyles,
      buttonStyles,
      textStyles,
      multiText,
      ...props
    } = Props;

    let text2;

    if (Props.multiText) {
      text2 = Props.text2;
    }

    const [isPressed, setPressed] = useState(false);

    const textKey = `${size}Text` as keyof typeof buttonVariants.text;
    const textStyle = buttonVariants.text[textKey];

    return (
      <View className={cn("flex-row", containerStyles)}>
        <Pressable
          ref={forwardedRef}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          disabled={loading}
          className={cn(
            btnStyles({ variant: variant, size: size }),
            buttonStyles,
            isPressed ? "opacity-60" : "",
            loading ? "opacity-20" : "",
          )}
          {...props}
        >
          {variant === "icon" ? (
            <Icon name={iconName} size={iconSize} color={iconColor} />
          ) : multiText ? (
            <>
              <Text
                className={cn(
                  buttonVariants.text.baseText,
                  textStyle,
                  textStyles,
                )}
              >
                {children}
              </Text>
              <Text
                className={cn(
                  buttonVariants.text.baseText,
                  textStyle,
                  textStyles,
                )}
              >
                {text2}
              </Text>
            </>
          ) : (
            <Text
              className={cn(
                buttonVariants.text.baseText,
                textStyle,
                textStyles,
              )}
            >
              {children}
            </Text>
          )}
        </Pressable>
      </View>
    );
  },
);

export default UIButton;
