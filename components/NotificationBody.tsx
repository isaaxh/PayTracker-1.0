import { View } from "react-native";
import React from "react";
import SettingsForm from "./SettingsForm";

const NotificationBody = () => {
  return (
    <View className='flex-1 w-full px-6 py-4 space-y-4'>
      <SettingsForm />
    </View>
  );
};

export default NotificationBody;
