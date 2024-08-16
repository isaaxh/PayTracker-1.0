import { categoryEnum } from "@/constants/Categories";
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
  amount: z.number(),
  type: z.enum(["income", "expense"]),
  category: categoryEnum,
  date: z.string(),
});

export type Ttransaction = z.infer<typeof transactionSchema>;
