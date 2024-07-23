import * as z from "zod";

export const userSchema = z.object({
    name: z.string().min(1, "Username is required").max(30),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    number: z
      .string()
      .regex(/^\d{10}$/, {
        message: "Phone number must be 10 digits",
      }),
});

export const signinSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Password must have at least 8 characters"),
})