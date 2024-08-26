import { z } from "zod";
import { categoryLabelEnum } from "./Categories";

export const transactionTypeEnum = z.enum(["income", "expense"]);

export const transactionSchema = z.object({
  id: z.number().int(), // Ensures id is an integer
  type: transactionTypeEnum,
  category: categoryLabelEnum,
  amount: z.number().positive(), // Ensures amount is a positive number
  date: z.union([
    z.literal("Today"),
    z.literal("Yesterday"),
    z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // Ensures date follows the format DD/MM/YYYY
  ]),
});

export const transactionsSchema = z.array(transactionSchema);

export type TTransactionType = z.infer<typeof transactionTypeEnum>;

export type TTransaction = z.infer<typeof transactionSchema>;

export type TTransactions = z.infer<typeof transactionSchema>;

export const transactions = [
  {
    id: 1,
    type: "expense",
    category: "gas",
    amount: 30,
    date: "Today",
  },
  {
    id: 2,
    type: "expense",
    category: "food",
    amount: 5,
    date: "Today",
  },
  {
    id: 3,
    type: "expense",
    category: "recharge",
    amount: 115,
    date: "Yesterday",
  },
  {
    id: 4,
    type: "expense",
    category: "entertainment",
    amount: 50,
    date: "Yesterday",
  },
  {
    id: 5,
    type: "expense",
    category: "miscellaneous",
    amount: 10,
    date: "Yesterday",
  },
  {
    id: 6,
    type: "expense",
    category: "food",
    amount: 15,
    date: "26/07/2024",
  },
  {
    id: 7,
    type: "expense",
    category: "gas",
    amount: 45,
    date: "25/07/2024",
  },
  {
    id: 8,
    type: "expense",
    category: "recharge",
    amount: 60,
    date: "24/07/2024",
  },
  {
    id: 9,
    type: "expense",
    category: "entertainment",
    amount: 100,
    date: "23/07/2024",
  },
  {
    id: 10,
    type: "expense",
    category: "miscellaneous",
    amount: 75,
    date: "22/07/2024",
  },
];

const result = transactionsSchema.safeParse(transactions);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Transactions are valid!");
}
