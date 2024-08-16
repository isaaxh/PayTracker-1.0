import { Text } from "react-native";
import React, { ReactNode, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { TextProps } from "react-native-svg";
import { cn } from "@/utils/cn";

/* textHeader1 */
/* textHeader2 */
/* textHeader3 */
/* textSubHeader1 */
/* textSubHeader2 */

interface UITextProps extends TextProps, VariantProps<typeof txtStyles> {
  children: ReactNode;
  textStyles?: string;
  alwaysDarkText?: boolean;
}

const textVariants = {
  variant: {
    base: ["text-base text-textLight dark:text-textDark"], // 16px
    headerLg: ["text-4xl font-bold"], // 24px
    header: ["text-2xl mt-4 mb-1.5 font-bold"], // 24px
    header2: [""], // 20px
    header3: ["text-lg font-medium"], // 16px
    subHeader: ["text-xs text-tintLight dark:text-tintDark"], // 16px
    subHeader2: ["text-sm font-medium"], // 12px
    subHeader3: ["text-sm font-light"], // 12px
    bodyText: ["text-xs"], // 12px
  },
};

const txtStyles = cva(textVariants.variant.base, {
  variants: textVariants,
  defaultVariants: {
    variant: "base",
  },
});

const UIText = forwardRef<Text, UITextProps>((Props: UITextProps, ref) => {
  const { children, variant, textStyles, alwaysDarkText, ...props } = Props;
  return (
    <Text
      ref={ref}
      className={cn(
        txtStyles({ variant }),
        textStyles,
        alwaysDarkText ? "text-textDark" : "",
      )}
      {...props}
    >
      {children}
    </Text>
  );
});

export default UIText;
