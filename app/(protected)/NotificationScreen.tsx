import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsBody from "@/components/NotificationBody";
import CustomHeader from "@/components/CustomHeader";

const NotificationScreen = () => {
  return (
    <SafeAreaView className='items-center flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='notifications' />
      <SettingsBody />
    </SafeAreaView>
  );
};

export default NotificationScreen;
