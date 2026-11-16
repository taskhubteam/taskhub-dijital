"use client";

import React, { useEffect } from "react";
import { Send } from "lucide-react";

const FORM_EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";
const FORM_ID = "FO8fYwQmYQ42ElcmflCg";

/**
 * GoHighLevel form (leads go straight into GHL). The form's inner colours come from the GHL form
 * builder — the iframe is cross-origin, so site CSS can't reach inside it. This wrapper gives it the
 * site's card styling (red header, rounded white card) so it reads as part of the page in light and
 * dark mode. form_embed.js resizes the iframe to the form's real height.
 */
export default function GHLContactForm() {
  useEffect(() => {
    if (document.querySelector(`script[src="${FORM_EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = FORM_EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300">
      <div className="flex items-center gap-4 bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5 sm:px-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
          <Send className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Send Us a Message</h2>
          <p className="text-sm text-white/85">Tell us about your project and we&apos;ll get back to you.</p>
        </div>
      </div>
      <div className="bg-white px-2 py-4 sm:px-4">
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          style={{ width: "100%", height: "620px", border: "none", borderRadius: "12px", background: "#fff" }}
          id={`inline-${FORM_ID}`}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Taskhub Digital - Contact Us Form"
          data-height="620"
          data-layout-iframe-id={`inline-${FORM_ID}`}
          data-form-id={FORM_ID}
          title="Contact TaskHub Dijital"
        />
      </div>
    </div>
  );
}
