import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import RenderIcon from "./RenderIcon";

type ProfileSettingsHeaderProps = {
  name: string;
};

const ProfileSettingsHeader = ({ name }: ProfileSettingsHeaderProps) => {
  return (
    <View className='items-center p-0 mb-8'>
      <View className='items-center justify-center inline-block p-2 mb-3 bg-orange-400 rounded-full'>
        <RenderIcon
          iconLibrary='iconsax'
          iconProps={{
            name: "profile",
            color: "#ffffff",
            size: "86",
          }}
        />
      </View>
      <UIText variant={"headingLg"}>{name}</UIText>
    </View>
  );
};

export default ProfileSettingsHeader;
