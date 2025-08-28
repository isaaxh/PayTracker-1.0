import { View } from "react-native";
import React from "react";
import ProfileSettingsForm from "./ProfileSettingsForm";

const ProfileSettingsBody = () => {
  return (
    <View className='flex-1 mt-3 mx-7'>
      <ProfileSettingsForm />
    </View>
  );
};

export default ProfileSettingsBody;
