import { defineAppRoles } from "@agent-native/core/org-team";

export const appAccess = defineAppRoles({
  appId: "schoolbus-tashkent",
  roles: ["parent", "coordinator"] as const,
  defaultRole: "parent",
  label: "SchoolBus Tashkent role",
  roleLabels: {
    parent: "Parent",
    coordinator: "Coordinator",
  },
});
