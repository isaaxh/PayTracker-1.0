import { z } from "zod";
import { categoryLabelEnum } from "./Categories";
import { i18n } from "@/services/i18n/i18n";
import { Timestamp } from "firebase/firestore";

export const transactionTypeEnum = z.enum(["income", "expense"]);

export const transactionTypeList = [
  { label: i18n.t("income"), value: "income" },
  { label: i18n.t("expense"), value: "expense" },
];

export const TimestampType = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
);

export const transactionSchema = z.object({
  /* id: z.union([z.string(), z.array(z.number())]), */
  id: z.string(),
  type: transactionTypeEnum,
  category: categoryLabelEnum,
  amount: z
    .number({ message: "Please enter an amount" })
    .max(500, { message: "Amount must not exceed 500" }),
  note: z.string().optional(),
  date: TimestampType,
});

export type TTransaction = z.infer<typeof transactionSchema>;

export const transactionsSchema = z.array(transactionSchema);

export type TTransactions = z.infer<typeof transactionSchema>;

export type TTransactionType = z.infer<typeof transactionTypeEnum>;
