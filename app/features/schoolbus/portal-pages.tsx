import { actionErrorMessage, useActionMutation, useActionQuery } from "@agent-native/core/client/hooks";
import { IconArrowRight, IconCalendar, IconMapPin, IconSchool, IconUsers } from "@tabler/icons-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { appPath } from "@agent-native/core/client/api-path";
import { Link, useLocation } from "react-router";

import { useSchoolBusLocale, type SchoolBusLocale } from "@/components/schoolbus/site-shell";

type LocaleCopy = {
  title: string;
  subtitle: string;
  loading: string;
  retry: string;
  noData: string;
  error: string;
  nextSteps: string;
  find: string;
  offer: string;
  myRides: string;
  school: string;
  area: string;
  date: string;
  departure: string;
  arrival: string;
  seats: string;
  search: string;
  request: string;
  cancel: string;
  saveOffer: string;
  filters: string;
  searchNotice: string;
  noResults: string;
  emptyOffers: string;
  emptyRequests: string;
  myOffers: string;
  myRequests: string;
  incomingRequests: string;
  acceptRequest: string;
  rejectRequest: string;
  pendingReview: string;
  pending: string;
  approved: string;
  approvedOffer: string;
  rejected: string;
  cancelled: string;
  requestSent: string;
  offerCreated: string;
  settingsTitle: string;
  language: string;
  profileNote: string;
  dashboardInfo: string;
  upcoming: string;
  countOffers: string;
  countRequests: string;
  offerNote: string;
  authTitleLogin: string;
  authTitleRegister: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: string;
  login: string;
  register: string;
  switchRegister: string;
  switchLogin: string;
  recovery: string;
  consentRequired: string;
  passwordMismatch: string;
  passwordTooShort: string;
  invalidResponse: string;
  home: string;
  seatsPlural: string;
  notVerified: string;
};

