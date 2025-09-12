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
import { useGlobal } from "hooks/useGlobal";
import { useColorScheme } from "nativewind";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as Updates from "expo-updates";
import { Link, router } from "expo-router";
import { useAsync } from "hooks/useAsync";
import { useAuth } from "hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";

const ProfileSettingsForm = () => {
  const { appSettings, setAppSettings } = useGlobal() as GlobalContextProps;
  const { logout } = useAuth() as AuthContextProps;
  const { colorScheme, setColorScheme } = useColorScheme();
  const { updateSettings, saveSettings } = useAsync();
  const { userData } = useGlobal() as GlobalContextProps;

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<TSettingsSchema>({
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
      (lang) => lang.value === data.language
    );

    const selectedCurrency = currencyList.find(
      (curr) => curr.value === data.currency
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
        return;
      } catch (error) {
        console.error("Failed to reload the app", error);
      }
    }

    router.back();
  };

  const onPressLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <View className='flex-1'>
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
        <UIText variant={"headingLg"}>{userData?.displayName}</UIText>
      </View>
      <View className='mb-auto'>
        <Link href='/(protected)/PersonalInfoScreen' asChild>
          <UIButton
            variant={"iconText"}
            iconLibrary='iconsax'
            iconProps={{ name: "profile" }}
            size={"large"}
            buttonStyles='mb-3'
          >
            Personal Information
          </UIButton>
        </Link>
        <Link href='/(protected)/ChangePassScreen' asChild>
          <UIButton
            variant={"iconText"}
            iconLibrary='iconsax'
            iconProps={{ name: "lock" }}
            size={"large"}
            buttonStyles='mb-3'
          >
            Change password
          </UIButton>
        </Link>
        <UIDropDown
          data={themeList}
          name='theme'
          control={control}
          placeholder={i18n.t("selectTheme")}
          iconName={colorScheme === "dark" ? "sun" : "moon"}
        />
        <UIDropDown
          data={languageList}
          name='language'
          control={control}
          placeholder={i18n.t("selectLanguage")}
          iconName='global'
        />
        <UIDropDown
          data={currencyList}
          name='currency'
          control={control}
          placeholder={i18n.t("selectCurrency")}
          iconName='dollar'
        />
        <UIButton
          variant={"iconText"}
          iconLibrary='iconsax'
          iconProps={{ name: "logout" }}
          size={"large"}
          onPress={onPressLogout}
          textColor={"danger"}
        >
          {i18n.t("logout")}
        </UIButton>
      </View>
      <View className='w-full pb-4'>
        <UIButton
          variant='fill'
          size='large'
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
        >
          {i18n.t("saveChanges")}
        </UIButton>
      </View>
    </View>
  );
};

export default ProfileSettingsForm;
