import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  subject: z.string().trim().max(200).default(""),
  budget: z.string().trim().max(60).default(""),
  body: z.string().trim().min(10, "Please write a few words about your project").max(5000),
  /** Honeypot — real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});

/** The /contact page form (same fields as the old GHL form). */
export const contactPageSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().max(80).default(""),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v === "" || /^[+()\d\s.-]{7,}$/.test(v), "Please enter a valid phone number")
    .default(""),
  city: z.string().trim().max(80).default(""),
  state: z.string().trim().max(80).default(""),
  message: z.string().trim().min(10, "Please write a few words about your project").max(5000),
  /** Honeypot — real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});
