import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import React, { ReactNode, forwardRef, use, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "utils/cn";
import { textVariants } from "./UIText";
import RenderIcon, { RenderIconProps } from "../RenderIcon";
import { TFontAwesomeIconProps } from "../FontAwesomeIcon";
import { TIconsaxIconProps } from "../IconsaxIcon";
import Colors from "@/constants/Colors";
import { getTextColorKey } from "@/utils/helperFns";
import { useColorScheme } from "nativewind";

type UIButtonProps = {
  children?: ReactNode;
  containerStyles?: string;
  buttonStyles?: string;
  textStyles?: string;
  primary?: boolean;
  danger?: boolean;
  success?: boolean;
  loading?: boolean;
} & PressableProps &
  OptionalButtonProps &
  ConditionalIconProps &
  TVariantProps;

type OptionalButtonProps =
  | {
      multiText: true;
      text2: ReactNode;
    }
  | {
      multiText?: false;
    };

type ConditionalIconProps =
  | ({
      variant: "icon" | "iconText";
    } & RenderIconProps)
  | {
      variant?: "link" | "outline" | "fill" | "secondary";
      iconLibrary?: never;
      iconProps?: never;
    };

export type TVariantProps = VariantProps<typeof btnStyles>;

const buttonVariants = {
  textColor: {
    default: "text-textLight dark:text-textDark",
    light: "text-textLight",
    dark: "text-textDark",
    success: "text-success",
    danger: "text-danger",
    link: "text-textLink",
  },
  textSize: {
    small: ["text-textLight dark:text-textDark", textVariants.variant.bodySm],
    default: ["text-textLight dark:text-textDark", textVariants.variant.button],
    link: [textVariants.variant.link],
  },
  variant: {
    link: "bg-transparent shadow-none",
    outline: "border border-gray-400",
    fill: "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor",
    icon: "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor",
    iconText:
      "bg-bgSecondaryColor dark:bg-darkBgSecondaryColor items-start border-[0.5px] h-[50px] border-transparent",
  },
  size: {
    small: "px-3 py-2",
    default: "px-6 py-3",
    large: "px-5 py-4 flex-1",
  },
  type: {
    danger: "bg-danger",
    success: "bg-success",
  },
};

const btnStyles = cva(["rounded-lg", "items-center", "justify-center"], {
  variants: buttonVariants,
  compoundVariants: [
    {
      variant: "outline",
      type: "danger",
      className: "bg-transparent shadow-none border-danger",
    },
    {
      variant: "outline",
      type: "success",
      className: "bg-transparent border-success",
    },
  ],
  defaultVariants: {
    variant: "fill",
    size: "default",
    textSize: "default",
    textColor: "default",
  },
});

const UIButton = forwardRef<View, UIButtonProps>(
  (Props: UIButtonProps, forwardedRef) => {
    const {
      variant,
      size,
      textSize,
      textColor,
      type,
      primary,
      danger,
      success,
      iconLibrary,
      iconProps,
      multiText,
      children,
      containerStyles,
      buttonStyles,
      textStyles,
      disabled,
      loading,
      ...props
    } = Props;

    let text2;

    if (Props.multiText) {
      text2 = Props.text2;
    }

    const [isPressed, setPressed] = useState(false);

    const { colorScheme } = useColorScheme();

    const textInnerStyle = [
      buttonVariants.textSize[textSize || "default"],
      buttonVariants.textColor[getTextColorKey({ textColor, variant, type })],
    ];

    const renderIcon = () => {
      if (variant !== "icon" && variant !== "iconText") return null;

      if (iconLibrary === "fontAwesome") {
        return (
          <RenderIcon
            iconLibrary='fontAwesome'
            iconProps={
              primary
                ? {
                    color: Colors.light.text,
                    ...iconProps,
                  }
                : (iconProps as TFontAwesomeIconProps)
            }
          />
        );
      }

      if (iconLibrary === "iconsax") {
        return (
          <RenderIcon
            iconLibrary='iconsax'
            iconProps={
              primary
                ? {
                    color: Colors.light.text,
                    ...iconProps,
                  }
                : (iconProps as TIconsaxIconProps)
            }
          />
        );
      }

      return null;
    };

    return (
      <View
        className={cn(
          "flex-row",
          "items-center",
          "justify-center",
          containerStyles
        )}
      >
        <Pressable
          ref={forwardedRef}
          disabled={disabled}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          className={cn(
            btnStyles({ variant: variant, size: size, type: type }),
            buttonStyles,
            primary && "bg-bgColor",
            isPressed && "opacity-60",
            disabled && "opacity-40"
          )}
          {...props}
        >
          {variant === "iconText" ? (
            <View className='flex-row items-start justify-center space-x-2'>
              <View className='mr-4'>{renderIcon()}</View>
              <Text
                className={cn(
                  textVariants.variant.button,
                  textInnerStyle,
                  textStyles,
                  primary && "text-textLight",
                  (type === "danger" || type === "success") && "text-textDark"
                )}
              >
                {children}
              </Text>
            </View>
          ) : variant === "icon" ? (
            renderIcon()
          ) : multiText ? (
            <>
              <Text
                className={cn(
                  textVariants.variant.button,
                  textInnerStyle,
                  textStyles,
                  primary && "text-textLight",
                  (type === "danger" || type === "success") && "text-textDark"
                )}
              >
                {children}
              </Text>
              <Text
                className={cn(
                  textInnerStyle,
                  textStyles,
                  primary && "text-textLight",
                  (type === "danger" || type === "success") && "text-textDark"
                )}
              >
                {text2}
              </Text>
            </>
          ) : !loading ? (
            <Text
              className={cn(
                textInnerStyle,
                textStyles,

                primary && "text-textLight"
              )}
            >
              {children}
            </Text>
          ) : (
            <View className='h-6'>
              <ActivityIndicator
                size={"small"}
                color={
                  primary
                    ? Colors.light.text
                    : colorScheme === "dark"
                    ? Colors.dark.text
                    : Colors.light.text
                }
              />
            </View>
          )}
        </Pressable>
      </View>
    );
  }
);

export default UIButton;
