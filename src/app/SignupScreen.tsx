import React from "react";
import SignupForm from "@/components/SignupForm";
import { View } from "react-native";

const SignupScreen = () => {
  return (
    <View className="bg-bgColor dark:bg-darkBgColor flex-1 px-4 py-6">
      <SignupForm />
    </View>
  );
};

export default SignupScreen;
