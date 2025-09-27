import React from "react";
import UIDropDown from "./ui/UIDropDown";
import {
  currencyList,
  languageList,
  themeList,
  TSettingsSchema,
} from "@/constants/Settings";
import { i18n } from "@/services/i18n/i18n";
import { useColorScheme } from "nativewind";
import { Control } from "react-hook-form";

type props = {
  control: Control<TSettingsSchema>;
};

const ProfileAppSettingsFields = ({ control }: props) => {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <UIDropDown
        data={themeList}
        name='theme'
        control={control}
        placeholder={i18n.t("selectTheme")}
        iconName={colorScheme === "dark" ? "moon" : "sun"}
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
    </>
  );
};

export default ProfileAppSettingsFields;
