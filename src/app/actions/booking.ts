"use server";

import { z } from "zod";
import { writeClient } from "@/sanity/writeClient";
import { sendBookingNotification } from "@/lib/email";
import { BOOKING_SETTINGS_QUERY } from "@/sanity/queries";

const bookingSchema = z.object({
  itemId: z.string().min(1),
  itemTitle: z.string().min(1),
  slotId: z.string().min(1),
  slotRev: z.string().min(1),
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
    slotId,
    slotRev,
    customerName,
    customerEmail,
    customerPhone,
    message,
  } = parsed.data;

  // Fetch slot to get date/time for the booking record
  const slot = await writeClient.fetch<{
    _id: string;
    _rev: string;
    date: string;
    startTime: string;
    endTime: string;
    capacity: number;
    booked: number;
  } | null>(`*[_type == "availabilitySlot" && _id == $slotId][0]`, { slotId });

  if (!slot) {
    return { success: false, message: "This slot no longer exists." };
  }

  if (slot.booked >= slot.capacity) {
    return {
      success: false,
      message: "This slot is no longer available. Please choose another time.",
    };
  }

  const timeSlot = `${slot.startTime} – ${slot.endTime}`;
  const now = new Date().toISOString();

  // Optimistic locking: use ifRevisionId so concurrent bookings don't double-book
  try {
    await writeClient
      .transaction()
      .create({
        _type: "booking",
        item: { _type: "reference", _ref: itemId },
        slot: { _type: "reference", _ref: slotId },
        customerName,
        customerEmail,
        customerPhone: customerPhone || undefined,
        date: slot.date,
        timeSlot,
        message: message || undefined,
        status: "pending",
        createdAt: now,
      })
      .patch(slotId, {
        ifRevisionID: slotRev,
        inc: { booked: 1 },
      })
      .commit();
  } catch {
    return {
      success: false,
      message:
        "This slot was just booked by someone else. Please choose another time.",
    };
  }

  // Fire-and-forget email notification
  const settings = await writeClient.fetch<{
    bookingAdminEmail?: string;
    bookingEmailFromName?: string;
  } | null>(BOOKING_SETTINGS_QUERY);

  if (settings?.bookingAdminEmail) {
    sendBookingNotification({
      to: settings.bookingAdminEmail,
      fromName: settings.bookingEmailFromName || "Booking System",
      customerName,
      customerEmail,
      customerPhone,
      itemTitle,
      date: slot.date,
      timeSlot,
      message,
    }).catch(() => {
      // Email failure shouldn't break the booking
    });
  }

  return { success: true, message: "Booking confirmed." };
}
