import { useSchoolBusLocale } from "@/components/schoolbus/site-shell";

const content = {
  ru: {
    privacy: {
      kicker: "ЧЕРНОВИК ДЛЯ ЮРИДИЧЕСКОЙ ПРОВЕРКИ",
      title: "Конфиденциальность",
      intro: "Эта предварительная информация не является юридическим заключением или заявлением о соответствии местному законодательству.",
      sections: [
        ["Какие данные использует сайт", "Для входа система обрабатывает адрес электронной почты через настроенный сервис аутентификации. При создании предложения или запроса приложение сохраняет адрес владельца записи, школу, приблизительный район, дату, время и число мест. Точные домашние адреса, имена детей и данные документов в этой версии не запрашиваются."],
        ["Кому доступны записи о поездках", "Семья видит собственные предложения и запросы. Поиск показывает только подтверждённые координатором открытые предложения и не раскрывает адрес электронной почты владельца. Назначенные координаторы могут видеть очередь предложений для проверки."],
        ["Telegram и внешняя обработка", "Ссылки Telegram ведут на внешний бот @schoolbus_tashkent_bot. Этот сайт не связывает аккаунт Telegram с учётной записью и не отправляет ему сообщения. Условия обработки данных в Telegram-боте следует уточнить у команды проекта."],
        ["Хранение, удаление и запросы", "Сроки хранения, порядок удаления аккаунта, отзыв согласия, контакты оператора и процесс обработки запросов субъектов данных ещё не настроены для этого сайта. Не используйте текущую версию для организации поездок детей до определения этих правил и юридической проверки."],
      ],
      notice: "Перед пилотом этот документ необходимо согласовать с оператором сервиса и проверить на соответствие требованиям Узбекистана.",
    },
    terms: {
      kicker: "ЧЕРНОВИК ДЛЯ ЮРИДИЧЕСКОЙ ПРОВЕРКИ",
      title: "Правила участия",
      intro: "Эта страница описывает ограничения текущего прототипа; она не заменяет договор, официальные правила перевозки или юридическую консультацию.",
      sections: [
        ["Совместимость не подтверждает поездку", "Совпадение по школе, району или расписанию — только возможность обсудить поездку. Запрос места остаётся ожидающим, пока водитель не примет его. Перед поездкой взрослые должны отдельно согласовать участников, время и место встречи."],
        ["Не передавайте лишние сведения", "Используйте только приблизительный район. Не вводите точные адреса, медицинские сведения или полные данные ребёнка. Не считайте участника, автомобиль или поездку проверенными только из-за наличия записи в приложении."],
        ["Проверка и ответственность", "Веб-сайт не выполняет проверку документов, водительских удостоверений или автомобилей и не отслеживает поездки. Координатор может рассматривать предложения, но такое рассмотрение само по себе не гарантирует безопасность."],
        ["Отмена и инциденты", "Сайт не предоставляет подтверждённый процесс реагирования на инциденты, экстренную помощь или уведомления участникам об изменениях. Согласуйте правила отмены и связь напрямую заранее; при непосредственной угрозе обращайтесь в местные экстренные службы."],
      ],
      notice: "Не используйте этот прототип для фактической перевозки детей до утверждения правил участия, процедур согласия и передачи ребёнка, проверки водителей и порядка реагирования.",
    },
  },
  uz: {
    privacy: {
      kicker: "YURIDIK TEKSHIRUV UCHUN QORALAMA",
      title: "Maxfiylik",
      intro: "Ushbu dastlabki ma’lumot yuridik maslahat yoki mahalliy qonunchilikka muvofiqlik bayonoti emas.",
      sections: [
        ["Sayt qanday ma’lumotlardan foydalanadi", "Kirish uchun tizim sozlangan autentifikatsiya xizmati orqali elektron pochta manzilini qayta ishlaydi. Taklif yoki so‘rov yaratilganda, ilova yozuv egasining elektron pochtasi, maktab, taxminiy hudud, sana, vaqt va joylar sonini saqlaydi. Bu versiya aniq uy manzillari, bolalar ismi yoki hujjat ma’lumotlarini so‘ramaydi."],
        ["Safar yozuvlarini kim ko‘radi", "Oila o‘z taklif va so‘rovlarini ko‘radi. Qidiruv faqat koordinator tasdiqlagan ochiq takliflarni ko‘rsatadi va egasining elektron pochtasini oshkor qilmaydi. Belgilangan koordinatorlar ko‘rib chiqish navbatini ko‘rishi mumkin."],
        ["Telegram va tashqi qayta ishlash", "Telegram havolalari tashqi @schoolbus_tashkent_bot botiga olib boradi. Ushbu sayt Telegram hisobini veb-hisobga bog‘lamaydi va botga xabar yubormaydi. Botdagi ma’lumotlarni qayta ishlash shartlarini loyiha jamoasidan aniqlashtiring."],
        ["Saqlash, o‘chirish va so‘rovlar", "Saqlash muddati, hisobni o‘chirish, rozilikni qaytarib olish, operator aloqasi va ma’lumot subyekti so‘rovlarini ko‘rib chiqish tartibi hali sozlanmagan. Qoidalar belgilanib, yuridik tekshiruvdan o‘tmaguncha bolalar safarlarini tashkil qilishda ushbu versiyadan foydalanmang."],
      ],
      notice: "Pilotdan oldin ushbu hujjat xizmat operatori bilan kelishilib, O‘zbekiston talablariga muvofiqligi tekshirilishi kerak.",
    },
    terms: {
      kicker: "YURIDIK TEKSHIRUV UCHUN QORALAMA",
      title: "Ishtirok qoidalari",
      intro: "Bu sahifada prototip cheklovlari bayon qilingan; u shartnoma, rasmiy tashish qoidalari yoki yuridik maslahat o‘rnini bosmaydi.",
      sections: [
        ["Moslik safarni tasdiqlamaydi", "Maktab, hudud yoki jadval bo‘yicha moslik faqat safarni muhokama qilish imkonidir. Haydovchi qabul qilmaguncha joy so‘rovi kutilayotgan bo‘lib qoladi. Safardan oldin kattalar ishtirokchilar, vaqt va uchrashuv joyini alohida kelishishi kerak."],
        ["Ortiqcha ma’lumot yubormang", "Faqat taxminiy hududdan foydalaning. Aniq manzil, tibbiy ma’lumot yoki bolaning to‘liq ma’lumotlarini kiritmang. Ilovada yozuv borligi ishtirokchi, avtomobil yoki safar tekshirilganini anglatmaydi."],
        ["Tekshiruv va javobgarlik", "Veb-sayt hujjatlar, haydovchilik guvohnomasi yoki avtomobillarni tekshirmaydi va safarni kuzatmaydi. Koordinator takliflarni ko‘rib chiqishi mumkin, ammo bu o‘z-o‘zidan xavfsizlikni kafolatlamaydi."],
        ["Bekor qilish va hodisalar", "Saytda tasdiqlangan hodisalarga javob, favqulodda yordam yoki o‘zgarishlar haqida ishtirokchilarni xabardor qilish jarayoni yo‘q. Bekor qilish va aloqa qoidalarini oldindan bevosita kelishing; bevosita xavf bo‘lsa mahalliy favqulodda xizmatlarga murojaat qiling."],
      ],
      notice: "Ishtirok qoidalari, rozilik va bolani topshirish tartibi, haydovchilarni tekshirish hamda hodisalarga javob berish tasdiqlanmaguncha bolalarni tashish uchun ushbu prototipdan foydalanmang.",
    },
  },
  en: {
    privacy: {
      kicker: "DRAFT FOR LEGAL REVIEW",
      title: "Privacy",
      intro: "This preliminary notice is not legal advice or a claim of compliance with local law.",
      sections: [
        ["Data used by this website", "Sign-in processes an email address through the configured authentication provider. When an offer or request is created, the app stores its owner email, school, approximate area, date, time, and seat count. This version does not ask for exact home addresses, children’s names, or document details."],
        ["Who can see ride records", "A family can see its own offers and requests. Search only shows coordinator-approved open offers and does not reveal the offer owner’s email address. Assigned coordinators can see offers awaiting review."],
        ["Telegram and external processing", "Telegram links open the external @schoolbus_tashkent_bot. This website does not link a Telegram account to a web account or send messages to the bot. Ask the project team how data is handled by the Telegram bot."],
        ["Retention, deletion, and requests", "Retention periods, account deletion, consent withdrawal, operator contact details, and data-subject request procedures are not configured for this site. Do not use this version to arrange children’s rides until these rules are established and legally reviewed."],
      ],
      notice: "Before a pilot, the service operator should approve this notice and have it reviewed against Uzbekistan’s requirements.",
    },
    terms: {
      kicker: "DRAFT FOR LEGAL REVIEW",
      title: "Participation rules",
      intro: "This page describes prototype limitations; it is not a contract, official transport policy, or legal advice.",
      sections: [
        ["Compatibility does not confirm a ride", "A school, area, or schedule match is only an opportunity to discuss a ride. A seat request remains pending until the driver accepts it. Adults must separately agree on the participants, time, and meeting point before travel."],
        ["Do not share unnecessary details", "Use an approximate area only. Do not enter exact addresses, medical details, or a child’s full details. A record in the app does not mean a participant, vehicle, or ride has been checked."],
        ["Checks and responsibility", "The website does not check identity documents, driving licences, or vehicles, and does not track rides. A coordinator may review an offer, but that review alone does not guarantee safety."],
        ["Cancellations and incidents", "The site does not provide a confirmed incident-response process, emergency assistance, or participant notifications for changes. Agree on cancellation and communication rules directly in advance; contact local emergency services in immediate danger."],
      ],
      notice: "Do not use this prototype to transport children until participation rules, consent and handover procedures, driver checks, and incident response are approved.",
    },
  },
} as const;

function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { locale } = useSchoolBusLocale();
  const t = content[locale][kind];
  return <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12"><p className="text-xs font-extrabold tracking-[.16em] text-[#986700]">{t.kicker}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-[#101a2e] sm:text-5xl">{t.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{t.intro}</p><div className="mt-10 space-y-7">{t.sections.map(([title, body]) => <section key={title} className="border-t border-slate-200 pt-5"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{body}</p></section>)}</div><p className="mt-10 rounded-2xl border-l-4 border-[#ffb900] bg-[#fff8e7] p-5 text-sm font-medium leading-7 text-[#5f4a1b]">{t.notice}</p></main>;
}

export function PrivacyPage() { return <LegalPage kind="privacy" />; }
export function TermsPage() { return <LegalPage kind="terms" />; }
