"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitContactPage } from "@/lib/api/messages";
import { trackLead } from "@/lib/analytics";

const EMPTY = { firstName: "", lastName: "", email: "", phone: "", city: "", state: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(d) {
  const e = {};
  if (!d.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!EMAIL_RE.test(d.email.trim())) e.email = "Please enter a valid email address.";
  if (d.phone.trim() && !/^[+()\d\s.-]{7,}$/.test(d.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (d.message.trim().length < 10) e.message = "Please write a few words about your project.";
  return e;
}

const inputCls = (err) =>
  `w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${
    err
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-700"
  }`;

function Field({ id, label, error, required, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-primary-600 dark:text-primary-400"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * /contact form. Submits to the submitContactPage server action, which saves the message (admin →
 * Messages), creates/updates the contact in GoHighLevel and emails a copy to the team.
 */
export default function ContactForm() {
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    setServerError("");
    try {
      await submitContactPage({ data });
      trackLead("contact_page");
      setStatus("sent");
      setData(EMPTY);
    } catch (err) {
      setServerError(
        err instanceof Error && err.message.startsWith("Too many")
          ? err.message
          : "Something went wrong. Please try again, or email taskhubdijital@gmail.com.",
      );
      setStatus("error");
    }
  };

  const text = (name, label, { type = "text", required = false, autoComplete, placeholder, className } = {}) => (
    <Field id={`cf-${name}`} label={label} error={errors[name]} required={required} className={className}>
      <input
        id={`cf-${name}`}
        name={name}
        type={type}
        value={data[name]}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `cf-${name}-error` : undefined}
        className={inputCls(errors[name])}
      />
    </Field>
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
      <div className="flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-4 sm:gap-4 sm:px-8 sm:py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:h-11 sm:w-11">
          <Send className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white sm:text-2xl">Send Us a Message</h2>
          <p className="text-sm text-white/85">Tell us about your project and we&apos;ll get back to you.</p>
        </div>
      </div>

      {status === "sent" ? (
        <div className="flex flex-col items-center px-6 py-14 text-center sm:px-8" role="status">
          <CheckCircle2 className="h-14 w-14 text-green-600 dark:text-green-500" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Thank you, your message is on its way!</h3>
          <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-400">
            Our team will review it and reply by email or phone soon.
          </p>
          <button type="button" onClick={() => setStatus("idle")} className="btn-secondary mt-6 px-6 py-3 text-base">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4 p-5 sm:space-y-5 sm:p-8">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-5">
            {text("firstName", "First name", { required: true, autoComplete: "given-name" })}
            {text("lastName", "Last name", { autoComplete: "family-name" })}
            {text("email", "Email", { type: "email", required: true, autoComplete: "email", className: "col-span-2 sm:col-span-1" })}
            {text("phone", "Phone", { type: "tel", autoComplete: "tel", className: "col-span-2 sm:col-span-1" })}
            {text("city", "City", { autoComplete: "address-level2" })}
            {text("state", "State", { autoComplete: "address-level1" })}
          </div>
          <Field id="cf-message" label="Message" error={errors.message} required>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              value={data.message}
              onChange={onChange}
              required
              placeholder="What would you like to build or improve?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cf-message-error" : undefined}
              className={`${inputCls(errors.message)} resize-y`}
            />
          </Field>

          {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="cf-website">Website</label>
            <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={onChange} />
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400" role="alert">
              {serverError}
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn-primary group w-full disabled:cursor-not-allowed disabled:opacity-60">
            {status === "sending" ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            By sending this form you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-primary-600 dark:hover:text-primary-400">
              Privacy Policy
            </a>
            . We use your details only to reply to you.
          </p>
        </form>
      )}
    </div>
  );
}
