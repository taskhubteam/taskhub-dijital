const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm({ name, email, subject, message }) {
  const errors = {};

  if (!name || name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!email || !EMAIL_RE.test(email.trim()))
    errors.email = "Enter a valid email address.";

  if (subject !== undefined && !subject?.trim())
    errors.subject = "Subject is required.";

  if (!message || message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";

  return errors;
}
