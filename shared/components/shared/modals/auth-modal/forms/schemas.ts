import { z } from "zod";

const passwordSchema = z.string().min(4, { message: "Enter a valid password" });

export const formLoginSchema = z.object({
  email: z.email({ message: "Enter a valid email" }),
  password: passwordSchema,
});

export const formRegisterSchema = z
  .object({
    ...formLoginSchema.shape,
    fullName: z.string().min(2, { message: "Enter first and last name" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
