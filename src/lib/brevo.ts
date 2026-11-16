// Server-only: transactional email through Brevo's HTTP API (Workers can't speak SMTP).

import { SITE_NAME, SITE_URL } from "@/lib/site";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
// taskhubdijital.com is an authenticated domain in Brevo, so any @taskhubdijital.com sender works.
// Override with the BREVO_SENDER var if needed.
const SENDER = () => ({
  name: `${SITE_NAME} — Website`,
  email: process.env.BREVO_SENDER || "no-reply@taskhubdijital.com",
});

/** Leads go to the main inbox, with the team inbox in CC. */
const TO = [{ email: "taskhubdijital@gmail.com", name: SITE_NAME }];
const CC = [{ email: "taskhubteam1@gmail.com", name: `${SITE_NAME} Team` }];

export type ContactEmail = {
  name: string;
  email: string;
  subject: string;
  budget: string;
  body: string;
};

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** Emails a new contact-form message to the site owner. Replying goes straight to the visitor. */
export async function sendContactEmail(msg: ContactEmail): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not set");

  const subject = `New message from ${msg.name}${msg.subject ? `: ${msg.subject}` : ""}`;
  const rows: [string, string][] = [
    ["Name", msg.name],
    ["Email", msg.email],
    ["Subject", msg.subject || "—"],
    ["Budget", msg.budget || "—"],
  ];
  const htmlContent = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#111;max-width:620px">
  <h2 style="margin:0 0 16px;font-size:18px">New message from ${SITE_NAME}</h2>
  <table style="border-collapse:collapse;margin-bottom:16px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("")}</table>
  <div style="white-space:pre-wrap;line-height:1.6;padding:16px;background:#f5f6f8;border-radius:8px">${esc(msg.body)}</div>
  <p style="color:#666;font-size:13px;margin-top:16px">Reply to this email to answer ${esc(msg.name)} directly. All messages are also in <a href="${SITE_URL}/admin/messages">the admin inbox</a>.</p>
</div>`;
  const textContent = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${msg.body}\n`;

  const res = await fetch(BREVO_URL, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: SENDER(),
      to: TO,
      cc: CC,
      replyTo: { email: msg.email, name: msg.name },
      subject,
      htmlContent,
      textContent,
      tags: ["contact-form"],
    }),
  });
  if (!res.ok) throw new Error(`Brevo send failed: ${res.status} ${await res.text()}`);
}
