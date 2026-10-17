import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "Cancel one of the caller's own pending or approved ride offers; offer owner email is never returned and already-cancelled offers are returned idempotently.",
  schema: z.object({ id: z.string().min(1).describe("Ride offer id") }),
  run: async ({ id }) => {
    const email = requireRideUserEmail();
    const db = getDb();
    const [updated] = await db
      .update(schema.rideOffers)
      .set({ status: "cancelled" })
      .where(
        and(
          eq(schema.rideOffers.id, id),
          eq(schema.rideOffers.ownerEmail, email),
          inArray(schema.rideOffers.status, ["pending", "approved"]),
        ),
      )
      .returning({
        id: schema.rideOffers.id,
        school: schema.rideOffers.school,
        approximateArea: schema.rideOffers.approximateArea,
        rideDate: schema.rideOffers.rideDate,
        departureTime: schema.rideOffers.departureTime,
        arrivalTime: schema.rideOffers.arrivalTime,
        seatCapacity: schema.rideOffers.seatCapacity,
        status: schema.rideOffers.status,
      });
    if (updated) return updated;

    const [existing] = await db
      .select({
        id: schema.rideOffers.id,
        school: schema.rideOffers.school,
        approximateArea: schema.rideOffers.approximateArea,
        rideDate: schema.rideOffers.rideDate,
        departureTime: schema.rideOffers.departureTime,
        arrivalTime: schema.rideOffers.arrivalTime,
        seatCapacity: schema.rideOffers.seatCapacity,
        status: schema.rideOffers.status,
      })
      .from(schema.rideOffers)
      .where(and(eq(schema.rideOffers.id, id), eq(schema.rideOffers.ownerEmail, email)))
      .limit(1);
    if (existing?.status === "cancelled") return existing;
    fail("Ride offer not found or cannot be cancelled", { statusCode: 404 });
  },
});
