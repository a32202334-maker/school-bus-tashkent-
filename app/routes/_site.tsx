import { Outlet } from "react-router";

import { SchoolBusSiteShell } from "@/components/schoolbus/site-shell";

export default function PublicSiteLayout() {
  return <SchoolBusSiteShell><Outlet /></SchoolBusSiteShell>;
}
