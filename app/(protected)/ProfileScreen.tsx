import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSettingsHeader from "components/ProfileSettingsHeader";
import ProfileSettingsBody from "components/ProfileSettingsBody";

const ProfileScreen = () => {
  return (
    <SafeAreaView className='bg-bgColor dark:bg-darkBgColor flex-1'>
      <ProfileSettingsHeader />
      <ProfileSettingsBody />
    </SafeAreaView>
  );
};

export default ProfileScreen;
