import { Pressable, PressableProps, Text, View } from "react-native";
import React, { ReactNode, forwardRef, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "utils/cn";
import Icon, { TIconProps } from "../Icon";
import { textVariants } from "./UIText";

type UIButtonProps = {
  children?: ReactNode;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
  iconProps?: TIconProps;
} & PressableProps &
  OptionalButtonProps &
  VariantProps<typeof btnStyles>;

type OptionalButtonProps =
  | {
      multiText: true;
      text2: ReactNode;
    }
  | {
      multiText?: false;
    };

const buttonVariants = {
  text: {
    textSm: textVariants.variant.bodySm,
    textDefault: textVariants.variant.button,
    textLink: textVariants.variant.link,
  },

  variant: {
    bare: "bg-transparent shadow-none",
    outline: "border border-gray-400",
    fill: "bg-bgSecondaryColor text-white",
    icon: "p-2 rounded-full bg-gray-100",
  },
  size: {
    sm: "px-3 py-1 items-center rounded-md",
    default: "px-6 py-3 items-center rounded-lg",
    lg: "px-4 py-4 flex-1 items-center rounded-xl",
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
      iconProps = { name: "home", size: 50, color: "#000000" },
      containerStyles,
      buttonStyles,
      textStyles,
      multiText,
      disabled,
      ...props
    } = Props;

    let text2;

    if (Props.multiText) {
      text2 = Props.text2;
    }

    const [isPressed, setPressed] = useState(false);

    const textKey = `text${size}` as keyof typeof buttonVariants.text;
    const textStyle = buttonVariants.text[textKey];

    return (
      <View className={cn("flex-row", containerStyles)}>
        <Pressable
          ref={forwardedRef}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          className={cn(
            btnStyles({ variant: variant, size: size }),
            buttonStyles,
            isPressed && "opacity-60",
            disabled && "opacity-40"
          )}
          {...props}
        >
          {variant === "icon" ? (
            <Icon {...iconProps} />
          ) : multiText ? (
            <>
              <Text
                className={cn(
                  buttonVariants.text.textDefault,
                  variant === "outline" && "text-textLight dark:text-textDark",
                  textStyle,
                  textStyles
                )}
              >
                {children}
              </Text>
              <Text
                className={cn(
                  buttonVariants.text.textDefault,
                  variant === "outline" && "text-textLight dark:text-textDark",
                  textStyle,
                  textStyles
                )}
              >
                {text2}
              </Text>
            </>
          ) : (
            <Text
              className={cn(
                buttonVariants.text.textDefault,
                variant === "outline" && "text-textLight dark:text-textDark",
                textStyle,
                textStyles
              )}
            >
              {children}
            </Text>
          )}
        </Pressable>
      </View>
    );
  }
);

export default UIButton;