const copy: Record<SchoolBusLocale, LocaleCopy> = {
  ru: {
    title: "Кабинет семьи",
    subtitle: "Поездки для семей SchoolBus Tashkent",
    loading: "Загружаем данные…",
    retry: "Повторить",
    noData: "Пока нет данных.",
    error: "Не удалось загрузить данные. Попробуйте ещё раз.",
    nextSteps: "Следующие шаги",
    find: "Найти поездку",
    offer: "Предложить место",
    myRides: "Мои поездки",
    school: "Школа",
    area: "Примерный район посадки",
    date: "Дата поездки",
    departure: "Отправление",
    arrival: "Прибытие",
    seats: "Количество мест",
    search: "Искать поездки",
    request: "Запросить место",
    cancel: "Отменить",
    saveOffer: "Опубликовать предложение",
    filters: "Фильтры",
    searchNotice: "Поиск фильтрует только по школе, примерному району и дате. Это не оптимизация маршрута; участники и поездки не имеют подтверждённого статуса проверки.",
    noResults: "Подходящих предложений не найдено.",
    emptyOffers: "У вас пока нет предложений мест.",
    emptyRequests: "У вас пока нет запросов мест.",
    myOffers: "Мои предложения",
    myRequests: "Мои запросы мест",
    incomingRequests: "Запросы на мои поездки",
    acceptRequest: "Принять запрос",
    rejectRequest: "Отклонить",
    pendingReview: "Ожидает проверки",
    pending: "Ожидает ответа",
    approved: "Принято; согласуйте детали напрямую",
    approvedOffer: "Одобрено координатором",
    rejected: "Отклонено",
    cancelled: "Отменено",
    requestSent: "Запрос отправлен. Статус от сервера:",
    offerCreated: "Предложение создано. Статус от сервера:",
    settingsTitle: "Настройки",
    language: "Язык интерфейса",
    profileNote: "Данные профиля семьи пока не сохраняются в приложении.",
    dashboardInfo: "Счётчики отражают только предложения и запросы, возвращённые для вашей учётной записи.",
    upcoming: "Ближайшие поездки",
    countOffers: "Предложения на проверке",
    countRequests: "Запросы в ожидании",
    offerNote: "Укажите только примерный район, не точный адрес. Новые предложения ожидают проверки.",
    authTitleLogin: "Вход в кабинет",
    authTitleRegister: "Создать аккаунт",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Повторите пароль",
    consent: "Я согласен(на) с обработкой данных, необходимых для координации поездок, и понимаю, что совпадение не подтверждает поездку или проверку участников.",
    login: "Войти",
    register: "Зарегистрироваться",
    switchRegister: "Нет аккаунта? Создать",
    switchLogin: "Уже есть аккаунт? Войти",
    recovery: "Восстановить доступ",
    consentRequired: "Для регистрации необходимо согласие.",
    passwordMismatch: "Пароли не совпадают.",
    passwordTooShort: "Пароль должен содержать не менее 12 символов.",
    invalidResponse: "Сервер вернул неожиданный ответ. Попробуйте ещё раз.",
    home: "На главную",
    seatsPlural: "мест",
    notVerified: "Не подтверждено",
  },
  uz: {
    title: "Oila kabineti",
    subtitle: "SchoolBus Tashkent oilalari uchun safarlar",
    loading: "Ma’lumotlar yuklanmoqda…",
    retry: "Qayta urinish",
    noData: "Hozircha ma’lumot yo‘q.",
    error: "Ma’lumotlarni yuklab bo‘lmadi. Qayta urinib ko‘ring.",
    nextSteps: "Keyingi qadamlar",
    find: "Safar topish",
    offer: "Joy taklif qilish",
    myRides: "Safarlarim",
    school: "Maktab",
    area: "Taxminiy chiqish hududi",
    date: "Safar sanasi",
    departure: "Jo‘nash",
    arrival: "Yetib borish",
    seats: "Joylar soni",
    search: "Safarlarni qidirish",
    request: "Joy so‘rash",
    cancel: "Bekor qilish",
    saveOffer: "Taklifni yuborish",
    filters: "Filtrlar",
    searchNotice: "Qidiruv faqat maktab, taxminiy hudud va sana bo‘yicha ishlaydi. Bu yo‘nalishni optimallashtirmaydi; ishtirokchilar va safarlar tekshirilgani tasdiqlanmagan.",
    noResults: "Mos takliflar topilmadi.",
    emptyOffers: "Sizda hali joy takliflari yo‘q.",
    emptyRequests: "Sizda hali joy so‘rovlari yo‘q.",
    myOffers: "Takliflarim",
    myRequests: "Joy so‘rovlarim",
    incomingRequests: "Safarlarimga so‘rovlar",
    acceptRequest: "So‘rovni qabul qilish",
    rejectRequest: "Rad etish",
    pendingReview: "Ko‘rib chiqilmoqda",
    pending: "Javob kutilmoqda",
    approved: "Qabul qilindi; tafsilotlarni bevosita kelishing",
    approvedOffer: "Koordinator tasdiqladi",
    rejected: "Rad etilgan",
    cancelled: "Bekor qilingan",
    requestSent: "So‘rov yuborildi. Server holati:",
    offerCreated: "Taklif yaratildi. Server holati:",
    settingsTitle: "Sozlamalar",
    language: "Interfeys tili",
    profileNote: "Oila profil ma’lumotlari hali ilovada saqlanmaydi.",
    dashboardInfo: "Hisoblagichlar faqat hisobingiz uchun qaytarilgan taklif va so‘rovlarni ko‘rsatadi.",
    upcoming: "Yaqin safarlar",
    countOffers: "Ko‘rib chiqilayotgan takliflar",
    countRequests: "Kutilayotgan so‘rovlar",
    offerNote: "Faqat taxminiy hududni kiriting, aniq manzilni emas. Yangi takliflar ko‘rib chiqiladi.",
    authTitleLogin: "Kabinetga kirish",
    authTitleRegister: "Hisob yaratish",
    email: "Elektron pochta",
    password: "Parol",
    confirmPassword: "Parolni takrorlang",
    consent: "Safarlarni muvofiqlashtirish uchun zarur ma’lumotlarga roziman; moslik safar yoki ishtirokchilar tekshirilganini anglatmasligini tushunaman.",
    login: "Kirish",
    register: "Ro‘yxatdan o‘tish",
    switchRegister: "Hisobingiz yo‘qmi? Yaratish",
    switchLogin: "Hisobingiz bormi? Kirish",
    recovery: "Hisobni tiklash",
    consentRequired: "Ro‘yxatdan o‘tish uchun rozilik kerak.",
    passwordMismatch: "Parollar mos kelmadi.",
    passwordTooShort: "Parol kamida 12 ta belgidan iborat bo‘lishi kerak.",
    invalidResponse: "Server kutilmagan javob qaytardi. Qayta urinib ko‘ring.",
    home: "Bosh sahifa",
    seatsPlural: "joy",
    notVerified: "Tasdiqlanmagan",
  },
  en: {
    title: "Family dashboard",
    subtitle: "SchoolBus Tashkent family rides",
    loading: "Loading data…",
    retry: "Try again",
    noData: "No data yet.",
    error: "Could not load data. Please try again.",
    nextSteps: "Next steps",
    find: "Find a ride",
    offer: "Offer a seat",
    myRides: "My rides",
    school: "School",
    area: "Approximate pickup area",
    date: "Ride date",
    departure: "Departure",
    arrival: "Arrival",
    seats: "Number of seats",
    search: "Search rides",
    request: "Request a seat",
    cancel: "Cancel",
    saveOffer: "Publish offer",
    filters: "Filters",
    searchNotice: "Search filters only by school, approximate area, and date. It does not optimize routes; participants and rides have no verified status.",
    noResults: "No matching offers found.",
    emptyOffers: "You have no seat offers yet.",
    emptyRequests: "You have no seat requests yet.",
    myOffers: "My offers",
    myRequests: "My seat requests",
    incomingRequests: "Requests for my rides",
    acceptRequest: "Accept request",
    rejectRequest: "Reject",
    pendingReview: "Pending review",
    pending: "Pending response",
    approved: "Accepted; agree details directly",
    approvedOffer: "Coordinator approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    requestSent: "Request sent. Server status:",
    offerCreated: "Offer created. Server status:",
    settingsTitle: "Settings",
    language: "Interface language",
    profileNote: "Family profile data is not stored in the app yet.",
    dashboardInfo: "Counts reflect only offers and requests returned for your account.",
    upcoming: "Upcoming rides",
    countOffers: "Offers pending review",
    countRequests: "Requests awaiting a response",
    offerNote: "Enter an approximate area only, not an exact address. New offers await review.",
    authTitleLogin: "Sign in to your dashboard",
    authTitleRegister: "Create an account",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    consent: "I consent to processing data needed to coordinate rides and understand that a match does not confirm a ride or participant verification.",
    login: "Sign in",
    register: "Create account",
    switchRegister: "New here? Create an account",
    switchLogin: "Already have an account? Sign in",
    recovery: "Recover account",
    consentRequired: "Consent is required to register.",
    passwordMismatch: "Passwords do not match.",
    passwordTooShort: "Password must be at least 12 characters.",
    invalidResponse: "The server returned an unexpected response. Please try again.",
    home: "Home",
    seatsPlural: "seats",
    notVerified: "Not verified",
  },
};

