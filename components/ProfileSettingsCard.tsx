import { View, Text } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { TUserData } from "utils/types";

type ProfileSettingsCardProps = {
  userData: TUserData | null;
};

const ProfileSettingsCard = (props: ProfileSettingsCardProps) => {
  const { userData } = props;
  return (
    <View>
      <View>
        <UIText
          variant={"headingSm"}
          // textStyles='text-gray-400'
        >
          Personal Information
        </UIText>
      </View>
      <View className='px-4 py-5 my-3 space-y-3 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
        <View className='flex-row space-x-3'>
          <UIText>Full Name</UIText>
          <UIText>{userData?.displayName}</UIText>
        </View>
        <View className='flex-row space-x-3'>
          <UIText>Date of birth</UIText>
          <UIText>{userData?.createdAt}</UIText>
        </View>
        <View className='flex-row space-x-3'>
          <UIText>Email</UIText>
          <UIText>{userData?.email}</UIText>
        </View>
      </View>
    </View>
  );
};

export default ProfileSettingsCard;
