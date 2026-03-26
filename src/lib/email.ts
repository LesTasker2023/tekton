import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailParams {
  to: string;
  fromName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemTitle: string;
  date?: string;
  timeSlot?: string;
  message?: string;
}

export async function sendBookingNotification({
  to,
  fromName,
  customerName,
  customerEmail,
  customerPhone,
  itemTitle,
  date,
  timeSlot,
  message,
}: BookingEmailParams) {
  const isEnquiry = !date && !timeSlot;

  const lines = [
    isEnquiry ? `New enquiry received:` : `New booking received:`,
    ``,
    `Service: ${itemTitle}`,
    date ? `Date: ${date}` : null,
    timeSlot ? `Time: ${timeSlot}` : null,
    ``,
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    customerPhone ? `Phone: ${customerPhone}` : null,
    message ? `\nMessage:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const subject = isEnquiry
    ? `New enquiry: ${itemTitle}`
    : `New booking: ${itemTitle} — ${date} ${timeSlot}`;

  await resend.emails.send({
    from: `${fromName} <onboarding@resend.dev>`,
    to,
    subject,
    text: lines,
  });
}
