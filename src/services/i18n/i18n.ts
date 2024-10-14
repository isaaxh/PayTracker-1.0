import { I18n } from "i18n-js";
import { homeTranslations } from "./translations/homeTranslation";
import { globalTranslations } from "./translations/globalTranslation";
import { settingsTranslations } from "./translations/settingsTranslation";

const translations = {
  en: {
    ...globalTranslations.en.transactionTranslations,
    ...globalTranslations.en.transactionTranslations.categories,
    ...globalTranslations.en.toastTranslations,
    ...homeTranslations.en,
    ...settingsTranslations.en,
  },
  ar: {
    ...globalTranslations.ar.transactionTranslations,
    ...globalTranslations.ar.transactionTranslations.categories,
    ...globalTranslations.ar.toastTranslations,
    ...homeTranslations.ar,
    ...settingsTranslations.ar,
  },
};

export const i18n = new I18n(translations);
