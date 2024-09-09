import { z } from "zod";
import { categoryLabelEnum } from "./Categories";

export const transactionTypeEnum = z.enum(["income", "expense"]);

export const transactionTypeArray = [
  { label: "income", value: "income" },
  { label: "expense", value: "expense" },
];

const dateSchema = z.date({
  required_error: "Please select a date and time",
  invalid_type_error: "That's not a date!",
});

export const transactionSchema = z.object({
  id: z.union([z.string(), z.array(z.number())]),
  type: transactionTypeEnum,
  category: categoryLabelEnum,
  amount: z
    .number({ message: "Please enter an amount" })
    .max(500, { message: "Amount must not exceed 500" }),
  note: z.string().optional(),
  /* date: z.union([ */
  /*   z.literal("Today"), */
  /*   z.literal("Yesterday"), */
  /*   z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/), // Ensures date follows the format DD/MM/YYYY */
  /* ]), */
  date: z.string(),
});

export type TTransaction = z.infer<typeof transactionSchema>;

export const transactionsSchema = z.array(transactionSchema);

export type TTransactions = z.infer<typeof transactionSchema>;

export type TTransactionType = z.infer<typeof transactionTypeEnum>;

export const transactions = [
  {
    id: "970f2874-fa0b-44b0-b9fd-778f055d99d7",
    type: "expense",
    category: "gas",
    amount: 30,
    note: "Filled gas at jeddah station",
    date: new Date("2024-09-09T01:02:09.382Z").toISOString(),
  },
  {
    id: "623a4f4d-688d-4888-bbc5-9b92176bff8a",
    type: "expense",
    category: "food",
    amount: 5,
    note: "",
    date: new Date("2024-09-09T12:45:23.512Z").toISOString(),
  },
  {
    id: "cab0cb7c-44f3-40a7-89aa-a609b19fc63a",
    type: "expense",
    category: "recharge",
    amount: 155,
    note: "",
    date: new Date("2024-09-08T09:14:56.783Z").toISOString(),
  },
  {
    id: "d305c041-a028-492c-a1f1-294d90868b58",
    type: "expense",
    category: "entertainment",
    amount: 50,
    note: "",
    date: new Date("2024-09-08T18:32:45.234Z").toISOString(),
  },
  {
    id: "53946d88-42a4-4c53-b263-423490b72c90",
    type: "expense",
    category: "miscellaneous",
    amount: 10,
    note: "",

    date: new Date("2024-09-08T18:32:45.234Z").toISOString(),
  },
  {
    id: "22f9b15f-8b14-4e01-a6e0-6b726f5004d2",
    type: "expense",
    category: "food",
    amount: 15,
    note: "",
    date: new Date("2024-09-08T18:32:45.234Z").toISOString(),
  },
  {
    id: "fe7c9cf5-8aba-4299-8ed7-b9cc82af0eba",
    type: "expense",
    category: "gas",
    amount: 45,
    note: "",
    date: new Date("2024-09-09T12:45:23.512Z").toISOString(),
  },
  {
    id: "8b9b9508-b9b5-4a6b-9b59-5ac8b31f7479",
    type: "expense",
    category: "recharge",
    amount: 60,
    note: "",
    date: new Date("2024-09-09T12:45:23.512Z").toISOString(),
  },
  {
    id: "aecaece3-6dfd-4c3d-be61-afd603e3a844",
    type: "expense",
    category: "entertainment",
    amount: 100,
    note: "",
    date: new Date("2024-09-09T12:45:23.512Z").toISOString(),
  },
  {
    id: "c25e5b06-03ab-45cb-8d14-61ec9de629a8",
    type: "expense",
    category: "miscellaneous",
    amount: 75,
    note: "",
    date: new Date("2024-09-09T12:45:23.512Z").toISOString(),
  },
];

const result = transactionsSchema.safeParse(transactions);

if (!result.success) {
  console.error(result.error.format());
} else {
  console.log("Transactions are valid!");
}
