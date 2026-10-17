CREATE TABLE "ride_offers" (
	"id" text PRIMARY KEY NOT NULL,
	"school" text NOT NULL,
	"approximate_area" text NOT NULL,
	"ride_date" date NOT NULL,
	"departure_time" time NOT NULL,
	"arrival_time" time NOT NULL,
	"seat_capacity" integer NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"owner_email" text NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	CONSTRAINT "ride_offers_school_nonempty" CHECK (length(trim("ride_offers"."school")) > 0),
	CONSTRAINT "ride_offers_area_nonempty" CHECK (length(trim("ride_offers"."approximate_area")) > 0),
	CONSTRAINT "ride_offers_capacity_positive" CHECK ("ride_offers"."seat_capacity" > 0),
	CONSTRAINT "ride_offers_status_valid" CHECK ("ride_offers"."status" IN ('pending', 'approved', 'rejected', 'cancelled')),
	CONSTRAINT "ride_offers_arrival_after_departure" CHECK ("ride_offers"."arrival_time" > "ride_offers"."departure_time")
);
--> statement-breakpoint
CREATE TABLE "ride_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"offer_id" text NOT NULL,
	"requester_email" text NOT NULL,
	"seats_requested" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	CONSTRAINT "ride_requests_seats_positive" CHECK ("ride_requests"."seats_requested" > 0),
	CONSTRAINT "ride_requests_status_valid" CHECK ("ride_requests"."status" IN ('pending', 'approved', 'rejected', 'cancelled'))
);
--> statement-breakpoint
ALTER TABLE "ride_requests" ADD CONSTRAINT "ride_requests_offer_id_ride_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."ride_offers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ride_offers_search_idx" ON "ride_offers" USING btree ("status","ride_date","school");--> statement-breakpoint
CREATE INDEX "ride_offers_owner_idx" ON "ride_offers" USING btree ("owner_email","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "ride_requests_offer_requester_unique" ON "ride_requests" USING btree ("offer_id","requester_email");--> statement-breakpoint
CREATE INDEX "ride_requests_offer_status_idx" ON "ride_requests" USING btree ("offer_id","status");--> statement-breakpoint
CREATE INDEX "ride_requests_requester_idx" ON "ride_requests" USING btree ("requester_email","created_at");