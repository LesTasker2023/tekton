"use server";

import { z } from "zod";
import { writeClient } from "@/sanity/writeClient";
import { sendBookingNotification } from "@/lib/email";

const bookingSchema = z.object({
  itemId: z.string().min(1),
  itemTitle: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(1),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  message: z.string().optional(),
});

interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") errors[key] = issue.message;
    }
    return { success: false, message: "Please fix the errors below.", errors };
  }

  const {
    itemId,
    itemTitle,
    date,
    timeSlot,
    customerName,
    customerEmail,
    customerPhone,
    message,
  } = parsed.data;

  // Check capacity — count existing non-cancelled bookings for this slot
  const settings = await writeClient.fetch<{
    bookingAdminEmail?: string;
    bookingEmailFromName?: string;
    bookingMaxPerSlot?: number;
  } | null>(
    `*[_type == "siteSettings"][0] { bookingAdminEmail, bookingEmailFromName, bookingMaxPerSlot }`,
  );

  const maxPerSlot = settings?.bookingMaxPerSlot ?? 1;

  const existingCount = await writeClient.fetch<number>(
    `count(*[_type == "booking" && item._ref == $itemId && date == $date && timeSlot == $timeSlot && status != "cancelled"])`,
    { itemId, date, timeSlot },
  );

  if (existingCount >= maxPerSlot) {
    return {
      success: false,
      message: "This slot has just been booked. Please choose another time.",
    };
  }

  const now = new Date().toISOString();

  try {
    await writeClient.create({
      _type: "booking",
      item: { _type: "reference", _ref: itemId },
      customerName,
      customerEmail,
      customerPhone: customerPhone || undefined,
      date,
      timeSlot,
      message: message || undefined,
      status: "pending",
      createdAt: now,
    });
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }

  // Fire-and-forget email notification
  if (settings?.bookingAdminEmail) {
    sendBookingNotification({
      to: settings.bookingAdminEmail,
      fromName: settings.bookingEmailFromName || "Booking System",
      customerName,
      customerEmail,
      customerPhone,
      itemTitle,
      date,
      timeSlot,
      message,
    }).catch(() => {});
  }

  return { success: true, message: "Booking confirmed." };
}
