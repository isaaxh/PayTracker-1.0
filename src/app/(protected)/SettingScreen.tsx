import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "@/components/SettingsHeader";
import SettingsBody from "@/components/SettingsBody";

const SettingScreen = () => {
  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center">
      <SettingsHeader />
      <SettingsBody />
    </SafeAreaView>
  );
};

export default SettingScreen;
