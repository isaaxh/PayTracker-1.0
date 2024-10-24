import { View, I18nManager } from "react-native";
import React from "react";
import UIDropDown from "./ui/UIDropDown";
import {
  TSettingsSchema,
  currencyList,
  languageList,
  settingsSchema,
  themeList,
} from "@/constants/Settings";
import { i18n } from "@/services/i18n/i18n";
import UIButton from "./ui/UIButton";
import { useGlobal } from "@/hooks/useGlobal";
import { useColorScheme } from "nativewind";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Updates from "expo-updates";
import { router } from "expo-router";
import { useAsync } from "@/hooks/useAsync";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";

const SettingsForm = () => {
  const { appSettings, setAppSettings } = useGlobal() as GlobalContextProps;
  const { logout } = useAuth() as AuthContextProps;
  const { colorScheme, setColorScheme } = useColorScheme();
  const { updateSettings, saveSettings } = useAsync();

  const { control, handleSubmit, formState } = useForm<TSettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: appSettings.theme.value,
      currency: appSettings.currency.value,
      language: appSettings.language.value,
    },
  });

  const onSubmit = async (data: TSettingsSchema) => {
    await saveSettings(appSettings);

    const selectedLanguage = languageList.find(
      (lang) => lang.value === data.language,
    );

    const selectedCurrency = currencyList.find(
      (curr) => curr.value === data.currency,
    );

    const selectedTheme = themeList.find((theme) => theme.value === data.theme);

    if (selectedLanguage) {
      setAppSettings((prev) => ({
        ...prev,
        language: selectedLanguage,
      }));
      await updateSettings("language", selectedLanguage);
    }

    if (selectedCurrency) {
      setAppSettings((prev) => ({
        ...prev,
        currency: selectedCurrency,
      }));
      await updateSettings("currency", selectedCurrency);
    }

    if (selectedTheme) {
      setAppSettings((prev) => ({
        ...prev,
        theme: selectedTheme,
      }));
      await updateSettings("theme", selectedTheme);
      setColorScheme(selectedTheme.value);
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
      <UIDropDown
        data={themeList}
        name="theme"
        control={control}
        placeholder={i18n.t("selectTheme")}
        iconName={colorScheme === "dark" ? "sun" : "moon"}
      />
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
      <View className="w-full py-7 items-center space-y-3">
        <UIButton variant="outline" size="large" onPress={logout}>
          {i18n.t("logout")}
        </UIButton>
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
