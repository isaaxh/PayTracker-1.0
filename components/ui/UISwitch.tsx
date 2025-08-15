import { View, Switch } from "react-native";
import React from "react";
import UIText from "./UIText";
import { i18n } from "@/services/i18n/i18n";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import IconComponent from "../IconComponent";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TSwitch = {
  iconName?: string;
};

const UISwitch = (props: TSwitch) => {
  const { iconName } = props;
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { setTheme } = useGlobal() as GlobalContextProps;

  const handleToggleSwitch = () => {
    toggleColorScheme();
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      AsyncStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };
  return (
    <View className='bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-5 mb-3 rounded-xl'>
      <View className='mr-6'>
        <IconComponent
          name={iconName ?? ""}
          color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
        />
      </View>
      <View className='flex-1'>
        <UIText>{i18n.t("darkMode")}</UIText>
      </View>
      <Switch
        value={colorScheme === "dark"}
        onChange={handleToggleSwitch}
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
