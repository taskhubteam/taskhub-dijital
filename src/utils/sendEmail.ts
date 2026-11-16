import { sendMessage } from "@/lib/api/messages";

type ContactInput = { name: string; email: string; subject?: string; message: string };

/**
 * Sends a website form (home contact form, AI assessment form) to the server: the message is
 * saved in D1 (admin → Messages) and emailed through Brevo to taskhubdijital@gmail.com with
 * taskhubteam1@gmail.com in CC. The /contact page uses the GHL form instead.
 */
export async function sendEmail({ name, email, subject, message }: ContactInput) {
  await sendMessage({ data: { name, email, subject: subject || "", body: message } });
}
