import { SchoolBusSafetyPage } from "@/features/schoolbus/public-pages";

export function meta() {
  return [
    { title: "Safety — SchoolBus Tashkent" },
    {
      name: "description",
      content:
        "Safety responsibilities and current limits described in SchoolBus Tashkent project materials.",
    },
  ];
}

export default function SchoolBusSafetyRoute() {
  return <SchoolBusSafetyPage />;
}
