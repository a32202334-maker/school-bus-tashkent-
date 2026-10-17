import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description: "Approve or reject a pending seat request on one of the caller's own approved ride offers.",
  schema: z.object({
    id: z.string().min(1).describe("Ride request id"),
    status: z.enum(["approved", "rejected"]),
  }),
  run: async ({ id, status }) => {
    const ownerEmail = requireRideUserEmail();
    const [updated] = await getDb()
      .update(schema.rideRequests)
      .set({ status })
      .where(
        and(
          eq(schema.rideRequests.id, id),
          eq(schema.rideRequests.status, "pending"),
          inArray(
            schema.rideRequests.offerId,
            getDb()
              .select({ id: schema.rideOffers.id })
              .from(schema.rideOffers)
              .where(
                and(
                  eq(schema.rideOffers.ownerEmail, ownerEmail),
                  eq(schema.rideOffers.status, "approved"),
                ),
              ),
          ),
        ),
      )
      .returning({
        id: schema.rideRequests.id,
        offerId: schema.rideRequests.offerId,
        seatsRequested: schema.rideRequests.seatsRequested,
        status: schema.rideRequests.status,
      });

    if (updated) return updated;

    const [existing] = await getDb()
      .select({ id: schema.rideRequests.id })
      .from(schema.rideRequests)
      .innerJoin(schema.rideOffers, eq(schema.rideRequests.offerId, schema.rideOffers.id))
      .where(
        and(
          eq(schema.rideRequests.id, id),
          eq(schema.rideOffers.ownerEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (!existing) fail("Ride request not found", { statusCode: 404 });
    fail("Only pending requests on approved offers can be reviewed", { statusCode: 409 });
  },
});
