import { defineAction, fail } from "@agent-native/core/action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { appAccess } from "../server/lib/access.js";
import { getDb, schema } from "../server/db.js";

export default defineAction({
  description:
    "Approve or reject a pending SchoolBus Tashkent ride offer with a required non-empty reason; review mutations are recorded in the framework audit log and results omit owner/requester emails.",
  schema: z.object({
    id: z.string().trim().min(1).describe("Ride offer id"),
    status: z
      .enum(["approved", "rejected"])
      .describe('Review decision: "approved" or "rejected"'),
    reason: z
      .string()
      .trim()
      .min(1)
      .max(2000)
      .describe("Required non-empty reason for the decision; recorded in the audit log"),
  }),
  authorize: appAccess.requireAny("coordinator"),
  audit: {
    target: (args) => ({ type: "ride-offer", id: args.id }),
    summary: (args) => `Ride offer ${args.id} ${args.status}: ${args.reason.trim().slice(0, 160)}`,
  },
  run: async ({ id, status }) => {
    const db = getDb();
    const [updated] = await db
      .update(schema.rideOffers)
      .set({ status })
      .where(
        and(
          eq(schema.rideOffers.id, id),
          eq(schema.rideOffers.status, "pending"),
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
      .select({ status: schema.rideOffers.status })
      .from(schema.rideOffers)
      .where(eq(schema.rideOffers.id, id))
      .limit(1);
    if (!existing) {
      fail("Ride offer not found", { statusCode: 404, errorCode: "not_found" });
    }
    fail("Only pending ride offers can be reviewed", {
      statusCode: 409,
      errorCode: "not_pending",
    });
  },
});
