// Server-only: push a website lead into GoHighLevel (LeadConnector API v2).
//
// Needs a GHL **Private Integration** token with the contacts.write scope (+ contacts.readonly),
// stored as the Worker secret GHL_API_TOKEN. Without it, syncing is skipped (the lead is still saved
// in D1 and emailed). GHL_LOCATION_ID overrides the sub-account id read from the old GHL form.

const API = "https://services.leadconnectorhq.com";
const DEFAULT_LOCATION_ID = "6526b8c3b412c83e9edb9c6f";
/** Custom field "Message" (contact.contactmessage) from the old GHL contact form. */
const MESSAGE_FIELD_ID = "tyPDSWnx23gsvM0eaKgj";
export const GHL_TAG = "website-contact-form";

export type GhlLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  message: string;
};

/** Returns "skipped" when no token is configured; throws on API errors. */
export async function pushLeadToGhl(lead: GhlLead): Promise<"ok" | "skipped"> {
  const token = process.env.GHL_API_TOKEN;
  if (!token) return "skipped";
  const locationId = process.env.GHL_LOCATION_ID || DEFAULT_LOCATION_ID;
  const headers = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "content-type": "application/json",
    accept: "application/json",
  };

  const base = {
    locationId,
    firstName: lead.firstName,
    lastName: lead.lastName || undefined,
    email: lead.email,
    phone: lead.phone || undefined,
    city: lead.city || undefined,
    state: lead.state || undefined,
    source: "taskhubdijital.com contact form",
    tags: [GHL_TAG],
  };

  const upsert = (body: object) =>
    fetch(`${API}/contacts/upsert`, { method: "POST", headers, body: JSON.stringify(body) });

  let res = await upsert({ ...base, customFields: [{ id: MESSAGE_FIELD_ID, field_value: lead.message }] });
  // If the custom field id ever changes, don't lose the lead — retry without it (the note below
  // still carries the message).
  if (res.status === 400 || res.status === 422) res = await upsert(base);
  if (!res.ok) throw new Error(`GHL upsert failed: ${res.status} ${await res.text()}`);

  const json = (await res.json()) as { contact?: { id?: string } };
  const contactId = json.contact?.id;
  if (contactId) {
    const note = await fetch(`${API}/contacts/${contactId}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({ body: `Website contact form (taskhubdijital.com/contact):\n\n${lead.message}` }),
    });
    if (!note.ok) console.error("[ghl] note failed", note.status, await note.text());
  }
  return "ok";
}
