import { sendMessage } from "@/lib/api/messages";

type ContactInput = { name: string; email: string; subject?: string; message: string };

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * Saves the message in D1 (admin → Messages; Brevo email too when BREVO_API_KEY is set), then
 * sends the EmailJS notification when EmailJS is configured. Only the D1 save must succeed —
 * a notification failure never loses a lead.
 */
export async function sendEmail({ name, email, subject, message }: ContactInput) {
  await sendMessage({ data: { name, email, subject: subject || "", body: message } });

  if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          subject: subject || "New Contact Form Submission",
          message,
          to_email: "taskhubrecruitmentsolutions@gmail.com",
        },
        PUBLIC_KEY,
      );
    } catch (err) {
      console.error("[contact] EmailJS notification failed", err);
    }
  }
}
