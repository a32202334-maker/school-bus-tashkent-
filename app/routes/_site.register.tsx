import { AuthPage } from "@/features/schoolbus/portal-pages";

export function meta() {
  return [{ title: "Create account — SchoolBus Tashkent" }];
}

export default function RegisterRoute() {
  return <AuthPage mode="register" />;
}
