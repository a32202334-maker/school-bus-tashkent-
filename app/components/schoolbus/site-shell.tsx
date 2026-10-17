import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { signOut } from "@agent-native/core/client";
import {
  IconArrowRight,
  IconBrandTelegram,
  IconMenu2,
  IconSchool,
  IconX,
} from "@tabler/icons-react";

export type SchoolBusLocale = "ru" | "uz" | "en";

const localeStorageKey = "schoolbus-tashkent-locale";
export const telegramUrl = "https://t.me/schoolbus_tashkent_bot";

const LocaleContext = createContext<{
  locale: SchoolBusLocale;
  setLocale: (locale: SchoolBusLocale) => void;
} | null>(null);

export function SchoolBusLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SchoolBusLocale>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (stored === "ru" || stored === "uz" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: SchoolBusLocale) => {
    setLocaleState(next);
    window.localStorage.setItem(localeStorageKey, next);
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useSchoolBusLocale() {
  const locale = useContext(LocaleContext);
  if (!locale) throw new Error("SchoolBusLocaleProvider is missing");
  return locale;
}

const labels = {
  ru: {
    home: "Главная",
    how: "Как это работает",
    safety: "Безопасность",
    about: "О проекте",
    contact: "Контакты",
    faq: "Вопросы",
    login: "Войти",
    telegram: "Открыть Telegram",
    menu: "Открыть меню",
    close: "Закрыть меню",
    footer: "Пилотный проект совместных школьных поездок для семей Ташкента.",
    account: "Кабинет семьи",
    privacy: "Конфиденциальность",
    terms: "Правила участия",
  },
  uz: {
    home: "Bosh sahifa",
    how: "Qanday ishlaydi",
    safety: "Xavfsizlik",
    about: "Loyiha haqida",
    contact: "Aloqa",
    faq: "Savollar",
    login: "Kirish",
    telegram: "Telegram’ni ochish",
    menu: "Menyuni ochish",
    close: "Menyuni yopish",
    footer: "Toshkent oilalari uchun umumiy maktab safarlari pilot loyihasi.",
    account: "Oila kabineti",
    privacy: "Maxfiylik",
    terms: "Ishtirok qoidalari",
  },
  en: {
    home: "Home",
    how: "How it works",
    safety: "Safety",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    login: "Sign in",
    telegram: "Open Telegram",
    menu: "Open menu",
    close: "Close menu",
    footer: "A shared school-ride pilot for families in Tashkent.",
    account: "Family dashboard",
    privacy: "Privacy",
    terms: "Participation rules",
  },
} as const;

export function TelegramCTA({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ffb900] px-4 py-2.5 text-sm font-bold text-[#101a2e] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd15c] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb900] ${className}`}
    >
      <IconBrandTelegram size={17} aria-hidden="true" />
      {children ?? "@schoolbus_tashkent_bot"}
      <IconArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="SchoolBus Tashkent — главная">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffb900] text-[#101a2e]">
        <IconSchool size={22} stroke={2.2} aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-black tracking-tight">SchoolBus</span>
        <span className="block text-[10px] font-bold tracking-[.17em] text-[#ffbd24]">TASHKENT</span>
      </span>
    </Link>
  );
}

export function SchoolBusSiteShell({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useSchoolBusLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const t = labels[locale];
  const links = [
    ["/how-it-works", t.how],
    ["/safety", t.safety],
    ["/about", t.about],
    ["/faq", t.faq],
    ["/contact", t.contact],
  ];

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const languageControl = (id: string) => (
    <label className="sr-only" htmlFor={id}>
      {locale === "ru" ? "Язык интерфейса" : locale === "uz" ? "Interfeys tili" : "Interface language"}
    </label>
  );

  return (
    <div className="min-h-screen bg-white text-[#101a2e]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 shadow-[0_3px_16px_rgba(16,26,46,.04)] backdrop-blur">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-7 lg:px-12">
          <Brand />
          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
            {links.map(([href, text]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) => `rounded-lg px-1 py-2 text-[13px] font-semibold transition ${isActive ? "text-[#9c6c00]" : "text-slate-600 hover:text-[#101a2e]"}`}
              >
                {text}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2.5 md:flex">
            {languageControl("schoolbus-language")}
            <select
              id="schoolbus-language"
              aria-label={t.home === "Главная" ? "Язык" : t.home === "Bosh sahifa" ? "Til" : "Language"}
              value={locale}
              onChange={(event) => setLocale(event.target.value as SchoolBusLocale)}
              className="h-10 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-[#d59b10] focus:ring-2 focus:ring-[#ffb900]/20"
            >
              <option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option>
            </select>
            <Link to="/login" className="rounded-full px-3 py-2.5 text-sm font-bold text-[#101a2e] transition hover:bg-slate-100">{t.login}</Link>
            <TelegramCTA className="min-h-10 px-3.5">{t.telegram}</TelegramCTA>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <TelegramCTA className="min-h-10 px-3 text-xs">{locale === "ru" ? "Telegram" : locale === "uz" ? "Telegram" : "Telegram"}</TelegramCTA>
            <button
              type="button"
              aria-label={menuOpen ? t.close : t.menu}
              aria-expanded={menuOpen}
              aria-controls="schoolbus-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#101a2e] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d59b10]"
            >
              {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div id="schoolbus-mobile-menu" className="mobile-menu-enter border-t border-slate-100 bg-white px-4 pb-5 pt-2 md:hidden">
            <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col">
              <NavLink to="/" className="mobile-nav-link">{t.home}</NavLink>
              {links.map(([href, text]) => <NavLink key={href} to={href} className={({ isActive }) => `mobile-nav-link ${isActive ? "text-[#9c6c00]" : ""}`}>{text}</NavLink>)}
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2"><span className="text-xs font-semibold text-slate-500">{locale === "ru" ? "Язык" : locale === "uz" ? "Til" : "Language"}</span>{languageControl("schoolbus-language-mobile")}<select id="schoolbus-language-mobile" aria-label="Language" value={locale} onChange={(event) => setLocale(event.target.value as SchoolBusLocale)} className="h-10 rounded-lg border border-slate-200 bg-white px-2 text-sm"><option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option></select></div>
                <Link to="/login" className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold">{t.login}</Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      <div key={location.pathname} className="site-page-enter">{children}</div>
      <footer className="bg-[#101a2e] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-12">
          <div><Brand /><p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{t.footer}</p></div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
            <Link to="/how-it-works" className="hover:text-white">{t.how}</Link>
            <Link to="/safety" className="hover:text-white">{t.safety}</Link>
            <Link to="/about" className="hover:text-white">{t.about}</Link>
            <Link to="/contact" className="hover:text-white">{t.contact}</Link>
            <Link to="/faq" className="hover:text-white">{t.faq}</Link>
            <Link to="/privacy" className="hover:text-white">{t.privacy}</Link>
            <Link to="/terms" className="hover:text-white">{t.terms}</Link>
          </nav>
        </div>
        <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><span>© {new Date().getFullYear()} SchoolBus Tashkent</span><a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-300 hover:text-[#ffbd24]"><IconBrandTelegram size={16}/>@schoolbus_tashkent_bot</a></div></div>
      </footer>
    </div>
  );
}

export function PortalShell({ children }: { children: ReactNode }) {
  const { locale } = useSchoolBusLocale();
  const location = useLocation();
  const nav = locale === "ru"
    ? [["/dashboard", "Обзор"], ["/rides/find", "Найти поездку"], ["/rides/offer", "Предложить место"], ["/rides/my-rides", "Мои поездки"], ["/settings", "Профиль"]]
    : locale === "uz"
      ? [["/dashboard", "Umumiy ko‘rinish"], ["/rides/find", "Safar topish"], ["/rides/offer", "Joy taklif qilish"], ["/rides/my-rides", "Safarlarim"], ["/settings", "Profil"]]
      : [["/dashboard", "Overview"], ["/rides/find", "Find a ride"], ["/rides/offer", "Offer a seat"], ["/rides/my-rides", "My rides"], ["/settings", "Profile"]];
  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#101a2e]">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12"><Brand/><div className="flex flex-wrap items-center gap-2">{nav.map(([href, label]) => <NavLink key={href} to={href} className={`rounded-full px-3 py-2 text-sm font-semibold ${location.pathname === href ? "bg-[#fff3d3] text-[#835d00]" : "text-slate-600 hover:bg-slate-100"}`}>{label}</NavLink>)}<button onClick={() => void signOut()} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50">{locale === "ru" ? "Выйти" : locale === "uz" ? "Chiqish" : "Sign out"}</button></div></div></header>
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">{children}</div>
    </div>
  );
}
