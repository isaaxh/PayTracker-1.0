import { View } from "react-native";
import React from "react";
import NavButton from "./NavButton";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";

const SettingsHeader = () => {
  return (
    <View className="flex-row items-center py-4 px-6 w-full justify-between">
      <NavButton variant="back" />
      <View className="flex-1 px-6">
        <UIText variant="header" textStyles="my-0">
          {i18n.t("settings")}
        </UIText>
      </View>
    </View>
  );
};

export default SettingsHeader;
