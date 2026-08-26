import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name using at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .max(254, "Email must be 254 characters or fewer.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(2, "Enter a subject using at least 2 characters.")
    .max(120, "Subject must be 120 characters or fewer.")
    .regex(/^[^\r\n]+$/, "Subject cannot contain line breaks."),
  message: z
    .string()
    .trim()
    .min(10, "Enter a message using at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
  company: z.string().trim().max(100).optional().default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function getContactFieldErrors(error: z.ZodError<ContactFormData>) {
  const flattened = error.flatten().fieldErrors;

  return {
    name: flattened.name?.[0],
    email: flattened.email?.[0],
    subject: flattened.subject?.[0],
    message: flattened.message?.[0],
  };
}
