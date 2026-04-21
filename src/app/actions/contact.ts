"use server";

import { z } from "zod";
import { sendBookingNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") errors[key] = issue.message;
    }
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const { name, email, company, message } = parsed.data;

  const adminEmail = process.env.CONTACT_EMAIL;
  if (!adminEmail) {
    console.error("CONTACT_EMAIL env var not set");
    return { success: false, message: "Something went wrong. Please try again." };
  }

  try {
    await sendBookingNotification({
      to: adminEmail,
      fromName: process.env.SITE_NAME || "Contact Form",
      customerName: name,
      customerEmail: email,
      itemTitle: company ? `Contact from ${company}` : "Website Enquiry",
      message,
    });
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }

  return { success: true, message: "Message sent." };
}
