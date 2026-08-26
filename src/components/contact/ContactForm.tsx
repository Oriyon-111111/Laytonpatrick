"use client";

import { useState, type FormEvent } from "react";

import { contactContent, site } from "@/content/site";

import styles from "./ContactForm.module.css";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type FormState = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  message?: string;
  fieldErrors?: FieldErrors;
};

function isContactResponse(value: unknown): value is ContactResponse {
  return typeof value === "object" && value !== null;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formState === "submitting") {
      return;
    }

    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }

    setFormState("submitting");
    setFieldErrors({});
    setStatusMessage("");

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseBody: unknown = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 422 && isContactResponse(responseBody)) {
          setFieldErrors(responseBody.fieldErrors ?? {});
          setStatusMessage("Please review the highlighted fields and try again.");
        } else {
          setStatusMessage(
            `Something went wrong. Please try again or email ${site.email}.`,
          );
        }
        setFormState("error");
        return;
      }

      form.reset();
      setFormState("success");
      setStatusMessage("Thank you. Your message has been sent.");
    } catch {
      setFormState("error");
      setStatusMessage(
        `Something went wrong. Please try again or email ${site.email}.`,
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className="microLabel">Send a Message</p>

      <div className={styles.fields}>
        <FormField
          id="name"
          label="Name"
          minLength={2}
          maxLength={80}
          autoComplete="name"
          error={fieldErrors.name}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          maxLength={254}
          autoComplete="email"
          error={fieldErrors.email}
        />
        <FormField
          id="subject"
          label="Subject"
          minLength={2}
          maxLength={120}
          error={fieldErrors.subject}
        />

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            minLength={10}
            maxLength={5000}
            required
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message ? (
            <p className={styles.fieldError} id="message-error">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.submitRow}>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={formState === "submitting"}
        >
          <span>{formState === "submitting" ? "Sending…" : "Send Message"}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </button>

        <p className={styles.privacy}>
          {contactContent.privacy.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>

      <p
        className={`${styles.status} ${
          formState === "success" ? styles.success : styles.error
        }`}
        aria-live="polite"
        role="status"
      >
        {statusMessage}
      </p>
    </form>
  );
}

type FormFieldProps = {
  id: FieldName;
  label: string;
  type?: "text" | "email";
  minLength?: number;
  maxLength: number;
  autoComplete?: string;
  error?: string;
};

function FormField({
  id,
  label,
  type = "text",
  minLength,
  maxLength,
  autoComplete,
  error,
}: FormFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p className={styles.fieldError} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
