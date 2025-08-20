import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileSettingsBody from "components/ProfileSettingsBody";
import CustomHeader from "@/components/CustomHeader";

const ProfileScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='profile' />
      <ProfileSettingsBody />
    </SafeAreaView>
  );
};

export default ProfileScreen;