const fieldClass = "mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-[#101a2e] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#c58d00] focus:ring-4 focus:ring-[#ffb900]/20";
const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ffb900] px-5 py-2.5 text-sm font-bold text-[#101a2e] transition hover:bg-[#ffd15c] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b77d00]";
const panelClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_26px_rgba(16,26,46,.045)] sm:p-6";

function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div className="mb-6"><h1 className="text-2xl font-black tracking-tight text-[#101a2e] sm:text-3xl">{title}</h1>{subtitle && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>}</div>;
}

function InlineError({ children }: { children: ReactNode }) {
  return <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800">{children}</p>;
}

function statusLabel(status: string, t: LocaleCopy, isOffer = false) {
  if (status === "pending") return isOffer ? t.pendingReview : t.pending;
  if (status === "approved") return isOffer ? t.approvedOffer : t.approved;
  if (status === "rejected") return t.rejected;
  if (status === "cancelled") return t.cancelled;
  return status;
}

function StatusPill({ status, t, isOffer = false }: { status: string; t: LocaleCopy; isOffer?: boolean }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${status === "approved" ? "bg-emerald-50 text-emerald-800" : status === "cancelled" || status === "rejected" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-900"}`}>{statusLabel(status, t, isOffer)}</span>;
}

export function DashboardPage() {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];
  const query = useActionQuery("list-my-rides", {});
  const data = query.data;
  const pendingOffers = data?.offers.filter((ride) => ride.status === "pending").length ?? 0;
  const pendingRequests = data?.requests.filter((ride) => ride.status === "pending").length ?? 0;
  const upcoming = data
    ? [
        ...data.offers.filter((ride) => ride.rideDate >= new Date().toISOString().slice(0, 10)).map((ride) => ({ id: ride.id, date: ride.rideDate, time: ride.departureTime, school: ride.school, area: ride.approximateArea, status: ride.status, isOffer: true })),
        ...data.requests.filter((ride) => ride.rideDate >= new Date().toISOString().slice(0, 10)).map((ride) => ({ id: ride.id, date: ride.rideDate, time: ride.departureTime, school: ride.school, area: ride.approximateArea, status: ride.status, isOffer: false })),
      ].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)).slice(0, 3)
    : [];

  return <main><PageHeading title={t.title} subtitle={t.subtitle} />
    {query.isLoading ? <p className="text-sm text-slate-600" role="status">{t.loading}</p> : query.isError ? <div className="space-y-3"><InlineError>{actionErrorMessage(query.error) ?? t.error}</InlineError><button type="button" className={buttonClass} onClick={() => void query.refetch()}>{t.retry}</button></div> : data ? <>
      <div className="grid gap-3 sm:grid-cols-2">
        <section className={`${panelClass} flex items-center justify-between gap-4`}><div><p className="text-sm font-semibold text-slate-600">{t.countOffers}</p><p className="mt-1 text-3xl font-black tabular-nums">{pendingOffers}</p></div><span className="rounded-xl bg-amber-50 p-3 text-amber-800"><IconSchool size={23} aria-hidden="true" /></span></section>
        <section className={`${panelClass} flex items-center justify-between gap-4`}><div><p className="text-sm font-semibold text-slate-600">{t.countRequests}</p><p className="mt-1 text-3xl font-black tabular-nums">{pendingRequests}</p></div><span className="rounded-xl bg-slate-100 p-3 text-slate-700"><IconUsers size={23} aria-hidden="true" /></span></section>
      </div>
      <section className={`${panelClass} mt-5`}><h2 className="text-lg font-bold">{t.nextSteps}</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><NextLink to="/rides/find" label={t.find} /><NextLink to="/rides/offer" label={t.offer} /><NextLink to="/rides/my-rides" label={t.myRides} /></div></section>
      <section className={`${panelClass} mt-5`}><h2 className="text-lg font-bold">{t.upcoming}</h2>{upcoming.length ? <ul className="mt-3 divide-y divide-slate-100">{upcoming.map((ride) => <li key={ride.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="font-semibold">{ride.school}</p><p className="mt-1 text-sm text-slate-600">{ride.date} · {ride.time} · {ride.area}</p></div><StatusPill status={ride.status} t={t} isOffer={ride.isOffer} /></li>)}</ul> : <p className="mt-3 text-sm text-slate-600">{t.noData}</p>}</section>
      <p className="mt-4 text-xs leading-5 text-slate-500">{t.dashboardInfo}</p>
    </> : <p className="text-sm text-slate-600">{t.noData}</p>}
  </main>;
}

