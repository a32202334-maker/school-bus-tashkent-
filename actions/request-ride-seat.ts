import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "Request seats on an approved future ride with remaining capacity; the offer row is locked while pending and approved requests are counted, preventing duplicate requests and overselling.",
  schema: z.object({
    id: z.string().min(1).describe("Ride offer id"),
    seatsRequested: z.number().int().min(1).max(100).default(1).describe("Seats to request, from 1 to 100; defaults to 1"),
  }),
  run: async ({ id, seatsRequested }) => {
    const requesterEmail = requireRideUserEmail();
    return getDb().transaction(async (tx) => {
      const [offer] = await tx
        .select({
          id: schema.rideOffers.id,
          ownerEmail: schema.rideOffers.ownerEmail,
          seatCapacity: schema.rideOffers.seatCapacity,
          rideDate: schema.rideOffers.rideDate,
          status: schema.rideOffers.status,
        })
        .from(schema.rideOffers)
        .where(eq(schema.rideOffers.id, id))
        .for("update");

      if (!offer || offer.status !== "approved") {
        fail("Ride offer is not available", { statusCode: 404, errorCode: "not_available" });
      }
      if (offer.ownerEmail === requesterEmail) {
        fail("You cannot request seats on your own ride offer", { statusCode: 400 });
      }
      if (offer.rideDate < new Date().toISOString().slice(0, 10)) {
        fail("Ride offer is no longer available", { statusCode: 409, errorCode: "not_available" });
      }

      const [existing] = await tx
        .select({ id: schema.rideRequests.id })
        .from(schema.rideRequests)
        .where(
          and(
            eq(schema.rideRequests.offerId, id),
            eq(schema.rideRequests.requesterEmail, requesterEmail),
          ),
        )
        .limit(1);
      if (existing) {
        fail("You have already requested seats on this ride", {
          statusCode: 409,
          errorCode: "duplicate_request",
        });
      }

      const [reservation] = await tx
        .select({
          seatsReserved: sql<number>`coalesce(sum(${schema.rideRequests.seatsRequested}), 0)::int`,
        })
        .from(schema.rideRequests)
        .where(
          and(
            eq(schema.rideRequests.offerId, id),
            inArray(schema.rideRequests.status, ["pending", "approved"]),
          ),
        );
      const available = offer.seatCapacity - (reservation?.seatsReserved ?? 0);
      if (seatsRequested > available) {
        fail("Not enough seats remain for this request", {
          statusCode: 409,
          errorCode: "insufficient_seats",
        });
      }

      const [request] = await tx
        .insert(schema.rideRequests)
        .values({
          id: crypto.randomUUID(),
          offerId: id,
          requesterEmail,
          seatsRequested,
          status: "pending",
        })
        .returning({
          id: schema.rideRequests.id,
          offerId: schema.rideRequests.offerId,
          seatsRequested: schema.rideRequests.seatsRequested,
          status: schema.rideRequests.status,
          createdAt: schema.rideRequests.createdAt,
        });
      if (!request) fail("Seat request could not be created", { statusCode: 500 });
      return request;
    });
  },
});
