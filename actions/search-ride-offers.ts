import { defineAction } from "@agent-native/core/action";
import { and, asc, eq, gte, ilike, inArray, ne, notExists, sql } from "drizzle-orm";
import { z } from "zod";

import { requireRideUserEmail } from "../server/ride-access.js";
import { getDb, schema } from "../server/db.js";

function literalContains(value: string): string {
  return `%${value.replace(/[\\%_]/g, "\\$&")}%`;
}

export default defineAction({
  description:
    "Search approved future ride offers with available seats; results omit private owner details and can be filtered by school, approximate area, or date.",
  schema: z.object({
    school: z.string().trim().min(1).max(160).optional().describe("Optional school name substring"),
    approximateArea: z
      .string()
      .trim()
      .min(1)
      .max(200)
      .optional()
      .describe("Optional approximate pickup area substring"),
    rideDate: z.iso.date().optional().describe("Optional exact ride date in YYYY-MM-DD format"),
    limit: z.number().int().min(1).max(100).default(50).describe("Maximum results, from 1 to 100; defaults to 50"),
  }),
  http: { method: "GET" },
  run: async ({ school, approximateArea, rideDate, limit }) => {
    const userEmail = requireRideUserEmail();
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tashkent" }).format(new Date());
    const db = getDb();
    const filters = [
      eq(schema.rideOffers.status, "approved"),
      gte(schema.rideOffers.rideDate, today),
      ne(schema.rideOffers.ownerEmail, userEmail),
      notExists(
        db
          .select({ id: schema.rideRequests.id })
          .from(schema.rideRequests)
          .where(
            and(
              eq(schema.rideRequests.offerId, schema.rideOffers.id),
              eq(schema.rideRequests.requesterEmail, userEmail),
            ),
          ),
      ),
    ];
    if (school) filters.push(ilike(schema.rideOffers.school, literalContains(school)));
    if (approximateArea) {
      filters.push(ilike(schema.rideOffers.approximateArea, literalContains(approximateArea)));
    }
    if (rideDate) filters.push(eq(schema.rideOffers.rideDate, rideDate));

    return db
      .select({
        id: schema.rideOffers.id,
        school: schema.rideOffers.school,
        approximateArea: schema.rideOffers.approximateArea,
        rideDate: schema.rideOffers.rideDate,
        departureTime: schema.rideOffers.departureTime,
        arrivalTime: schema.rideOffers.arrivalTime,
        seatCapacity: schema.rideOffers.seatCapacity,
        seatsAvailable: sql<number>`(${schema.rideOffers.seatCapacity} - coalesce(sum(${schema.rideRequests.seatsRequested}), 0))::int`,
      })
      .from(schema.rideOffers)
      .leftJoin(
        schema.rideRequests,
        and(
          eq(schema.rideRequests.offerId, schema.rideOffers.id),
          inArray(schema.rideRequests.status, ["pending", "approved"]),
        ),
      )
      .where(and(...filters))
      .groupBy(
        schema.rideOffers.id,
        schema.rideOffers.school,
        schema.rideOffers.approximateArea,
        schema.rideOffers.rideDate,
        schema.rideOffers.departureTime,
        schema.rideOffers.arrivalTime,
        schema.rideOffers.seatCapacity,
      )
      .having(
        sql`${schema.rideOffers.seatCapacity} - coalesce(sum(${schema.rideRequests.seatsRequested}), 0) > 0`,
      )
      .orderBy(asc(schema.rideOffers.rideDate), asc(schema.rideOffers.departureTime))
      .limit(limit);
  },
});
