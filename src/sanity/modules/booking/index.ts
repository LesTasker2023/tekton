import type { SchemaTypeDefinition } from "sanity";
import { availabilitySlotType } from "./schemas/availabilitySlot";
import { bookingType } from "./schemas/booking";

export const bookingSchemas: SchemaTypeDefinition[] = [
  availabilitySlotType,
  bookingType,
];
