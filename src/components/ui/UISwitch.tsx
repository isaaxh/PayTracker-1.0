import { View, Switch } from "react-native";
import React from "react";
import UIText from "./UIText";
import { i18n } from "@/services/i18n/i18n";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import IconComponent from "../IconComponent";

type TSwitch = {
  iconName?: string;
};

const UISwitch = (props: TSwitch) => {
  const { iconName } = props;
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-3 px-5 mb-3 rounded-xl">
      <View className="mr-6">
        <IconComponent
          name={iconName ?? ""}
          color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
        />
      </View>
      <View className="flex-1">
        <UIText>{i18n.t("darkMode")}</UIText>
      </View>
      <Switch
        value={colorScheme === "dark"}
        onChange={toggleColorScheme}
        trackColor={{
          true: Colors.light.tint,
          false: Colors.dark.tint,
        }}
        thumbColor={
          colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
        }
      />
    </View>
  );
};

export default UISwitch;
