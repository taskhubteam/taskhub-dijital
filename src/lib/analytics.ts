type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event when the tag is loaded (production domain only); a no-op otherwise. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: Gtag }).gtag?.("event", event, params);
}

/** A qualified lead — mark `generate_lead` as a key event in GA4. */
export function trackLead(method: "contact_form" | "whatsapp" | "email" | "calendly") {
  track("generate_lead", { method, page_path: location.pathname });
}
