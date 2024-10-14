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
import { i18n } from "@/services/i18n/i18n";
import UIDropDown from "@/components/ui/UIDropDown";

const SettingScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { setLanguage, language, currency, setCurrency } =
    useGlobal() as GlobalContextProps;

  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center">
      <SettingsHeader />
      <View className="w-full px-6 py-4 space-y-4">
        <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-4 rounded-2xl">
          <UIText>{i18n.t("darkMode")}</UIText>
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

        <DropDownComponent
          placeholder="Select language"
          value={language}
          setValue={setLanguage}
          data={languageList}
          placeholder={i18n.t("selectLanguage")}
        />

        <DropDownComponent
          placeholder="Select currency"
          value={currency}
          setValue={setCurrency}
          data={currencyList}
          placeholder={i18n.t("selectCurrency")}
        />

        {/* <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center justify-between py-2 px-4 rounded-2xl"> */}
        {/*   <UIText>Currency</UIText> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
