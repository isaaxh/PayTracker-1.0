import { View, I18nManager } from "react-native";
import React from "react";
import UISwitch from "./ui/UISwitch";
import UIDropDown from "./ui/UIDropDown";
import {
  TSettingsSchema,
  currencyList,
  languageList,
  settingsSchema,
} from "@/constants/Settings";
import { i18n } from "@/services/i18n/i18n";
import UIButton from "./ui/UIButton";
import { useGlobal } from "@/hooks/useGlobal";
import { useColorScheme } from "nativewind";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { router } from "expo-router";

const SettingsForm = () => {
  const { setLanguage, setCurrency } = useGlobal() as GlobalContextProps;
  const { colorScheme } = useColorScheme();

  const { control, handleSubmit, formState } = useForm<TSettingsSchema>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = async (data: TSettingsSchema) => {
    const selectedLanguage = languageList.find(
      (lang) => lang.value === data.language,
    );

    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      AsyncStorage.setItem("language", JSON.stringify(selectedLanguage));
    }

    const selectedCurrency = currencyList.find(
      (curr) => curr.value === data.currency,
    );

    if (selectedCurrency) {
      setCurrency(selectedCurrency);
      AsyncStorage.setItem("currency", JSON.stringify(selectedCurrency));
    }

    const shouldForceRTL =
      selectedLanguage?.value === "ar" && !I18nManager.isRTL;
    const shouldForceLTR =
      selectedLanguage?.value === "en" && I18nManager.isRTL;

    if (shouldForceRTL || shouldForceLTR) {
      try {
        I18nManager.forceRTL(shouldForceRTL);
        await Updates.reloadAsync();
      } catch (error) {
        console.error("Failed to reload the app", error);
      }
    }

    router.back();
  };

  return (
    <View>
      <UISwitch iconName={colorScheme === "dark" ? "sun" : "moon"} />
      <UIDropDown
        data={languageList}
        name="language"
        control={control}
        placeholder={i18n.t("selectLanguage")}
        iconName="global"
      />
      <UIDropDown
        data={currencyList}
        name="currency"
        control={control}
        placeholder={i18n.t("selectCurrency")}
        iconName="dollar"
      />
      <View className="w-full py-7 items-center">
        <UIButton
          variant="fill"
          size="large"
          onPress={handleSubmit(onSubmit)}
          loading={formState.isSubmitting}
        >
          {i18n.t("saveChanges")}
        </UIButton>
      </View>
    </View>
  );
};

export default SettingsForm;
