import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(100, "Company cannot exceed 100 characters"),
  bio: z.string().trim().max(160, "Bio cannot exceed 160 characters"),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
