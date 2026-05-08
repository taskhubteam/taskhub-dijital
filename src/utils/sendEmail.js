import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendEmail({ name, email, subject, message }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: name,
      from_email: email,
      subject: subject || "New Contact Form Submission",
      message,
      to_email: "taskhubrecruitmentsolutions@gmail.com",
    },
    PUBLIC_KEY
  );
}
