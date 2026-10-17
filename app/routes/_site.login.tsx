import { AuthPage } from "@/features/schoolbus/portal-pages";

export function meta() {
  return [{ title: "Sign in — SchoolBus Tashkent" }];
}

export default function LoginRoute() {
  return <AuthPage mode="login" />;
}
