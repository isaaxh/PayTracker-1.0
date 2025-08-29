import { z } from "zod";

// Currency rates
export const USDRate = 3.75;

export const languageList: TLanguageSchema[] = [
  { label: "Arabic", value: "ar" },
  { label: "English", value: "en" },
];

export const currencyList: TCurrencySchema[] = [
  { label: "Saudi Riyal", value: "SAR" },
  { label: "US Dollar", value: "USD" },
];

export const themeList: TThemeSchema[] = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "System", value: "system" },
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

export const themeSchema = z.union([
  z.object({
    label: z.literal("Dark"),
    value: z.literal("dark"),
  }),
  z.object({
    label: z.literal("Light"),
    value: z.literal("light"),
  }),
  z.object({
    label: z.literal("System"),
    value: z.literal("system"),
  }),
]);

export const settingsSchema = z.object({
  language: z.union([z.literal("en"), z.literal("ar")]).optional(), // Extract values from languageSchema
  currency: z.union([z.literal("USD"), z.literal("SAR")]).optional(),
  theme: z
    .union([z.literal("dark"), z.literal("light"), z.literal("system")])
    .optional(),
});

const appSettingsSchema = z.object({
  theme: themeSchema,
  language: languageSchema,
  currency: currencySchema,
});

export type TLanguageSchema = z.infer<typeof languageSchema>;
export type TCurrencySchema = z.infer<typeof currencySchema>;
export type TThemeSchema = z.infer<typeof themeSchema>;
export type TSettingsSchema = z.infer<typeof settingsSchema>;
export type TAppSettingsSchema = z.infer<typeof appSettingsSchema>;
