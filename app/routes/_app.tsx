import { Outlet } from "react-router";

import { PortalShell } from "@/components/schoolbus/site-shell";

export default function SchoolBusPortalLayout() {
  return <PortalShell><Outlet /></PortalShell>;
}
