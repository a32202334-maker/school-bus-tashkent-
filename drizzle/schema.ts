import { sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  integer,
  pgTable,
  text,
  time,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const rideOffers = pgTable(
  "ride_offers",
  {
    id: text("id").primaryKey(),
    school: text("school").notNull(),
    approximateArea: text("approximate_area").notNull(),
    rideDate: date("ride_date", { mode: "string" }).notNull(),
    departureTime: time("departure_time").notNull(),
    arrivalTime: time("arrival_time").notNull(),
    seatCapacity: integer("seat_capacity").notNull(),
    status: text("status").notNull().default("pending"),
    ownerEmail: text("owner_email").notNull(),
    createdAt: text("created_at").notNull().default(sql`now()`),
  },
  (table) => [
    check("ride_offers_school_nonempty", sql`length(trim(${table.school})) > 0`),
    check(
      "ride_offers_area_nonempty",
      sql`length(trim(${table.approximateArea})) > 0`,
    ),
    check("ride_offers_capacity_positive", sql`${table.seatCapacity} > 0`),
    check(
      "ride_offers_status_valid",
      sql`${table.status} IN ('pending', 'approved', 'rejected', 'cancelled')`,
    ),
    check(
      "ride_offers_arrival_after_departure",
      sql`${table.arrivalTime} > ${table.departureTime}`,
    ),
    index("ride_offers_search_idx").on(table.status, table.rideDate, table.school),
    index("ride_offers_owner_idx").on(table.ownerEmail, table.createdAt),
  ],
);

export const rideRequests = pgTable(
  "ride_requests",
  {
    id: text("id").primaryKey(),
    offerId: text("offer_id")
      .notNull()
      .references(() => rideOffers.id, { onDelete: "cascade" }),
    requesterEmail: text("requester_email").notNull(),
    seatsRequested: integer("seats_requested").notNull().default(1),
    status: text("status").notNull().default("pending"),
    createdAt: text("created_at").notNull().default(sql`now()`),
  },
  (table) => [
    check("ride_requests_seats_positive", sql`${table.seatsRequested} > 0`),
    check(
      "ride_requests_status_valid",
      sql`${table.status} IN ('pending', 'approved', 'rejected', 'cancelled')`,
    ),
    uniqueIndex("ride_requests_offer_requester_unique").on(
      table.offerId,
      table.requesterEmail,
    ),
    index("ride_requests_offer_status_idx").on(table.offerId, table.status),
    index("ride_requests_requester_idx").on(table.requesterEmail, table.createdAt),
  ],
);
