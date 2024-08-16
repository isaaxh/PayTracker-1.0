import { z } from "zod";

export const categories = {
  gas: {
    label: "Gas",
    color: "#2690f2",
    iconName: "gas station",
  },
  food: {
    label: "Food",
    color: "#11c5a8",
    iconName: "heart",
  },
  recharge: {
    label: "Recharge",
    color: "#febd33",
    iconName: "mobile",
  },
  entertainment: {
    label: "Entertainment",
    color: "#e84040",
    iconName: "ticket",
  },
  miscellaneous: {
    label: "Miscellaneous",
    color: "#ff8a65",
    iconName: "element3",
  },
};

const categoryKeys = Object.keys(categories) as Array<keyof typeof categories>;
export const categoryEnum = z.enum(
  categoryKeys as [keyof typeof categories, ...Array<keyof typeof categories>],
);

export type CategoriesType = typeof categories;
export type CategoryType = typeof categories.gas;
export type CategoryLabelType = z.infer<typeof categoryEnum>;
