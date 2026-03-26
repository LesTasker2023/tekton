"use client";

import { useActionState, useState, useMemo } from "react";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitBooking } from "@/app/actions/booking";
import { Clock, CheckCircle } from "lucide-react";
import styles from "./BookingForm.module.scss";

export interface DayHours {
  day: string;
  open: string;
  close: string;
}

export interface BookingSettings {
  openingHours: DayHours[];
  slotDuration: number;
  maxPerSlot: number;
  advanceDays: number;
  confirmationMessage?: string;
}

export interface ExistingBooking {
  date: string;
  timeSlot: string;
}

export interface BookingFormProps {
  itemId: string;
  itemTitle: string;
  settings: BookingSettings;
  existingBookings: ExistingBooking[];
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

const DAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function generateTimeSlots(open: string, close: string, duration: number): string[] {
  const slots: string[] = [];
  const [openH, openM] = open.split(":").map(Number);
  const [closeH, closeM] = close.split(":").map(Number);
  let minutes = openH * 60 + openM;
  const endMinutes = closeH * 60 + closeM;

  while (minutes + duration <= endMinutes) {
    const startH = String(Math.floor(minutes / 60)).padStart(2, "0");
    const startM = String(minutes % 60).padStart(2, "0");
    const endMin = minutes + duration;
    const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
    const endMStr = String(endMin % 60).padStart(2, "0");
    slots.push(`${startH}:${startM} – ${endH}:${endMStr}`);
    minutes += duration;
  }

  return slots;
}

export function BookingForm({
  itemId,
  itemTitle,
  settings,
  existingBookings,
}: BookingFormProps) {
  const { openingHours, slotDuration, maxPerSlot, advanceDays, confirmationMessage } =
    settings;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(submitBooking, initialState);

  // Build a lookup: "day name" → hours config
  const hoursByDay = useMemo(() => {
    const map = new Map<string, DayHours>();
    for (const h of openingHours) {
      map.set(h.day, h);
    }
    return map;
  }, [openingHours]);

  // Build set of available "YYYY-MM-DD" dates for the calendar
  const availableDates = useMemo(() => {
    const dates = new Set<string>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= advanceDays; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dayName = DAY_NAMES[d.getDay()];
      if (hoursByDay.has(dayName)) {
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        dates.add(key);
      }
    }
    return dates;
  }, [hoursByDay, advanceDays]);

  // Build booking count map: "date|timeSlot" → count
  const bookingCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of existingBookings) {
      const key = `${b.date}|${b.timeSlot}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }, [existingBookings]);

  // Generate time slots for the selected date
  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const dayName = DAY_NAMES[selectedDate.getDay()];
    const hours = hoursByDay.get(dayName);
    if (!hours) return [];
    return generateTimeSlots(hours.open, hours.close, slotDuration);
  }, [selectedDate, hoursByDay, slotDuration]);

  // Check remaining capacity for a slot
  const getRemaining = (dateKey: string, timeSlot: string) => {
    const count = bookingCounts.get(`${dateKey}|${timeSlot}`) ?? 0;
    return maxPerSlot - count;
  };

  const selectedDateKey = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  if (state.success) {
    return (
      <div className={styles.booking__success}>
        <CheckCircle size={32} />
        <p>
          {confirmationMessage ??
            "Your booking has been submitted. We'll be in touch soon."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.booking}>
      <h3 className={styles.booking__title}>Book Now</h3>

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
              const remaining = getRemaining(selectedDateKey, slot);
              const isFull = remaining <= 0;
              return (
                <button
                  key={slot}
                  type="button"
                  className={styles.booking__slot}
                  data-selected={selectedSlot === slot}
                  disabled={isFull}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <Clock size={14} />
                  <span>{slot}</span>
                  {maxPerSlot > 1 && !isFull && (
                    <span className={styles.booking__remaining}>
                      {remaining} left
                    </span>
                  )}
                  {isFull && (
                    <span className={styles.booking__remaining}>Full</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Contact form */}
      {selectedSlot && (
        <form action={formAction} className={styles.booking__form}>
          <input type="hidden" name="itemId" value={itemId} />
          <input type="hidden" name="itemTitle" value={itemTitle} />
          <input type="hidden" name="date" value={selectedDateKey} />
          <input type="hidden" name="timeSlot" value={selectedSlot} />

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
