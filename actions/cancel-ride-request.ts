import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "Cancel one of the caller's own pending or approved seat requests; already-cancelled requests are returned idempotently.",
  schema: z.object({ id: z.string().min(1).describe("Ride request id") }),
  run: async ({ id }) => {
    const email = requireRideUserEmail();
    const db = getDb();
    const [updated] = await db
      .update(schema.rideRequests)
      .set({ status: "cancelled" })
      .where(
        and(
          eq(schema.rideRequests.id, id),
          eq(schema.rideRequests.requesterEmail, email),
          inArray(schema.rideRequests.status, ["pending", "approved"]),
        ),
      )
      .returning({
        id: schema.rideRequests.id,
        offerId: schema.rideRequests.offerId,
        seatsRequested: schema.rideRequests.seatsRequested,
        status: schema.rideRequests.status,
      });
    if (updated) return updated;

    const [existing] = await db
      .select({
        id: schema.rideRequests.id,
        offerId: schema.rideRequests.offerId,
        seatsRequested: schema.rideRequests.seatsRequested,
        status: schema.rideRequests.status,
      })
      .from(schema.rideRequests)
      .where(
        and(
          eq(schema.rideRequests.id, id),
          eq(schema.rideRequests.requesterEmail, email),
        ),
      )
      .limit(1);
    if (existing?.status === "cancelled") return existing;
    fail("Ride request not found or cannot be cancelled", { statusCode: 404 });
  },
});
