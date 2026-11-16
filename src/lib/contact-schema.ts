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
