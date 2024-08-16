import { View } from "react-native";
import React from "react";
import LoginForm from "@/components/LoginForm";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="bg-bgColor dark:bg-darkBgColor flex-1 px-4 py-6">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <LoginForm />
    </View>
  );
};

export default index;
