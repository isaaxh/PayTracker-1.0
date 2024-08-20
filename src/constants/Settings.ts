import { OptionType } from "@/components/DropDownComponent";
import {
  currencyType,
  languageType,
} from "@/services/providers/GlobalProvider";

export const languageList: OptionType<languageType>[] = [
  { label: "Arabic", value: "AR" },
  { label: "English", value: "ENG" },
];

export const currencyList: OptionType<currencyType>[] = [
  { label: "Saudi Riyals", value: "SAR" },
  { label: "US Dollar", value: "USD" },
];
