import { View } from "react-native";
import React from "react";
import ProfileButton from "./ProfileButton";
import SettingsButton from "./SettingsButton";
import UIText from "./ui/UIText";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";

const HomeHeader = () => {
  const {
    authState: { user },
  } = useAuth() as AuthContextProps;
  return (
    <View className="flex-row justify-between items-center w-full px-6 py-4">
      <ProfileButton />
      <View className="flex-1 px-3">
        <UIText variant="subHeader" textStyles="font-medium">
          Welcome!
        </UIText>
        <UIText variant="header3">
          {user?.displayName?.toString().split(" ")[0]}
        </UIText>
      </View>
      <SettingsButton />
    </View>
  );
};

export default HomeHeader;
