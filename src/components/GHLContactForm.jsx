"use client";

import React, { useEffect } from "react";

const FORM_EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

export default function GHLContactForm() {
  useEffect(() => {
    if (document.querySelector(`script[src="${FORM_EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = FORM_EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="glass-card p-8 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Send Us a Message
      </h2>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/FO8fYwQmYQ42ElcmflCg"
        style={{ width: "100%", height: "896px", border: "none", borderRadius: "7px" }}
        id="inline-FO8fYwQmYQ42ElcmflCg"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Taskhub Digital - Contact Us Form"
        data-height="896"
        data-layout-iframe-id="inline-FO8fYwQmYQ42ElcmflCg"
        data-form-id="FO8fYwQmYQ42ElcmflCg"
        title="Taskhub Digital - Contact Us Form"
      />
    </div>
  );
}
