import "server-only";

import { Resend } from "resend";

import type { ContactFormData } from "./validation";

export class ContactEmailConfigurationError extends Error {
  constructor() {
    super("Contact email delivery is not configured.");
    this.name = "ContactEmailConfigurationError";
  }
}

export class ContactEmailDeliveryError extends Error {
  constructor() {
    super("The contact email provider rejected the request.");
    this.name = "ContactEmailDeliveryError";
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    throw new ContactEmailConfigurationError();
  }

  return { apiKey, to, from };
}

export async function sendContactEmail(data: ContactFormData) {
  const config = getEmailConfig();
  const resend = new Resend(config.apiKey);
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\r?\n/g, "<br />");

  const text = [
    "NEW WEBSITE ENQUIRY",
    "",
    "Name:",
    data.name,
    "",
    "Email:",
    data.email,
    "",
    "Subject:",
    data.subject,
    "",
    "Message:",
    data.message,
    "",
    "Submitted via:",
    "laytonpatrick.com/contact",
  ].join("\n");

  const html = `
    <div style="margin:0;padding:32px;background:#f8f7f4;color:#0d0d0d;font-family:Arial,sans-serif;line-height:1.55">
      <div style="max-width:640px;margin:0 auto">
        <p style="margin:0 0 32px;font-size:12px;font-weight:700;letter-spacing:0.14em">NEW WEBSITE ENQUIRY</p>
        <p><strong>Name:</strong><br />${safeName}</p>
        <p><strong>Email:</strong><br />${safeEmail}</p>
        <p><strong>Subject:</strong><br />${safeSubject}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
        <p style="margin-top:32px;color:#66635f;font-size:12px">Submitted via:<br />laytonpatrick.com/contact</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `[Layton Patrick Website] ${data.subject}`,
    html,
    text,
  });

  if (error) {
    throw new ContactEmailDeliveryError();
  }
}
