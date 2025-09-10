import { Timestamp } from "firebase/firestore";
import { z } from "zod";



export const TimestampType = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
);

/* auth data types*/

const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be of minimum of 8 characters')
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: passwordSchema.shape.password,
});

export const signupSchema = loginSchema
  .extend({
    name: z.string().min(1, { message: "Name is required" }),
    confirmPassword: passwordSchema.shape.password,
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

// change password data type

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema.shape.password,
  newPassword: passwordSchema.shape.password,
  confirmNewPassword: passwordSchema.shape.password
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'New passwords must match.',
  path: ['confirmNewPassword'],
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: 'New password must be different from old password.',
  path: ['newPassword']
});

export type TChangePassword = z.infer<typeof changePasswordSchema>

/* userData type */

export const userDataSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  imgUri: z.string().optional(),
  email: z.string(),
  createdAt: TimestampType,
  grandTotal: z.number(),
  monthlyTotal: z.object({
    month: z.string(),
    income: z.number(),
    expenses: z.number(),
    total: z.number(),
  }),
});

export type TUserData = z.infer<typeof userDataSchema>;

