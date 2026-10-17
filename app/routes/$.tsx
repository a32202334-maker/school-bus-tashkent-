import { Link } from "react-router";
import { useSchoolBusLocale, TelegramCTA } from "@/components/schoolbus/site-shell";

export function meta() {
  return [{ title: "Page not found — SchoolBus Tashkent" }];
}

export default function NotFoundRoute() {
  const { locale } = useSchoolBusLocale();
  const copy = {
    ru: { title: "Такой страницы нет", body: "Проверьте адрес или вернитесь на главную.", home: "На главную" },
    uz: { title: "Sahifa topilmadi", body: "Manzilni tekshiring yoki bosh sahifaga qayting.", home: "Bosh sahifa" },
    en: { title: "Page not found", body: "Check the address or return to the homepage.", home: "Go home" },
  }[locale];
  return <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8"><p className="text-xs font-extrabold tracking-[.16em] text-[#986700]">404</p><h1 className="mt-3 text-4xl font-black tracking-tight">{copy.title}</h1><p className="mt-4 text-slate-600">{copy.body}</p><div className="mt-7 flex flex-wrap gap-3"><Link to="/" className="inline-flex min-h-11 items-center rounded-full bg-[#101a2e] px-5 font-bold text-white">{copy.home}</Link><TelegramCTA /></div></main>;
}
