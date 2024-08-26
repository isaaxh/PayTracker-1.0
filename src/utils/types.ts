import { categoryLabelEnum } from "@/constants/Categories";
import { z } from "zod";

/* auth data types*/

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be of minimum of 8 characters"),
});

export const signupSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TSignupSchema = z.infer<typeof signupSchema>;

/* transaction types */

export const transactionSchema = z.object({
  id: z.string(),
  date: z.date(),
  amount: z.number(),
  note: z.string(),
  type: z.enum(["income", "expense"]),
  category: categoryLabelEnum,
});

export type Ttransaction = z.infer<typeof transactionSchema>;

/* userData type */

export const userDataSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  email: z.string(),
  createdAt: z.string(),
  grandTotal: z.number(),
  monthlyTotal: z.object({
    month: z.string(),
    income: z.number(),
    expenses: z.number(),
    total: z.number(),
  }),
  transactions: z.array(transactionSchema).optional(),
});

export type TUserData = z.infer<typeof userDataSchema>;

/* add transaction types*/

export const addTransactionSchema = z.object({
  id: z.string(),
  date: z.date(),
  amount: z.number(),
  type: z.enum(["income", "expense"]),
  category: categoryLabelEnum,
  note: z.string(),
});

export type TAddTransaction = z.infer<typeof addTransactionSchema>;