function NextLink({ to, label }: { to: string; label: string }) {
  return <Link to={to} className="group flex min-h-14 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#101a2e] transition hover:border-[#e2b544] hover:bg-[#fffaf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b77d00]">{label}<IconArrowRight size={18} className="transition group-hover:translate-x-0.5" aria-hidden="true" /></Link>;
}

export function OfferRidePage() {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];
  const mutation = useActionMutation("create-ride-offer");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dateMin = new Date().toISOString().slice(0, 10);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const departureTime = String(values.get("departureTime"));
    const arrivalTime = String(values.get("arrivalTime"));
    if (arrivalTime <= departureTime) {
      setError(locale === "ru" ? "Время прибытия должно быть позже отправления." : locale === "uz" ? "Yetib borish vaqti jo‘nashdan keyin bo‘lishi kerak." : "Arrival time must be later than departure time.");
      return;
    }
    try {
      const result = await mutation.mutateAsync({
        school: String(values.get("school")).trim(),
        approximateArea: String(values.get("approximateArea")).trim(),
        rideDate: String(values.get("rideDate")),
        departureTime,
        arrivalTime,
        seatCapacity: Number(values.get("seatCapacity")),
      });
      setMessage(`${t.offerCreated} ${statusLabel(result.status, t, true)}.`);
      form.reset();
    } catch (cause) {
      setError(actionErrorMessage(cause) ?? t.error);
    }
  }

  return <main><PageHeading title={t.offer} /><form onSubmit={submit} className={`${panelClass} max-w-2xl space-y-4`}>
    <label className="block text-sm font-semibold">{t.school}<input className={fieldClass} name="school" required maxLength={160} autoComplete="organization" /></label>
    <label className="block text-sm font-semibold">{t.area}<input className={fieldClass} name="approximateArea" required maxLength={200} aria-describedby="area-guidance" /></label>
    <p id="area-guidance" className="-mt-2 text-xs leading-5 text-slate-500">{t.offerNote}</p>
    <label className="block text-sm font-semibold">{t.date}<input className={fieldClass} type="date" name="rideDate" required min={dateMin} /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">{t.departure}<input className={fieldClass} type="time" name="departureTime" required /></label><label className="block text-sm font-semibold">{t.arrival}<input className={fieldClass} type="time" name="arrivalTime" required /></label></div>
    <label className="block max-w-xs text-sm font-semibold">{t.seats}<input className={fieldClass} type="number" name="seatCapacity" required min={1} max={100} defaultValue={1} /></label>
    {error && <InlineError>{error}</InlineError>}{message && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm font-semibold text-emerald-900">{message}</p>}
    <button className={buttonClass} type="submit" disabled={mutation.isPending}>{mutation.isPending ? t.loading : t.saveOffer}</button>
  </form></main>;
}

