import { createGetDb } from "@agent-native/core/db";
import { registerIdentityColumns } from "@agent-native/core/org";
import * as schema from "../drizzle/schema.js";

export const getDb = createGetDb(schema);
export { schema };

registerIdentityColumns([
  {
    table: "ride_offers",
    column: "owner_email",
    emailChange: "rekey",
    offboard: "transfer",
    reason: "Ride offers are owned by the creating family.",
  },
  {
    table: "ride_requests",
    column: "requester_email",
    emailChange: "rekey",
    offboard: "transfer",
    reason: "Ride requests are owned by the requesting family.",
  },
]);
