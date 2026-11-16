"use client";

import { trackLead } from "@/lib/analytics";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/site";

/**
 * Floating "Chat on WhatsApp" button on every public page (rendered by the (site) layout, so
 * never in the admin). Clicks are sent to GA4 as a `generate_lead` event once GA is connected.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with TaskHub Dijital on WhatsApp (${WHATSAPP_DISPLAY})`}
      onClick={() => trackLead("whatsapp")}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25d366] p-3.5 text-[#05230f] shadow-[0_10px_30px_-6px_rgba(37,211,102,.55)] transition hover:-translate-y-0.5 hover:bg-[#2ee072] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:bottom-6 sm:px-5"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 shrink-0 fill-current">
        <path d="M16.003 3C8.832 3 3 8.83 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.62c-1.95 0-3.86-.52-5.53-1.52l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.38 16c0-5.86 4.77-10.62 10.63-10.62 5.85 0 10.6 4.76 10.6 10.62 0 5.86-4.76 10.62-10.61 10.62Zm5.82-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.2 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.14-.29-.22-.61-.38Z" />
      </svg>
      <span className="hidden text-sm font-bold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
