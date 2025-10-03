import React from "react";
import { I18nManager, View } from "react-native";

import { i18n } from "@/services/i18n/i18n";

import { useUserData } from "@/hooks/useUserData";

import ProfileButton from "./ProfileButton";
import NotificationButton from "./NotificationButton";
import UIText from "./ui/UIText";

const HomeHeader = () => {
  const { data: userData } = useUserData();

  return (
    <View className='flex-row items-center justify-between w-full px-6 py-4'>
      <ProfileButton />
      <View className='flex-1 px-3'>
        <UIText variant='bodySm' textStyles='font-medium'>
          {i18n.t("welcome")}!
        </UIText>
        <UIText
          variant='headingSm'
          textStyles={I18nManager.isRTL ? "text-left" : ""}
        >
          {userData?.displayName?.toString().split(" ")[0]}
        </UIText>
      </View>
      <NotificationButton />
    </View>
  );
};

export default HomeHeader;
