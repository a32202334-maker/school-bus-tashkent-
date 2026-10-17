import { SchoolBusContactPage } from "@/features/schoolbus/public-pages";

export function meta() {
  return [
    { title: "Contact — SchoolBus Tashkent" },
    {
      name: "description",
      content:
        "Prepare a message to send yourself through the SchoolBus Tashkent Telegram bot.",
    },
  ];
}

export default function SchoolBusContactRoute() {
  return <SchoolBusContactPage />;
}
