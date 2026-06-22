import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 chars"),
    email: z.email("Invalid mail format"),
    password: z.string().min(6, "Password must be at least 6 chars"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password required"),
  }),
});
