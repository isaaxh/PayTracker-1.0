import { Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { ArrowLeft } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

interface NavButtonProps {
  variant: "back" | "cancel";
}

const navButtonVariants = {
  variant: {
    back: ["rounded-2xl p-3"],
    cancel: ["p-1"],
  },
};

const btnStyles = cva(["rounded-3xl"], {
  variants: navButtonVariants,
  defaultVariants: {
    variant: "back",
  },
});

const NavButton = ({ variant }: NavButtonProps) => {
  const [isPressed, setPressed] = useState(false);
  const navigation = useNavigation();
  return (
    <Pressable
      className={cn(btnStyles({ variant: variant }))}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ backgroundColor: "#ffffff88", opacity: isPressed ? 0.6 : 1 }}
      onPress={() => navigation.goBack()}
    >
      {variant === "back" ? (
        <ArrowLeft size="32" color="#000000" />
      ) : (
        <Entypo name="cross" size={24} color="black" />
      )}
    </Pressable>
  );
};

export default NavButton;