type SearchFilters = { school?: string; approximateArea?: string; rideDate?: string; limit: number };

export function FindRidePage() {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];
  const [filters, setFilters] = useState<SearchFilters>({ limit: 50 });
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const query = useActionQuery("search-ride-offers", filters, { enabled: searched });
  const request = useActionMutation("request-ride-seat");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const school = String(values.get("school")).trim();
    const approximateArea = String(values.get("approximateArea")).trim();
    const rideDate = String(values.get("rideDate"));
    setFilters({ ...(school ? { school } : {}), ...(approximateArea ? { approximateArea } : {}), ...(rideDate ? { rideDate } : {}), limit: 50 });
    setMessage("");
    setError("");
    setSearched(true);
  }

  async function requestSeat(id: string) {
    setError("");
    setMessage("");
    try {
      const result = await request.mutateAsync({ id, seatsRequested: 1 });
      setMessage(`${t.requestSent} ${statusLabel(result.status, t, false)}.`);
    } catch (cause) {
      setError(actionErrorMessage(cause) ?? t.error);
    }
  }

  return <main><PageHeading title={t.find} />
    <form onSubmit={submit} className={`${panelClass} space-y-4`}><h2 className="text-base font-bold">{t.filters}</h2><div className="grid gap-4 sm:grid-cols-3">
      <label className="block text-sm font-semibold">{t.school}<input className={fieldClass} name="school" maxLength={160} /></label>
      <label className="block text-sm font-semibold">{t.area}<input className={fieldClass} name="approximateArea" maxLength={200} /></label>
      <label className="block text-sm font-semibold">{t.date}<input className={fieldClass} type="date" name="rideDate" /></label>
    </div><p className="text-xs leading-5 text-slate-600">{t.searchNotice}</p><button className={buttonClass} type="submit">{t.search}</button></form>
    {error && <div className="mt-4"><InlineError>{error}</InlineError></div>}{message && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm font-semibold text-emerald-900">{message}</p>}
    {searched && <section className="mt-5" aria-live="polite">{query.isLoading ? <p className="text-sm text-slate-600">{t.loading}</p> : query.isError ? <div className="space-y-3"><InlineError>{actionErrorMessage(query.error) ?? t.error}</InlineError><button type="button" className={buttonClass} onClick={() => void query.refetch()}>{t.retry}</button></div> : query.data?.length ? <ul className="grid gap-3">{query.data.map((ride) => <li key={ride.id} className={`${panelClass} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}><div><h2 className="font-bold">{ride.school}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600"><span className="inline-flex items-center gap-1.5"><IconMapPin size={16} aria-hidden="true" />{ride.approximateArea}</span><span className="inline-flex items-center gap-1.5"><IconCalendar size={16} aria-hidden="true" />{ride.rideDate} · {ride.departureTime}–{ride.arrivalTime}</span><span className="inline-flex items-center gap-1.5"><IconUsers size={16} aria-hidden="true" />{ride.seatsAvailable} {t.seatsPlural}</span></div><p className="mt-2 text-xs text-slate-500">{t.notVerified}</p></div><button type="button" className={buttonClass} onClick={() => void requestSeat(ride.id)} disabled={request.isPending}>{request.isPending ? t.loading : t.request}</button></li>)}</ul> : <p className={`${panelClass} text-sm text-slate-600`}>{t.noResults}</p>}</section>}
  </main>;
}

export function MyRidesPage() {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];
  const query = useActionQuery("list-my-rides", {});
  const cancelOffer = useActionMutation("cancel-ride-offer");
  const cancelRequest = useActionMutation("cancel-ride-request");
  const reviewRequest = useActionMutation("review-ride-request");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState("");

  async function reviewIncoming(id: string, status: "approved" | "rejected") {
    setBusyId(id);
    setError("");
    setMessage("");
    try {
      const result = await reviewRequest.mutateAsync({ id, status });
      setMessage(`${t.incomingRequests}: ${statusLabel(result.status, t)}.`);
    } catch (cause) {
      setError(actionErrorMessage(cause) ?? t.error);
    } finally {
      setBusyId("");
    }
  }

  async function cancel(kind: "offer" | "request", id: string) {
    setBusyId(id);
    setError("");
    setMessage("");
    try {
      const result = kind === "offer" ? await cancelOffer.mutateAsync({ id }) : await cancelRequest.mutateAsync({ id });
      setMessage(`${t.cancel}: ${statusLabel(result.status, t)}.`);
    } catch (cause) {
      setError(actionErrorMessage(cause) ?? t.error);
    } finally {
      setBusyId("");
    }
  }

  return <main><PageHeading title={t.myRides} />{error && <div className="mb-4"><InlineError>{error}</InlineError></div>}{message && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-sm font-semibold text-emerald-900">{message}</p>}
    {query.isLoading ? <p className="text-sm text-slate-600">{t.loading}</p> : query.isError ? <div className="space-y-3"><InlineError>{actionErrorMessage(query.error) ?? t.error}</InlineError><button type="button" className={buttonClass} onClick={() => void query.refetch()}>{t.retry}</button></div> : query.data && <div className="space-y-5">
      <section className={panelClass}><h2 className="text-lg font-bold">{t.myOffers}</h2>{query.data.offers.length ? <ul className="mt-3 divide-y divide-slate-100">{query.data.offers.map((ride) => <li key={ride.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="font-semibold">{ride.school}</p><p className="mt-1 text-sm text-slate-600">{ride.rideDate} · {ride.departureTime}–{ride.arrivalTime} · {ride.approximateArea} · {ride.seatCapacity} {t.seats}</p><div className="mt-2"><StatusPill status={ride.status} t={t} isOffer /></div></div>{(ride.status === "pending" || ride.status === "approved") && <button className="min-h-10 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60" type="button" disabled={busyId === ride.id} onClick={() => void cancel("offer", ride.id)}>{busyId === ride.id ? t.loading : t.cancel}</button>}</li>)}</ul> : <p className="mt-3 text-sm text-slate-600">{t.emptyOffers}</p>}</section>
      <section className={panelClass}><h2 className="text-lg font-bold">{t.myRequests}</h2>{query.data.requests.length ? <ul className="mt-3 divide-y divide-slate-100">{query.data.requests.map((ride) => <li key={ride.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="font-semibold">{ride.school}</p><p className="mt-1 text-sm text-slate-600">{ride.rideDate} · {ride.departureTime}–{ride.arrivalTime} · {ride.approximateArea} · {ride.seatsRequested} {t.seats}</p><div className="mt-2"><StatusPill status={ride.status} t={t} /></div></div>{(ride.status === "pending" || ride.status === "approved") && <button className="min-h-10 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60" type="button" disabled={busyId === ride.id} onClick={() => void cancel("request", ride.id)}>{busyId === ride.id ? t.loading : t.cancel}</button>}</li>)}</ul> : <p className="mt-3 text-sm text-slate-600">{t.emptyRequests}</p>}</section>
      <section className={panelClass}><h2 className="text-lg font-bold">{t.incomingRequests}</h2>{query.data.incomingRequests.length ? <ul className="mt-3 divide-y divide-slate-100">{query.data.incomingRequests.map((ride) => <li key={ride.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="min-w-0"><p className="font-semibold">{ride.school}</p><p className="mt-1 text-sm text-slate-600">{ride.rideDate} · {ride.departureTime}–{ride.arrivalTime} · {ride.approximateArea} · {ride.seatsRequested} {t.seats}</p><div className="mt-2"><StatusPill status={ride.status} t={t} /></div></div>{ride.status === "pending" && ride.offerStatus === "approved" && <div className="flex gap-2"><button className={buttonClass} type="button" disabled={busyId === ride.id} onClick={() => void reviewIncoming(ride.id, "approved")}>{busyId === ride.id ? t.loading : t.acceptRequest}</button><button className="min-h-11 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60" type="button" disabled={busyId === ride.id} onClick={() => void reviewIncoming(ride.id, "rejected")}>{t.rejectRequest}</button></div>}</li>)}</ul> : <p className="mt-3 text-sm text-slate-600">{t.noData}</p>}</section>
    </div>}
  </main>;
}

export function SettingsPage() {
  const { locale, setLocale } = useSchoolBusLocale();
  const t = copy[locale];
  return <main><PageHeading title={t.settingsTitle} /><section className={`${panelClass} max-w-xl`}><label htmlFor="portal-locale" className="block text-sm font-bold">{t.language}</label><select id="portal-locale" className={fieldClass} value={locale} onChange={(event) => setLocale(event.target.value as SchoolBusLocale)}><option value="ru">Русский</option><option value="uz">O‘zbekcha</option><option value="en">English</option></select><p className="mt-4 text-sm leading-6 text-slate-600">{t.profileNote}</p></section></main>;
}

async function postAuth(path: string, email: string, password: string): Promise<void> {
  const response = await fetch(appPath(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });
  const payload: unknown = await response.json().catch(() => undefined);
  if (!response.ok || !payload || typeof payload !== "object" || !("ok" in payload) || payload.ok !== true) {
    const detail = payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : undefined;
    throw new Error(detail ?? "");
  }
}

function authFailure(_error: unknown, t: LocaleCopy) {
  return t.invalidResponse;
}

function safeReturnPath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/dashboard";
}

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const destination = safeReturnPath(params.get("return"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const isRegister = mode === "register";
  const counterpart = isRegister ? "/login" : "/register";
  const query = params.get("return");
  const linkTo = query ? `${counterpart}?return=${encodeURIComponent(query)}` : counterpart;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (isRegister && !accepted) {
      setError(t.consentRequired);
      return;
    }
    const values = new FormData(form);
    const email = String(values.get("email")).trim();
    const password = String(values.get("password"));
    if (password.length < 12) {
      setError(t.passwordTooShort);
      return;
    }
    if (isRegister && password !== String(values.get("confirmPassword"))) {
      setError(t.passwordMismatch);
      return;
    }
    setBusy(true);
    try {
      if (isRegister) await postAuth("/_agent-native/auth/register", email, password);
      await postAuth("/_agent-native/auth/login", email, password);
      window.location.assign(destination);
    } catch (cause) {
      setError(authFailure(cause, t));
    } finally {
      setBusy(false);
    }
  }

  return <main className="min-h-[75vh] bg-[#f4f6f9] px-4 py-10 sm:py-16"><div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(16,26,46,.10)] md:grid-cols-[.9fr_1.1fr]">
    <div className="flex flex-col justify-between bg-[#101a2e] p-7 text-white sm:p-10"><Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#ffcf55]"><IconSchool size={22} className="text-[#ffb900]" aria-hidden="true" />SchoolBus Tashkent</Link><div className="my-10 md:my-16"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffcc4d]">{t.subtitle}</p><h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{isRegister ? t.authTitleRegister : t.authTitleLogin}</h1></div><Link to="/" className="text-sm text-slate-300 hover:text-white">{t.home}</Link></div>
    <div className="p-6 sm:p-10"><h2 className="text-2xl font-black tracking-tight text-[#101a2e]">{isRegister ? t.authTitleRegister : t.authTitleLogin}</h2><form className="mt-6 space-y-4" onSubmit={submit}>
      <label className="block text-sm font-semibold">{t.email}<input className={fieldClass} type="email" name="email" required autoComplete="email" maxLength={254} /></label>
      <label className="block text-sm font-semibold">{t.password}<input className={fieldClass} type="password" name="password" required autoComplete={isRegister ? "new-password" : "current-password"} minLength={12} maxLength={128} /></label>
      {isRegister && <><label className="block text-sm font-semibold">{t.confirmPassword}<input className={fieldClass} type="password" name="confirmPassword" required autoComplete="new-password" minLength={12} maxLength={128} /></label><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5 text-sm leading-5 text-slate-700"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#d49a08]" required />{t.consent}</label></>}
      {error && <InlineError>{error}</InlineError>}
      <button className={`${buttonClass} w-full`} disabled={busy || (isRegister && !accepted)} type="submit">{busy ? t.loading : isRegister ? t.register : t.login}</button>
    </form><div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600"><Link className="font-bold text-[#775500] underline underline-offset-4 hover:text-[#101a2e]" to={linkTo}>{isRegister ? t.switchLogin : t.switchRegister}</Link>{!isRegister && <a className="font-semibold text-slate-600 underline underline-offset-4 hover:text-[#101a2e]" href="/sign-in">{t.recovery}</a>}</div>
    <p className="mt-5 text-xs leading-5 text-slate-500">{locale === "ru" ? "Если регистрация прошла, вход выполняется автоматически." : locale === "uz" ? "Ro‘yxatdan o‘tgach, tizimga avtomatik kirasiz." : "After registration, you will be signed in automatically."}</p></div>
  </div></main>;
}
