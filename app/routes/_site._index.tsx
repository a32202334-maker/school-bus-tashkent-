import {
  IconArrowDown,
  IconArrowRight,
  IconBellRinging,
  IconBrandTelegram,
  IconCar,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconHeartHandshake,
  IconMapPin,
  IconRoute,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { useSchoolBusLocale } from "@/components/schoolbus/site-shell";
import { Link } from "react-router";

const copy = {
  ru: {
    nav: ["Как это работает", "Безопасность", "Пилот"],
    signIn: "Открыть Telegram",
    eyebrow: "ШКОЛЬНЫЕ ПОЕЗДКИ — ВМЕСТЕ",
    heroTitle: "Школьная дорога проще, когда семьи едут вместе.",
    heroText: "Находим семьи, которые направляются в одну школу примерно в одно время, чтобы родители могли согласовать совместную поездку.",
    mainCta: "Найти совместную поездку",
    secondaryCta: "Открыть Telegram-бот",
    note: "Координатор пилота помогает согласовать договорённости.",
    heroTag: "Пилот SchoolBus Tashkent",
    problemLabel: "КОНТЕКСТ И ПРОБЛЕМА",
    problemTitle: "Утро у школы можно организовать лучше",
    problemIntro: "Семьи часто едут в одну школу примерно в одно время — каждая на отдельной машине.",
    problemCards: [
      ["Отдельные поездки", "Родители возят детей в одни и те же школы на отдельных автомобилях."],
      ["Скопление у входов", "Машины накапливаются у школьных входов в одно и то же время."],
      ["Потеря времени", "Семьи тратят утреннее время на пробки и поиск места для остановки."],
    ],
    sourceNote: "Проблема и результаты пилота будут подтверждаться опросами родителей и наблюдениями у конкретных школ.",
    howLabel: "КАК ЭТО РАБОТАЕТ",
    howTitle: "Путь семьи — от расписания до согласованной поездки",
    steps: [
      ["Расскажите о расписании", "Выберите школу, район посадки, дни и удобное время."],
      ["Найдите совместимость", "Сопоставьте школу, расписание, район и свободные места."],
      ["Согласуйте поездку", "Родители рассматривают предложение, а координатор помогает подтвердить договорённость."],
    ],
    solutionTag: "КООРДИНАЦИЯ ЧЕРЕЗ TELEGRAM",
    solutionTitle: "Начните с бота — без лишних поездок по незнакомым маршрутам",
    solutionText: "Существующий Telegram-бот — точка входа для участников пилота. Веб-платформа дополняет этот путь понятной информацией о процессе и мерах безопасности.",
    botLink: "Открыть @schoolbus_tashkent_bot",
    statusTitle: "Статус по материалам проекта",
    statusRows: [
      ["Регистрация и выбор языка", "Уже работает"],
      ["Школа, район и расписание", "Уже работает"],
      ["Подбор совместимых семей", "В разработке"],
      ["Подтверждение координатором", "Уже работает"],
      ["Напоминания о поездках", "Запланировано"],
    ],
    safetyLabel: "БЕЗОПАСНОСТЬ И ДОВЕРИЕ",
    safetyTitle: "Безопасность — это конкретные процессы, а не обещания",
    safetyIntro: "Абсолютной безопасности не бывает. Перед расширением пилота важно определить правила допуска, согласия и передачи ребёнка.",
    safetyCards: [
      ["Допуск участников", "Проверка взрослых и водителей, а также согласие родителей — меры, которые предстоит внедрить."],
      ["Подтверждение поездки", "Участники и координатор должны согласовать состав группы и детали поездки."],
      ["Если возникла проблема", "Канал сообщений об инцидентах и правила отмены нужно определить до запуска поездок."],
    ],
    pilotLabel: "ПИЛОТ И РЕЗУЛЬТАТЫ",
    pilotTitle: "Сначала измеряем. Потом масштабируем.",
    pilotText: "До старта собираются исходные данные. После пилота результаты сравниваются с ними — без неподтверждённых цифр и обещаний.",
    measures: ["Завершённые совместные поездки", "Активные семьи", "Отмены и своевременность", "Предотвращённые поездки — по подтверждённым данным"],
    roadmap: [
      ["01", "Базовые данные", "Опрос родителей и наблюдения до запуска."],
      ["02", "Небольшой пилот", "Проверка сценария на 1–2 школах."],
      ["03", "Оценка", "Сравнение результатов с исходным уровнем."],
      ["04", "Взвешенное расширение", "Новые школы — после оценки спроса и надёжности."],
    ],
    faqLabel: "ЧАСТЫЕ ВОПРОСЫ",
    faqTitle: "Важно знать перед участием",
    faqs: [
      ["Поездка подтверждается автоматически?", "Нет. Совместимость — это только предложение. Родители и координатор должны согласовать поездку."],
      ["Нужно ли устанавливать приложение?", "Для участия в текущем пилоте используйте Telegram-бот @schoolbus_tashkent_bot."],
      ["Платформа уже проверяет водителей?", "В материалах проекта эта функция обозначена как находящаяся в разработке. Не считайте участника проверенным, пока процесс не подтверждён координатором."],
    ],
    finalTitle: "Давайте сделаем школьные поездки более организованными.",
    finalText: "Узнайте о пилоте и зарегистрируйтесь через Telegram-бот проекта.",
    join: "Перейти в Telegram",
    footerNote: "Совместные поездки для семей Ташкента. Пилотный проект.",
    rights: "Все права защищены.",
    menuLabel: "Открыть меню",
    closeLabel: "Закрыть меню",
    languageLabel: "Выбрать язык",
  },
  uz: {
    nav: ["Qanday ishlaydi", "Xavfsizlik", "Pilot"],
    signIn: "Telegram’ni ochish",
    eyebrow: "MAKTABGA — BIRGA",
    heroTitle: "Oilalar birga yo‘lga chiqsa, maktabga borish osonroq.",
    heroText: "Bir maktabga taxminan bir vaqtda boradigan oilalarni topib, ota-onalarga umumiy safarni kelishishga yordam beramiz.",
    mainCta: "Umumiy safar topish",
    secondaryCta: "Telegram-botni ochish",
    note: "Pilot koordinatori kelishuvlarni muvofiqlashtirishga yordam beradi.",
    heroTag: "SchoolBus Tashkent piloti",
    problemLabel: "MUAMMO VA KONTEXT",
    problemTitle: "Maktab atrofidagi tongni yaxshiroq tashkil etish mumkin",
    problemIntro: "Oilalar ko‘pincha bir maktabga taxminan bir vaqtda, alohida avtomobillarda borishadi.",
    problemCards: [["Alohida safarlar", "Ota-onalar bolalarni bir maktabga alohida mashinalarda olib borishadi."], ["Maktab oldidagi tirbandlik", "Mashinalar maktab kirish joylarida bir vaqtda to‘planadi."], ["Yo‘qotilgan vaqt", "Oilalar tongda tirbandlik va to‘xtash joyi izlashga vaqt sarflashadi."]],
    sourceNote: "Muammo va pilot natijalari ota-onalar so‘rovi hamda maktablar atrofidagi kuzatuvlar bilan tasdiqlanadi.",
    howLabel: "QANDAY ISHLAYDI",
    howTitle: "Oila yo‘li — jadvaldan kelishilgan safargacha",
    steps: [["Jadvalni kiriting", "Maktab, hudud, kunlar va qulay vaqtni tanlang."], ["Moslikni toping", "Maktab, jadval, hudud va bo‘sh joylarni solishtiring."], ["Safarni kelishing", "Ota-onalar taklifni ko‘rib chiqadi, koordinator esa kelishuvni tasdiqlashga yordam beradi."]],
    solutionTag: "TELEGRAM ORQALI MUVOFIQLASHTIRISH",
    solutionTitle: "Botdan boshlang — notanish yo‘nalishlarda ortiqcha safarlarsiz",
    solutionText: "Mavjud Telegram-bot pilot ishtirokchilari uchun boshlang‘ich nuqta. Veb-platforma jarayon va xavfsizlik choralari haqida aniq ma’lumot beradi.",
    botLink: "@schoolbus_tashkent_bot’ni ochish",
    statusTitle: "Loyiha materiallaridagi holat",
    statusRows: [["Ro‘yxatdan o‘tish va til tanlash", "Ishlaydi"], ["Maktab, hudud va jadval", "Ishlaydi"], ["Mos oilalarni topish", "Ishlab chiqilmoqda"], ["Koordinator tasdig‘i", "Ishlaydi"], ["Safar eslatmalari", "Rejalashtirilgan"]],
    safetyLabel: "XAVFSIZLIK VA ISHONCH",
    safetyTitle: "Xavfsizlik — va’dalar emas, aniq jarayonlardir",
    safetyIntro: "Mutlaq xavfsizlik bo‘lmaydi. Pilot kengayishidan oldin ishtirokchilar, rozilik va bolani topshirish qoidalarini belgilash muhim.",
    safetyCards: [["Ishtirokchilarni qabul qilish", "Kattalar va haydovchilarni tekshirish hamda ota-onalar roziligini olish hali joriy etilishi kerak."], ["Safarni tasdiqlash", "Ishtirokchilar va koordinator guruh tarkibi va safar tafsilotlarini kelishishi kerak."], ["Muammo yuz bersa", "Safarlar boshlanishidan oldin hodisalar haqida xabar berish va bekor qilish qoidalari belgilanadi."]],
    pilotLabel: "PILOT VA NATIJALAR",
    pilotTitle: "Avval o‘lchaymiz. Keyin kengaytiramiz.",
    pilotText: "Boshlanishidan oldin dastlabki ma’lumotlar yig‘iladi. Pilotdan keyin natijalar shu ko‘rsatkichlar bilan taqqoslanadi.",
    measures: ["Yakunlangan umumiy safarlar", "Faol oilalar", "Bekor qilishlar va vaqtida kelish", "Tasdiqlangan ma’lumotlar bo‘yicha oldi olingan safarlar"],
    roadmap: [["01", "Boshlang‘ich ma’lumotlar", "Ishga tushishdan oldingi so‘rov va kuzatuvlar."], ["02", "Kichik pilot", "1–2 maktabda jarayonni sinash."], ["03", "Baholash", "Natijalarni boshlang‘ich ko‘rsatkichlar bilan solishtirish."], ["04", "Bosqichma-bosqich kengayish", "Yangi maktablar — talab va ishonchlilik baholangandan keyin."]],
    faqLabel: "KO‘P SO‘RALADIGAN SAVOLLAR",
    faqTitle: "Ishtirok etishdan oldin bilib oling",
    faqs: [["Safar avtomatik tasdiqlanadimi?", "Yo‘q. Moslik faqat taklifdir. Ota-onalar va koordinator safarni kelishishi kerak."], ["Ilova o‘rnatish kerakmi?", "Joriy pilotda qatnashish uchun loyiha Telegram-botidan foydalaning."], ["Platforma haydovchilarni tekshiryaptimi?", "Loyiha materiallarida bu funksiya ishlab chiqilmoqda deb ko‘rsatilgan. Koordinator tasdig‘isiz ishtirokchini tekshirilgan deb hisoblamang."]],
    finalTitle: "Maktabga borishni birgalikda yaxshiroq tashkil qilaylik.",
    finalText: "Pilot haqida bilib oling va loyiha Telegram-botida ro‘yxatdan o‘ting.",
    join: "Telegram’ga o‘tish",
    footerNote: "Toshkent oilalari uchun umumiy safarlar. Pilot loyiha.",
    rights: "Barcha huquqlar himoyalangan.",
    menuLabel: "Menyuni ochish",
    closeLabel: "Menyuni yopish",
    languageLabel: "Tilni tanlash",
  },
  en: {
    nav: ["How it works", "Safety", "The pilot"],
    signIn: "Open Telegram",
    eyebrow: "SCHOOL RUNS, SHARED",
    heroTitle: "School journeys are easier when families travel together.",
    heroText: "We connect families heading to the same school around the same time, so parents can coordinate a shared ride.",
    mainCta: "Find a shared ride",
    secondaryCta: "Open Telegram bot",
    note: "A pilot coordinator helps families confirm arrangements.",
    heroTag: "SchoolBus Tashkent pilot",
    problemLabel: "THE CONTEXT",
    problemTitle: "Mornings around school can work better",
    problemIntro: "Families often travel to the same school at around the same time—in separate cars.",
    problemCards: [["Separate trips", "Parents drive children to the same schools in separate cars."], ["Crowding at the gate", "Cars gather around school entrances at the same time."], ["Time lost", "Families spend mornings in traffic and looking for a place to stop."]],
    sourceNote: "The issue and pilot outcomes will be assessed through parent surveys and observations at participating schools.",
    howLabel: "HOW IT WORKS",
    howTitle: "From a family’s schedule to a coordinated ride",
    steps: [["Share your schedule", "Choose a school, pickup area, days, and a suitable time."], ["Find compatibility", "Compare school, schedule, area, and available seats."], ["Agree on a ride", "Parents review an offer, and a coordinator helps confirm the arrangement."]],
    solutionTag: "COORDINATED THROUGH TELEGRAM",
    solutionTitle: "Start with the bot—no unnecessary trips on unfamiliar routes",
    solutionText: "The existing Telegram bot is the entry point for pilot participants. This website provides clear information about the process and safety measures.",
    botLink: "Open @schoolbus_tashkent_bot",
    statusTitle: "Status from project materials",
    statusRows: [["Registration and language selection", "Working"], ["School, area, and schedule", "Working"], ["Finding compatible families", "In development"], ["Coordinator confirmation", "Working"], ["Ride reminders", "Planned"]],
    safetyLabel: "SAFETY & TRUST",
    safetyTitle: "Safety means concrete processes, not promises",
    safetyIntro: "No system can promise absolute safety. Participation, consent, and child handover rules need to be defined before the pilot expands.",
    safetyCards: [["Participant approval", "Adult and driver checks, along with parent consent, are measures still to be implemented."], ["Ride confirmation", "Participants and a coordinator should agree on the group and ride details."], ["If something goes wrong", "Incident reporting and cancellation rules need to be established before rides begin."]],
    pilotLabel: "THE PILOT",
    pilotTitle: "Measure first. Scale later.",
    pilotText: "Baseline data is collected before launch. Pilot outcomes are then compared with that baseline—without unsupported numbers or promises.",
    measures: ["Completed shared rides", "Active families", "Cancellations and on-time arrivals", "Individual trips avoided—based on confirmed data"],
    roadmap: [["01", "Baseline", "Parent survey and observations before launch."], ["02", "Small pilot", "Test the journey with 1–2 schools."], ["03", "Evaluation", "Compare outcomes with the baseline."], ["04", "Careful expansion", "Add schools only after assessing demand and reliability."]],
    faqLabel: "FAQ",
    faqTitle: "What to know before taking part",
    faqs: [["Are rides confirmed automatically?", "No. Compatibility is only a suggestion. Parents and a coordinator need to agree on a ride."], ["Do I need to install an app?", "For the current pilot, use the project’s Telegram bot @schoolbus_tashkent_bot."], ["Does the platform already check drivers?", "Project materials list this feature as in development. Do not assume a participant is checked unless a coordinator confirms it."]],
    finalTitle: "Let’s make school journeys more organized.",
    finalText: "Learn about the pilot and register through the project’s Telegram bot.",
    join: "Continue to Telegram",
    footerNote: "Shared school journeys for Tashkent families. A pilot project.",
    rights: "All rights reserved.",
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    languageLabel: "Choose language",
  },
} as const;

type Locale = keyof typeof copy;

const telegramUrl = "https://t.me/schoolbus_tashkent_bot";

export function meta() {
  return [
    { title: "SchoolBus Tashkent — совместные поездки в школу" },
    { name: "description", content: "Координация совместных школьных поездок для семей Ташкента." },
  ];
}

function SchoolBusIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[580px]" aria-label="Illustration of a school bus in Tashkent" role="img">
      <svg viewBox="0 0 580 440" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="290" y1="20" x2="290" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#253753"/><stop offset="1" stopColor="#E8A521"/></linearGradient>
          <linearGradient id="bus" x1="100" y1="260" x2="480" y2="375" gradientUnits="userSpaceOnUse"><stop stopColor="#FFC12E"/><stop offset="1" stopColor="#F5A900"/></linearGradient>
        </defs>
        <rect x="28" y="20" width="524" height="310" rx="34" fill="url(#sky)"/>
        <circle cx="435" cy="158" r="45" fill="#FFE6A6" opacity=".9"/>
        <path d="M28 235h92v-71h63v46h66v-99h62v88h77v-59h72v190H28V235Z" fill="#182338" opacity=".83"/>
        <path d="M250 237 276 78h28l30 159h-84Z" fill="#101A2D"/>
        <path d="M280 83V50" stroke="#101A2D" strokeWidth="5" strokeLinecap="round"/>
        <path d="M0 341h580" stroke="#738097" strokeWidth="8"/>
        <path d="M0 369h580v50H0z" fill="#101A2D"/>
        <path d="M42 395h70m62 0h70m62 0h70m62 0h70m62 0h34" stroke="#E7EAF0" strokeWidth="7" strokeLinecap="round"/>
        <rect x="88" y="248" width="404" height="106" rx="20" fill="url(#bus)"/>
        <path d="M108 269c0-6 5-11 11-11h65v50h-76v-39Zm88-11h67v50h-67v-50Zm90 0h67v50h-67v-50Zm90 0h90c6 0 11 5 11 11v39h-101v-50Z" fill="#DCE9F3"/>
        <path d="M87 333h408" stroke="#121E31" strokeWidth="7"/>
        <path d="M106 357h382" stroke="#FFCE51" strokeWidth="8"/>
        <circle cx="177" cy="360" r="31" fill="#111C30"/><circle cx="177" cy="360" r="14" fill="#AAB8CA"/>
        <circle cx="410" cy="360" r="31" fill="#111C30"/><circle cx="410" cy="360" r="14" fill="#AAB8CA"/>
        <circle cx="477" cy="323" r="8" fill="#FFF0CB"/>
        <rect x="65" y="315" width="22" height="14" rx="7" fill="#FF8C34"/>
        <path d="M174 116h49m160 54h35m-293 0h25" stroke="#FFD46B" strokeWidth="5" strokeLinecap="round" opacity=".8"/>
        <rect x="386" y="61" width="112" height="38" rx="19" fill="#101A2D" opacity=".9"/>
        <circle cx="406" cy="80" r="6" fill="#A8D8B7"/><path d="M420 80h61" stroke="#D6DFEA" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <div className="absolute -left-1 top-[16%] hidden rounded-2xl border border-white/15 bg-[#17243a]/90 px-4 py-3 text-sm text-white shadow-xl backdrop-blur sm:block">
        <div className="flex items-center gap-2 font-semibold"><IconMapPin size={16} className="text-[#ffb900]"/>Tashkent</div>
        <span className="mt-1 block text-xs text-slate-300">One school. Shared journeys.</span>
      </div>
    </div>
  );
}

