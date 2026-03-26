"use client";

import { useActionState, useState, useMemo } from "react";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitBooking } from "@/app/actions/booking";
import { Clock, CheckCircle } from "lucide-react";
import styles from "./BookingForm.module.scss";

export interface AvailableSlot {
  _id: string;
  _rev: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
}

export interface BookingFormProps {
  /** Sanity item _id */
  itemId: string;
  /** Item title for display */
  itemTitle: string;
  /** Available time slots from Sanity */
  availableSlots: AvailableSlot[];
  /** Message shown after successful booking */
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

export function BookingForm({
  itemId,
  itemTitle,
  availableSlots,
  confirmationMessage = "Your booking has been submitted. We'll be in touch soon.",
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(
    submitBooking,
    initialState,
  );

  // Build set of dates that have at least one available slot
  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    for (const slot of availableSlots) {
      dates.add(slot.date);
    }
    return dates;
  }, [availableSlots]);

  // Filter slots for the selected date
  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const key = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    return availableSlots.filter((s) => s.date === key);
  }, [selectedDate, availableSlots]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlotId(null);
  };

  if (state.success) {
    return (
      <div className={styles.booking__success}>
        <CheckCircle size={32} />
        <p>{confirmationMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.booking}>
      <h3 className={styles.booking__title}>Book This Service</h3>

      {/* Step 1: Pick a date */}
      <div className={styles.booking__step}>
        <span className={styles.booking__label}>Select a date</span>
        <BookingCalendar
          availableDates={availableDates}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />
      </div>

      {/* Step 2: Pick a time slot */}
      {selectedDate && slotsForDate.length > 0 && (
        <div className={styles.booking__step}>
          <span className={styles.booking__label}>Select a time</span>
          <div className={styles.booking__slots}>
            {slotsForDate.map((slot) => {
              const remaining = slot.capacity - slot.booked;
              return (
                <button
                  key={slot._id}
                  type="button"
                  className={styles.booking__slot}
                  data-selected={selectedSlotId === slot._id}
                  onClick={() => setSelectedSlotId(slot._id)}
                >
                  <Clock size={14} />
                  <span>
                    {slot.startTime} – {slot.endTime}
                  </span>
                  {slot.capacity > 1 && (
                    <span className={styles.booking__remaining}>
                      {remaining} left
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Contact form */}
      {selectedSlotId && (
        <form action={formAction} className={styles.booking__form}>
          <input type="hidden" name="itemId" value={itemId} />
          <input type="hidden" name="itemTitle" value={itemTitle} />
          <input type="hidden" name="slotId" value={selectedSlotId} />
          <input
            type="hidden"
            name="slotRev"
            value={
              availableSlots.find((s) => s._id === selectedSlotId)?._rev ?? ""
            }
          />

          <Input
            name="customerName"
            label="Name"
            required
            error={state.errors?.customerName}
          />
          <Input
            name="customerEmail"
            label="Email"
            type="email"
            required
            error={state.errors?.customerEmail}
          />
          <Input
            name="customerPhone"
            label="Phone"
            type="tel"
            error={state.errors?.customerPhone}
          />

          <div className={styles.booking__field}>
            <label htmlFor="booking-message" className={styles.booking__label}>
              Message (optional)
            </label>
            <textarea
              id="booking-message"
              name="message"
              className={styles.booking__textarea}
              rows={3}
            />
          </div>

          {state.message && !state.success && (
            <p className={styles.booking__error} role="alert">
              {state.message}
            </p>
          )}

          <Button type="submit" fullWidth disabled={isPending}>
            {isPending ? "Submitting…" : "Confirm Booking"}
          </Button>
        </form>
      )}
    </div>
  );
}
