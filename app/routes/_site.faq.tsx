import { SchoolBusFaqPage } from "@/features/schoolbus/public-pages";

export function meta() {
  return [
    { title: "FAQ — SchoolBus Tashkent" },
    {
      name: "description",
      content:
        "Answers about eligibility, matching, ride requests, cancellation, privacy, and safety.",
    },
  ];
}

export default function SchoolBusFaqRoute() {
  return <SchoolBusFaqPage />;
}
