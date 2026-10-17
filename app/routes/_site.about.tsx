import { SchoolBusAboutPage } from "@/features/schoolbus/public-pages";

export function meta() {
  return [
    { title: "About — SchoolBus Tashkent" },
    {
      name: "description",
      content: "About the SchoolBus Tashkent shared school journey pilot.",
    },
  ];
}

export default function SchoolBusAboutRoute() {
  return <SchoolBusAboutPage />;
}
