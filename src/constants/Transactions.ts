import { z } from "zod";
import { categoryLabelEnum } from "./Categories";

export const transactionTypeEnum = z.enum(["income", "expense"]);

export const transactionTypeArray = [
  { label: "income", value: "1" },
  { label: "expense", value: "2" },
];

export const transactionSchema = z.object({
  id: z.number().int(), // Ensures id is an integer
  type: transactionTypeEnum,
  category: categoryLabelEnum,
  amount: z.string(), // Ensures amount is a positive number
  note: z.string(),
  date: z.union([
    z.literal("Today"),
    z.literal("Yesterday"),
    z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // Ensures date follows the format DD/MM/YYYY
  ]),
});

export type TTransaction = z.infer<typeof transactionSchema>;

export const transactionsSchema = z.array(transactionSchema);

export type TTransactions = z.infer<typeof transactionSchema>;

export type TTransactionType = z.infer<typeof transactionTypeEnum>;

export const transactions = [
  {
    id: 1,
    type: "expense",
    category: "gas",
    amount: "30",
    note: "",
    date: "Today",
  },
  {
    id: 2,
    type: "expense",
    category: "food",
    amount: "5",

    note: "",
    date: "Today",
  },
  {
    id: 3,
    type: "expense",
    category: "recharge",
    amount: "115",
    note: "",
    date: "Yesterday",
  },
  {
    id: 4,
    type: "expense",
    category: "entertainment",
    amount: "50",
    note: "",
    date: "Yesterday",
  },
  {
    id: 5,
    type: "expense",
    category: "miscellaneous",
    amount: "10",
    note: "",
    date: "Yesterday",
  },
  {
    id: 6,
    type: "expense",
    category: "food",
    amount: "15",
    note: "",
    date: "26/07/2024",
  },
  {
    id: 7,
    type: "expense",
    category: "gas",
    amount: "45",
    note: "",
    date: "25/07/2024",
  },
  {
    id: 8,
    type: "expense",
    category: "recharge",
    amount: "60",
    note: "",
    date: "24/07/2024",
  },
  {
    id: 9,
    type: "expense",
    category: "entertainment",
    amount: "100",
    note: "",
    date: "23/07/2024",
  },
  {
    id: 10,
    type: "expense",
    category: "miscellaneous",
    amount: "75",
    note: "",
    date: "22/07/2024",
  },
];

const result = transactionsSchema.safeParse(transactions);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Transactions are valid!");
}
