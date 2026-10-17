import { defineAction } from "@agent-native/core/action";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "List the caller's own ride offers and seat requests, including their statuses; private email addresses are never returned.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const email = requireRideUserEmail();
    const db = getDb();
    const [offers, requests, incomingRequests] = await Promise.all([
      db
        .select({
          id: schema.rideOffers.id,
          school: schema.rideOffers.school,
          approximateArea: schema.rideOffers.approximateArea,
          rideDate: schema.rideOffers.rideDate,
          departureTime: schema.rideOffers.departureTime,
          arrivalTime: schema.rideOffers.arrivalTime,
          seatCapacity: schema.rideOffers.seatCapacity,
          status: schema.rideOffers.status,
          createdAt: schema.rideOffers.createdAt,
        })
        .from(schema.rideOffers)
        .where(eq(schema.rideOffers.ownerEmail, email))
        .orderBy(desc(schema.rideOffers.createdAt)),
      db
        .select({
          id: schema.rideRequests.id,
          offerId: schema.rideRequests.offerId,
          seatsRequested: schema.rideRequests.seatsRequested,
          status: schema.rideRequests.status,
          createdAt: schema.rideRequests.createdAt,
          school: schema.rideOffers.school,
          approximateArea: schema.rideOffers.approximateArea,
          rideDate: schema.rideOffers.rideDate,
          departureTime: schema.rideOffers.departureTime,
          arrivalTime: schema.rideOffers.arrivalTime,
          offerStatus: schema.rideOffers.status,
        })
        .from(schema.rideRequests)
        .innerJoin(schema.rideOffers, eq(schema.rideRequests.offerId, schema.rideOffers.id))
        .where(eq(schema.rideRequests.requesterEmail, email))
        .orderBy(desc(schema.rideRequests.createdAt)),
      db
        .select({
          id: schema.rideRequests.id,
          offerId: schema.rideRequests.offerId,
          seatsRequested: schema.rideRequests.seatsRequested,
          status: schema.rideRequests.status,
          createdAt: schema.rideRequests.createdAt,
          school: schema.rideOffers.school,
          approximateArea: schema.rideOffers.approximateArea,
          rideDate: schema.rideOffers.rideDate,
          departureTime: schema.rideOffers.departureTime,
          arrivalTime: schema.rideOffers.arrivalTime,
          offerStatus: schema.rideOffers.status,
        })
        .from(schema.rideRequests)
        .innerJoin(schema.rideOffers, eq(schema.rideRequests.offerId, schema.rideOffers.id))
        .where(eq(schema.rideOffers.ownerEmail, email))
        .orderBy(desc(schema.rideRequests.createdAt)),
    ]);
    return { offers, requests, incomingRequests };
  },
});
