import { i18n } from "@/services/i18n/i18n";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string().regex(/^#([0-9a-fA-F]{6})$/), // Validates hex color code
  iconName: z.string(),
});

export const categories = [
  {
    id: "1",
    label: "gas",
    color: "#2690f2",
    iconName: "gas station",
  },
  {
    id: "2",
    label: "food",
    color: "#11c5a8",
    iconName: "heart",
  },
  {
    id: "3",
    label: "recharge",
    color: "#febd33",
    iconName: "mobile",
  },
  {
    id: "4",
    label: "entertainment",
    color: "#e84040",
    iconName: "ticket",
  },
  {
    id: "5",
    label: "miscellaneous",
    color: "#ff8a65",
    iconName: "element3",
  },
];

export type TCategory = z.infer<typeof categorySchema>;

export const categoriesSchema = z.array(categorySchema);

export type TCategories = z.infer<typeof categoriesSchema>;

export const categoryLabelsArray = categories.map((category) => ({
  label: i18n.t(category.label),
  value: category.label,
}));

export const categoryLabelEnum = z.enum([
  "gas",
  "food",
  "recharge",
  "entertainment",
  "miscellaneous",
]);

export type TCategoryLabel = z.infer<typeof categoryLabelEnum>;

categoriesSchema.parse(categories);

/* const categoryKeys = Object.keys(categories) as Array<keyof typeof categories>; */
/* export const categoryEnum = z.enum( */
/*   categoryKeys as [keyof typeof categories, ...Array<keyof typeof categories>], */
/* ); */
/* export type CategoriesType = typeof categories; */
/* export type CategoryType = typeof categories.gas; */
/* export type CategoryLabelType = z.infer<typeof categoryEnum>; */
