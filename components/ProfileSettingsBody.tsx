import { View } from "react-native";
import React from "react";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useColorScheme } from "nativewind";
import ProfileSettingsForm from "./ProfileSettingsForm";

const ProfileSettingsBody = () => {
  const { colorScheme } = useColorScheme();
  const { userData } = useGlobal() as GlobalContextProps;
  return (
    <View className='mx-7 mt-3 flex-1'>
      <ProfileSettingsForm />
    </View>
  );
};

export default ProfileSettingsBody;
