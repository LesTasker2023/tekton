"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/app/actions/contact";
import { CheckCircle } from "lucide-react";
import styles from "./ContactForm.module.scss";

export interface ContactFormProps {
  /** Heading above the form */
  heading?: string;
  /** Custom success message after submission */
  confirmationMessage?: string;
}

interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

const initialState: FormState = {
  success: false,
  message: "",
};

export function ContactForm({
  heading = "Get in Touch",
  confirmationMessage,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.success) {
    return (
      <div className={styles.contact__success}>
        <CheckCircle size={32} />
        <p>
          {confirmationMessage ??
            "Thanks for reaching out. We'll get back to you soon."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.contact}>
      {heading && <h3 className={styles.contact__title}>{heading}</h3>}

      <form action={formAction} className={styles.contact__form}>
        <Input
          name="name"
          label="Name"
          required
          error={state.errors?.name}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          required
          error={state.errors?.email}
        />
        <Input
          name="company"
          label="Company"
          error={state.errors?.company}
        />

        <div className={styles.contact__field}>
          <label htmlFor="contact-message" className={styles.contact__label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={styles.contact__textarea}
            rows={5}
            required
          />
          {state.errors?.message && (
            <span className={styles.contact__fieldError}>
              {state.errors.message}
            </span>
          )}
        </div>

        {state.message && !state.success && (
          <p className={styles.contact__error} role="alert">
            {state.message}
          </p>
        )}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
