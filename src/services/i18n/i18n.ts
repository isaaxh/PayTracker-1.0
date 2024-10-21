import { I18n } from "i18n-js";
import { homeTranslations } from "./translations/homeTranslation";
import { globalTranslations } from "./translations/globalTranslation";
import { settingsTranslations } from "./translations/settingsTranslation";
import { authTranslations } from "./translations/authTranslation";

const translations = {
  en: {
    ...globalTranslations.en.transactionTranslations,
    ...globalTranslations.en.transactionTranslations.categories,
    ...globalTranslations.en.toastTranslations,
    ...authTranslations.en.authButtons,
    ...authTranslations.en.authFields,
    ...authTranslations.en.authInfo,
    ...homeTranslations.en,
    ...settingsTranslations.en,
  },
  ar: {
    ...globalTranslations.ar.transactionTranslations,
    ...globalTranslations.ar.transactionTranslations.categories,
    ...globalTranslations.ar.toastTranslations,
    ...authTranslations.ar.authButtons,
    ...authTranslations.ar.authFields,
    ...authTranslations.ar.authInfo,
    ...homeTranslations.ar,
    ...settingsTranslations.ar,
  },
};

export const i18n = new I18n(translations);
