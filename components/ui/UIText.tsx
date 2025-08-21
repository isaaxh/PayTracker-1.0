import { Text } from "react-native";
import React, { ReactNode, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { TextProps } from "react-native-svg";
import { cn } from "utils/cn";

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

export const textVariants = {
  variant: {
    base: ["font-quicksand text-base text-black dark:text-white"], // 16px
    // headerLg: ["text-4xl font-quicksand-bold"], // 24px
    // header: ["text-2xl mt-4 mb-1.5 font-quicksand-bold"], // 24px
    // header2: ["text-xl font-quicksand-bold"], // 20px
    // header3: ["text-lg font-quicksand-medium"], // 16px
    // subHeader: ["text-xs font-quicksand-semibold"], // 16px
    // subHeader2: ["text-sm font-quicksand-bold"], // 12px
    // subHeader3: ["text-sm"], // 12px
    // bodyText: ["text-xs"], // 12px

    headingXL: ["text-4xl font-quicksand-bold"], // 36px - big hero
    headingLg: ["text-3xl font-quicksand-bold"], // 30px
    headingMd: ["text-2xl font-quicksand-bold"], // 24px - section title
    headingSm: ["text-xl font-quicksand-semibold"], // 20px - subsection
    headingXs: ["text-lg font-quicksand-medium"], // 18px

    // BODY
    bodyLg: ["text-base font-quicksand-regular"], // 16px - default body
    bodyMd: ["text-sm font-quicksand-regular"], // 14px
    bodySm: ["text-xs font-quicksand-regular"], // 12px

    // LABELS / CAPTIONS
    labelLg: ["text-sm font-quicksand-semibold"], // 14px - strong label
    labelSm: ["text-xs font-quicksand-semibold"], // 12px
    caption: ["text-[11px] font-quicksand-medium"], // 11px - helper text

    // UTILITY
    button: ["text-base font-quicksand-medium"], // button text
    link: ["text-sm font-quicksand-semibold text-blue-500"], // links
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
        alwaysDarkText && "text-textDark"
      )}
      {...props}
    >
      {children}
    </Text>
  );
});

export default UIText;
