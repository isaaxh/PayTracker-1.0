import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsBody from "components/SettingsBody";
import CustomHeader from "@/components/CustomHeader";

const SettingScreen = () => {
  return (
    <SafeAreaView className='items-center flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='settings' />
      <SettingsBody />
    </SafeAreaView>
  );
};

export default SettingScreen;
