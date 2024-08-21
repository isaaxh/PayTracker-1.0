import { Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import IconComponent from "./IconComponent";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

interface NavButtonProps {
  variant: "back" | "cancel";
  customStyles?: string;
}

const navButtonVariants = {
  variant: {
    back: ["rounded-xl inline-block justify-center items-center"],
    cancel: ["p-1 inline-block justify-center items-center"],
  },
};

const btnStyles = cva(
  ["bg-bgSecondaryColor dark:bg-darkBgSecondaryColor p-2 rounded-3xl"],
  {
    variants: navButtonVariants,
    defaultVariants: {
      variant: "back",
    },
  },
);

const NavButton = ({ variant, customStyles }: NavButtonProps) => {
  const [isPressed, setPressed] = useState(false);
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      className={cn(btnStyles({ variant: variant }), customStyles)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ opacity: isPressed ? 0.6 : 1 }}
      onPress={() => navigation.goBack()}
    >
      {variant === "back" ? (
        <IconComponent
          name="arrow left"
          color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
          size={20}
        />
      ) : (
        <Entypo
          name="cross"
          size={24}
          color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
        />
      )}
    </Pressable>
  );
};

export default NavButton;
