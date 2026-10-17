import { defineAction } from "@agent-native/core/action";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";

import { appAccess } from "../server/lib/access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "List pending SchoolBus Tashkent ride offers for coordinator review; results omit owner and requester email addresses.",
  schema: z.object({
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(50)
      .describe("Maximum pending offers to return, from 1 to 100; defaults to 50"),
  }),
  authorize: appAccess.requireAny("coordinator"),
  http: { method: "GET" },
  run: async ({ limit }) =>
    getDb()
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
      .where(eq(schema.rideOffers.status, "pending"))
      .orderBy(asc(schema.rideOffers.createdAt), asc(schema.rideOffers.id))
      .limit(limit),
});
