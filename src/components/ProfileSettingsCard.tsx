import { View, Text } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { TUserData } from "@/utils/types";

type ProfileSettingsCardProps = {
  userData: TUserData | null;
};

const ProfileSettingsCard = (props: ProfileSettingsCardProps) => {
  const { userData } = props;
  return (
    <View>
      <View>
        <UIText>IMG:</UIText>
        <UIText>{userData?.imgUri}</UIText>
      </View>
      <View className="flex-row space-x-3">
        <UIText>Name:</UIText>
        <UIText>{userData?.displayName}</UIText>
      </View>
      <View>
        <UIText>Email:</UIText>
        <UIText>{userData?.email}</UIText>
      </View>
    </View>
  );
};

export default ProfileSettingsCard;
