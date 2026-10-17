import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:MM time");

export default defineAction({
  description:
    "Create a ride offer for a school, approximate pickup area, date, times, and seat capacity; offers start pending review and exact addresses must not be entered.",
  schema: z
    .object({
      school: z.string().trim().min(1).max(160).describe("School name"),
      approximateArea: z
        .string()
        .trim()
        .min(1)
        .max(200)
        .describe("Broad pickup area only; do not provide an exact address"),
      rideDate: z.iso.date().describe("Ride date in YYYY-MM-DD format"),
      departureTime: timeSchema.describe("Departure time in 24-hour HH:MM format"),
      arrivalTime: timeSchema.describe("Arrival time in 24-hour HH:MM format"),
      seatCapacity: z.number().int().min(1).max(100).describe("Number of seats offered"),
    })
    .refine((ride) => ride.arrivalTime > ride.departureTime, {
      message: "Arrival time must be later than departure time on the same date",
      path: ["arrivalTime"],
    }),
  run: async (input) => {
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tashkent" }).format(new Date());
    if (input.rideDate < today) {
      fail("Ride date must be today or later", { statusCode: 400, errorCode: "past_date" });
    }
    const ownerEmail = requireRideUserEmail();
    const [row] = await getDb()
      .insert(schema.rideOffers)
      .values({
        id: crypto.randomUUID(),
        school: input.school,
        approximateArea: input.approximateArea,
        rideDate: input.rideDate,
        departureTime: input.departureTime,
        arrivalTime: input.arrivalTime,
        seatCapacity: input.seatCapacity,
        ownerEmail,
        status: "pending",
      })
      .returning({
        id: schema.rideOffers.id,
        school: schema.rideOffers.school,
        approximateArea: schema.rideOffers.approximateArea,
        rideDate: schema.rideOffers.rideDate,
        departureTime: schema.rideOffers.departureTime,
        arrivalTime: schema.rideOffers.arrivalTime,
        seatCapacity: schema.rideOffers.seatCapacity,
        status: schema.rideOffers.status,
        createdAt: schema.rideOffers.createdAt,
      });
    if (!row) fail("Ride offer could not be created", { statusCode: 500 });
    return row;
  },
});
