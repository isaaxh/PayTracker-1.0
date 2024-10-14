import { OptionType } from "@/components/DropDownComponent";
import { i18n } from "@/services/i18n/i18n";
import {
  currencyType,
  languageType,
} from "@/services/providers/GlobalProvider";

/* export const languageList: OptionType<languageType>[] = [ */
/*   { label: "Arabic", value: "ar" }, */
/*   { label: "English", value: "en" }, */
/* ]; */

export const languageList = [
  { label: i18n.t("arabic"), value: "ar" },
  { label: i18n.t("english"), value: "en" },
];

export const currencyList = [
  { label: i18n.t("saudiRiyal"), value: "SAR" },
  { label: i18n.t("usDollar"), value: "USD" },
];

/* export const currencyList: OptionType<currencyType>[] = [ */
/*   { label: "Saudi Riyals", value: "SAR" }, */
/*   { label: "US Dollar", value: "USD" }, */
/* ]; */
