import { View } from "react-native";
import React from "react";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import ProfileSettingsCard from "./ProfileSettingsCard";

const ProfileSettingsBody = () => {
  const { userData } = useGlobal() as GlobalContextProps;
  return (
    <View className='mx-7'>
      <ProfileSettingsCard userData={userData} />
    </View>
  );
};

export default ProfileSettingsBody;