export default function HomeRoute() {
  const { locale } = useSchoolBusLocale();
  const t = copy[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#101a2e]">
      <section className="relative overflow-hidden bg-[#101a2e] text-white">
        <div className="absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-[#ffb900]/[0.07] blur-3xl" />
        <div id="home" className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-4 lg:px-12 lg:pb-28 lg:pt-20">
          <div className="schoolbus-hero-enter relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ffb900]/25 bg-[#ffb900]/10 px-3.5 py-2 text-[11px] font-bold tracking-[.16em] text-[#ffd15c]"><span className="h-2 w-2 rounded-full bg-[#ffb900]"/>{t.eyebrow}</div>
            <h1 className="max-w-[720px] text-[clamp(2.7rem,6.1vw,5.4rem)] font-black leading-[.99] tracking-[-.055em]">{t.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{t.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/rides/find" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#ffb900] px-6 py-3.5 font-bold text-[#101a2e] shadow-lg shadow-[#ffb900]/10 transition hover:-translate-y-0.5 hover:bg-[#ffd15c]"><IconCar size={19}/>{t.mainCta}<IconArrowRight size={17}/></Link>
              <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/5"><IconBrandTelegram size={18}/>{t.secondaryCta}</a>
            </div>
            <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-400"><IconShieldCheck size={17} className="mt-0.5 shrink-0 text-[#a8d8b7]"/>{t.note}</p>
          </div>
          <div className="schoolbus-hero-enter relative mx-auto w-full max-w-[600px] lg:-mr-5" style={{ animationDelay: "100ms" }}><SchoolBusIllustration/><div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-300 sm:absolute sm:-bottom-1 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2"><span className="h-2 w-2 rounded-full bg-[#a8d8b7]"/>{t.heroTag}</div></div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"/>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-3xl"><p className="section-kicker">{t.problemLabel}</p><h2 className="section-title">{t.problemTitle}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{t.problemIntro}</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{t.problemCards.map(([title, body], index) => { const Icon = [IconCar, IconUsers, IconClock][index]; return <article key={title} className="rounded-[1.7rem] bg-[#f1f4f8] p-6 sm:p-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb900] text-[#101a2e]"><Icon size={23}/></div><h3 className="text-xl font-bold tracking-tight">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></article>; })}</div>
        <p className="mt-6 border-l-4 border-[#ffb900] pl-4 text-sm leading-6 text-slate-500">{t.sourceNote}</p>
      </section>

      <section id="how" className="bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <p className="section-kicker">{t.howLabel}</p><h2 className="section-title max-w-3xl">{t.howTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{t.steps.map(([title, body], index) => <article key={title} className="relative rounded-[1.7rem] border border-[#e2e7ee] bg-white p-6 sm:p-8"><div className="mb-7 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#101a2e] text-base font-bold text-[#ffbd24]">0{index + 1}</span>{index < 2 && <IconArrowRight className="hidden text-slate-300 md:block"/>}</div><h3 className="text-xl font-bold tracking-tight">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid gap-7 lg:grid-cols-[.95fr_1.05fr] lg:gap-12">
          <div className="rounded-[2rem] bg-[#101a2e] p-7 text-white sm:p-10"><p className="section-kicker !text-[#ffbd24]">{t.solutionTag}</p><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb900] text-[#101a2e]"><IconBrandTelegram size={25}/></div><h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{t.solutionTitle}</h2><p className="mt-5 leading-7 text-slate-300">{t.solutionText}</p><a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-[#ffbd24] transition hover:gap-3">{t.botLink}<IconArrowRight size={17}/></a></div>
          <div className="rounded-[2rem] border border-[#e6eaf0] p-6 sm:p-9"><div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3d3] text-[#a77400]"><IconRoute size={21}/></span><h3 className="text-xl font-bold">{t.statusTitle}</h3></div><div className="divide-y divide-slate-100">{t.statusRows.map(([title, status], index) => <div key={title} className="flex items-center justify-between gap-3 py-4"><span className="text-sm font-medium leading-5 text-slate-700 sm:text-base">{title}</span><span className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold sm:text-xs ${index === 0 || index === 1 || index === 3 ? "bg-[#e7f4ec] text-[#24734b]" : index === 2 ? "border border-[#e2ac31] bg-[#fff8e9] text-[#986700]" : "bg-slate-100 text-slate-600"}`}>{status}</span></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-500">{locale === "ru" ? "Статус указан по предоставленным материалам проекта; работа бота и интеграций на сайте не проверялась." : locale === "uz" ? "Holat loyiha taqdim etgan materiallarga asoslangan; bot va saytdagi integratsiyalar ishlashi tekshirilmagan." : "Status reflects supplied project materials; the bot and website integrations have not been tested here."}</p></div>
        </div>
      </section>

      <section id="safety" className="bg-[#101a2e] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"><p className="section-kicker !text-[#ffbd24]">{t.safetyLabel}</p><h2 className="section-title max-w-3xl !text-white">{t.safetyTitle}</h2><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{t.safetyIntro}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{t.safetyCards.map(([title, body], index) => { const Icon = [IconShieldCheck, IconHeartHandshake, IconBellRinging][index]; return <article key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-6 sm:p-7"><Icon size={25} className="mb-5 text-[#ffbd24]"/><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{body}</p></article>; })}</div>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#ffbd24]/20 bg-[#ffbd24]/[.08] p-4 text-sm leading-6 text-slate-200"><IconShieldCheck className="mt-0.5 shrink-0 text-[#ffbd24]" size={18}/><span>{locale === "ru" ? "Платформа не является экстренной службой и не гарантирует безопасность поездки. При непосредственной угрозе обратитесь в местные экстренные службы." : locale === "uz" ? "Platforma favqulodda xizmat emas va safar xavfsizligini kafolatlamaydi. Bevosita xavf bo‘lsa, mahalliy favqulodda xizmatlarga murojaat qiling." : "This platform is not an emergency service and cannot guarantee ride safety. Contact local emergency services if there is immediate danger."}</span></div>
        </div>
      </section>

      <section id="pilot" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid items-end gap-5 md:grid-cols-[1fr_.8fr]"><div><p className="section-kicker">{t.pilotLabel}</p><h2 className="section-title max-w-2xl">{t.pilotTitle}</h2></div><p className="max-w-xl leading-7 text-slate-600">{t.pilotText}</p></div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{t.measures.map((label, index) => <div key={label} className={`flex min-h-36 flex-col justify-between rounded-2xl p-5 ${index === 3 ? "bg-[#ffb900] text-[#101a2e]" : "bg-[#101a2e] text-white"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full ${index === 3 ? "bg-white/50" : "bg-white/10 text-[#ffbd24]"}`}>{index < 3 ? <IconCheck size={17}/> : <IconMapPin size={17}/>}</span><p className="font-semibold leading-6">{label}</p></div>)}</div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{t.roadmap.map(([number, title, body]) => <article key={number} className="border-t-2 border-[#ffb900] pt-5"><span className="text-xs font-extrabold tracking-[.15em] text-[#aa7800]">{number} / PILOT</span><h3 className="mt-3 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div>
      </section>

      <section className="bg-[#f5f7fa]"><div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24"><p className="section-kicker">{t.faqLabel}</p><h2 className="section-title">{t.faqTitle}</h2><div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{t.faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"><span>{question}</span><IconChevronDown size={18} className="shrink-0 text-slate-500 transition group-open:rotate-180"/></summary><p className="max-w-3xl pt-3 pr-8 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></div></section>

      <section className="bg-[#ffb900] text-[#101a2e]"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center lg:px-12"><div className="max-w-3xl"><span className="inline-flex rounded-full bg-[#101a2e] px-3 py-1.5 text-[10px] font-bold tracking-[.16em] text-[#ffbd24]">SCHOOLBUS TASHKENT</span><h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{t.finalTitle}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#25324a]">{t.finalText}</p></div><a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#101a2e] px-6 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d2d49]"><IconBrandTelegram size={19}/>{t.join}<IconArrowRight size={17}/></a></div></section>

    </main>
  );
}
