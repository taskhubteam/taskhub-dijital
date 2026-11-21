"use server";

import { z } from "zod";
import { contactPageSchema, contactSchema } from "@/lib/contact-schema";
import { requireSession } from "@/lib/auth";
import { emailList, sendContactEmail } from "@/lib/brevo";
import { pushLeadToGhl } from "@/lib/ghl";
import { getDb, newId, nowIso } from "@/lib/db";

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  budget: string;
  body: string;
  read: boolean;
  createdAt: string;
};

type MessageRow = Omit<Message, "read" | "createdAt"> & { read: number; created_at: string };


const sendMessageSchema = contactSchema;

export async function sendMessage(input: { data: z.input<typeof sendMessageSchema> }) : Promise<{ ok: true }> {
    const data = sendMessageSchema.parse(input.data);
    if (data.website) return { ok: true }; // bot: pretend success, store nothing

    const db = getDb();
    // Basic flood guard: at most 5 messages per sender email per hour.
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await db
      .prepare("SELECT COUNT(*) AS n FROM messages WHERE email = ? AND created_at > ?")
      .bind(data.email.toLowerCase(), since)
      .first<{ n: number }>();
    if ((recent?.n ?? 0) >= 5) throw new Error("Too many messages — please try again later.");

    await db
      .prepare(
        `INSERT INTO messages (id, name, email, subject, budget, body, read, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
      )
      .bind(
        newId(),
        data.name,
        data.email.toLowerCase(),
        data.subject,
        data.budget,
        data.body,
        nowIso(),
      )
      .run();

    // The message is safely stored; email is a notification on top. If Brevo is down the
    // visitor still gets a success and the message waits in the admin inbox.
    try {
      await sendContactEmail({ ...data, email: data.email.toLowerCase() });
    } catch (err) {
      console.error("[contact] email notification failed", err);
    }
    return { ok: true };
  }

/**
 * The /contact page form: saved in D1 (admin → Messages), pushed into GoHighLevel as a contact
 * (if GHL_API_TOKEN is set) and emailed via Brevo to the usual inboxes plus CONTACT_COPY_TO.
 * Email and GHL are best-effort on top of the stored message.
 */
export async function submitContactPage(input: {
  data: z.input<typeof contactPageSchema>;
}): Promise<{ ok: true }> {
  const data = contactPageSchema.parse(input.data);
  if (data.website) return { ok: true }; // bot: pretend success, store nothing

  const email = data.email.toLowerCase();
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const location = [data.city, data.state].filter(Boolean).join(", ");

  const db = getDb();
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await db
    .prepare("SELECT COUNT(*) AS n FROM messages WHERE email = ? AND created_at > ?")
    .bind(email, since)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= 5) throw new Error("Too many messages — please try again later.");

  const details = [data.phone && `Phone: ${data.phone}`, location && `Location: ${location}`]
    .filter(Boolean)
    .join("\n");
  await db
    .prepare(
      `INSERT INTO messages (id, name, email, subject, budget, body, read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
    )
    .bind(newId(), name, email, "Contact page", "", details ? `${details}\n\n${data.message}` : data.message, nowIso())
    .run();

  const [mail, ghl] = await Promise.allSettled([
    sendContactEmail({
      name,
      email,
      subject: "Contact page",
      budget: "",
      body: data.message,
      extra: [
        ["Phone", data.phone || "—"],
        ["Location", location || "—"],
      ],
      copyTo: emailList(process.env.CONTACT_COPY_TO),
      tag: "contact-page",
    }),
    pushLeadToGhl({ ...data, email }),
  ]);
  if (mail.status === "rejected") console.error("[contact] email notification failed", mail.reason);
  if (ghl.status === "rejected") console.error("[contact] GHL sync failed", ghl.reason);
  return { ok: true };
}

export async function listMessages() : Promise<Message[]> {
    await requireSession();
    const { results } = await getDb()
      .prepare("SELECT * FROM messages ORDER BY created_at DESC LIMIT 500")
      .all<MessageRow>();
    return results.map(({ read, created_at, ...rest }) => ({
      ...rest,
      read: !!read,
      createdAt: created_at,
    }));
  }

export async function countUnreadMessages() : Promise<number> {
    await requireSession();
    const row = await getDb()
      .prepare("SELECT COUNT(*) AS n FROM messages WHERE read = 0")
      .first<{ n: number }>();
    return row?.n ?? 0;
  }

const setMessageReadSchema = z.object({ id: z.string(), read: z.boolean() });

export async function setMessageRead(input: { data: z.input<typeof setMessageReadSchema> }) : Promise<{ ok: true }> {
    const data = setMessageReadSchema.parse(input.data);
    await requireSession();
    await getDb()
      .prepare("UPDATE messages SET read = ? WHERE id = ?")
      .bind(data.read ? 1 : 0, data.id)
      .run();
    return { ok: true };
  }

const deleteMessageSchema = z.object({ id: z.string() });

export async function deleteMessage(input: { data: z.input<typeof deleteMessageSchema> }) : Promise<{ ok: true }> {
    const data = deleteMessageSchema.parse(input.data);
    await requireSession();
    await getDb().prepare("DELETE FROM messages WHERE id = ?").bind(data.id).run();
    return { ok: true };
  }
