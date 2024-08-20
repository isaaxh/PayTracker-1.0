import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, View } from "react-native";
import { useColorScheme } from "nativewind";
import SettingsHeader from "@/components/SettingsHeader";
import UIText from "@/components/ui/UIText";
import Colors from "@/constants/Colors";
import DropDownComponent from "@/components/DropDownComponent";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { currencyList, languageList } from "@/constants/Settings";

const SettingScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { setLanguage, language, currency, setCurrency } =
    useGlobal() as GlobalContextProps;

  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center">
      <SettingsHeader />
      <View className="w-full px-6 py-4 space-y-4">
        <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-4 rounded-2xl">
          <UIText>Dark mode</UIText>
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
        {/* <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-4 rounded-2xl"> */}
        {/*   <UIText>Language</UIText> */}
        {/* </View> */}

        <DropDownComponent
          placeholder="Select language"
          value={language}
          setValue={setLanguage}
          data={languageList}
        />
        <DropDownComponent
          placeholder="Select currency"
          value={currency}
          setValue={setCurrency}
          data={currencyList}
        />

        {/* <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-4 rounded-2xl"> */}
        {/*   <UIText>Currency</UIText> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
