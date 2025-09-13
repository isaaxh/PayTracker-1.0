import { I18nManager, View } from "react-native";
import React from "react";
import ProfileButton from "./ProfileButton";
import NotificationButton from "./NotificationButton";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";
import { useSelector } from "react-redux";
import { RootState } from "@/services/state/store";

const HomeHeader = () => {
  const { user } = useSelector((state: RootState) => state.authState);

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
          {user?.displayName?.toString().split(" ")[0]}
        </UIText>
      </View>
      <NotificationButton />
    </View>
  );
};

export default HomeHeader;
