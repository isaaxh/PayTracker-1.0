import { z } from "zod";
import { categoryLabelEnum } from "./CategoriesTypes";
import { i18n } from "@/services/i18n/i18n";
import { TimestampType } from "@/utils/types";


export const transactionTypeEnum = z.enum(["income", "expense"]);

export const transactionTypeList = [
  { label: i18n.t("income"), value: "income" },
  { label: i18n.t("expense"), value: "expense" },
];

export const transactionSchema = z.object({
  /* id: z.union([z.string(), z.array(z.number())]), */
  id: z.string(),
  date: TimestampType,
  type: transactionTypeEnum,
  category: categoryLabelEnum,
  entity: z
    .string({
      required_error: "Entity is required.",
    })
    .min(1, { message: "Entity cannot be empty." }),
  amount: z
    .number({ message: "Please enter an amount" })
    .min(1, { message: "Amount must be at least 1" })
    .max(500, { message: "Amount must not exceed 500" }),
  note: z.string().optional(),
});

export type TTransaction = z.infer<typeof transactionSchema>;

export const transactionsSchema = z.array(transactionSchema);

export type TTransactions = z.infer<typeof transactionSchema>;

export type TTransactionType = z.infer<typeof transactionTypeEnum>;