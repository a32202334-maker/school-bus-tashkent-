import { SchoolBusHowItWorksPage } from "@/features/schoolbus/public-pages";

export function meta() {
  return [
    { title: "How it works — SchoolBus Tashkent" },
    {
      name: "description",
      content:
        "How families can discuss and coordinate shared school journeys in the SchoolBus Tashkent pilot.",
    },
  ];
}

export default function SchoolBusHowItWorksRoute() {
  return <SchoolBusHowItWorksPage />;
}
