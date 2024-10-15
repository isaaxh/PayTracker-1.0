import { i18n } from "@/services/i18n/i18n";
import { z } from "zod";

export const languageList: TLanguageSchema[] = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
];

export const currencyList: TCurrencySchema[] = [
  { label: "Saudi Riyal", value: "SAR" },
  { label: "US Dollar", value: "USD" },
];

export const languageSchema = z.union([
  z.object({
    label: z.literal("English"),
    value: z.literal("en"),
  }),

  z.object({
    label: z.literal("Arabic"),
    value: z.literal("ar"),
  }),
]);

export const currencySchema = z.union([
  z.object({
    label: z.literal("US Dollar"),
    value: z.literal("USD"),
  }),

  z.object({
    label: z.literal("Saudi Riyal"),
    value: z.literal("SAR"),
  }),
]);

export const settingsSchema = z.object({
  language: z.union([z.literal("en"), z.literal("ar")]), // Extract values from languageSchema
  currency: z.union([z.literal("USD"), z.literal("SAR")]),
});

export type TSettingsSchema = z.infer<typeof settingsSchema>;
export type TLanguageSchema = z.infer<typeof languageSchema>;
export type TCurrencySchema = z.infer<typeof currencySchema>;
