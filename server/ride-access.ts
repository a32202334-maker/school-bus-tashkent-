import { fail } from "@agent-native/core/action";
import { getRequestUserEmail } from "@agent-native/core/server/request-context";

export function requireRideUserEmail(): string {
  const email = getRequestUserEmail();
  if (!email) fail("Not authenticated", { statusCode: 401 });
  return email.trim().toLowerCase();
}
