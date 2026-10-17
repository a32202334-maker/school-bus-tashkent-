import {
  IconArrowRight,
  IconClipboard,
  IconRoute,
  IconShieldCheck,
} from "@tabler/icons-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  useSchoolBusLocale,
  TelegramCTA,
} from "@/components/schoolbus/site-shell";

type Locale = "ru" | "uz" | "en";
type Copy = {
  kicker: string;
  title: string;
  intro: string;
};

const pageCopy = {
  ru: {
    how: {
      kicker: "ПУТЬ СЕМЬИ",
      title: "От расписания до согласованной поездки",
      intro:
        "В материалах проекта описан путь от данных семьи до совместной поездки. Совпадение — это предложение, а не автоматическое подтверждение.",
      current: "Уже работает по материалам проекта",
      planned: "В разработке или запланировано",
      steps: [
        [
          "Регистрация и язык",
          "Участник регистрируется в Telegram-боте и выбирает язык. Это указано как работающая функция.",
        ],
        [
          "Школа, район и расписание",
          "Семья указывает школу, район, дни и удобное время — эти данные отмечены как доступные в материалах проекта.",
        ],
        [
          "Поиск совместимости",
          "Сопоставление семей обозначено как функция в разработке. Наличие совпадения не подтверждает и не назначает поездку.",
        ],
        [
          "Согласование с координатором",
          "Родители рассматривают предложение, а координатор помогает согласовать поездку. Функция описана как работающая; детали конкретной поездки нужно подтвердить напрямую.",
        ],
        [
          "Напоминания",
          "Автоматические напоминания указаны как запланированные, а не как доступная сейчас функция.",
        ],
      ],
      noteTitle: "До поездки",
      note: "Не отправляйтесь в поездку, пока взрослые не согласовали участников, время, место встречи и порядок передачи ребёнка. Сайт не подтверждает бронирование.",
      ctaNote: "Существующий бот назван в материалах как точка входа в пилот.",
    },
    safety: {
      kicker: "БЕЗОПАСНОСТЬ И ОТВЕТСТВЕННОСТЬ",
      title: "Правила безопасности должны быть ясны до поездки",
      intro:
        "Мы не обещаем безусловную безопасность и не заявляем, что участники прошли проверку. Материалы проекта прямо отмечают, что ряд мер ещё предстоит внедрить.",
      sections: [
        [
          "Что пока не следует считать проверенным",
          "Проверка взрослых и водителей обозначена как мера, которую ещё предстоит внедрить. Не считайте профиль, совпадение или участие подтверждением проверки.",
        ],
        [
          "Согласие и договорённость",
          "До каждой поездки родители и координатор должны лично согласовать участников, маршрутные и временные детали, места встречи и передачу ребёнка. Совпадение семей само по себе ничего не подтверждает.",
        ],
        [
          "Отмена и непредвиденная ситуация",
          "Правила отмены и канал сообщений об инцидентах не подтверждены как действующие в предоставленных материалах. Обсудите план связи и отмены заранее; сайт не является экстренной службой.",
        ],
        [
          "Персональные данные",
          "Передавайте только сведения, необходимые для обсуждения поездки. Не публикуйте здесь адреса, данные ребёнка или другую чувствительную информацию: форма ниже не подключена к службе поддержки.",
        ],
      ],
      caution:
        "При непосредственной угрозе обратитесь в местные экстренные службы. SchoolBus Tashkent не заменяет экстренную помощь.",
    },
    about: {
      kicker: "О ПРОЕКТЕ",
      title: "Совместные школьные поездки — пилот для семей Ташкента",
      intro:
        "SchoolBus Tashkent описан в материалах как пилот, который помогает семьям с похожим школьным расписанием обсуждать совместные поездки.",
      purposeTitle: "Задача проекта",
      purpose:
        "Семьи, направляющиеся в одну школу примерно в одно время, могут координировать поездки вместо отдельных маршрутов. Это цель проекта, а не опубликованный результат или гарантия экономии времени.",
      approachTitle: "Как оценивается пилот",
      approach:
        "Материалы предлагают собрать исходные данные через опрос родителей и наблюдения у участвующих школ, провести небольшой пилот, а затем сравнить результаты с исходным уровнем. Подтверждённые результаты и числовые показатели здесь не заявляются.",
      statusTitle: "Границы текущего описания",
      status:
        "Регистрация, выбор языка, ввод школы, района и расписания, а также подтверждение координатором отмечены в материалах как работающие функции. Подбор совместимых семей указан как разрабатываемый, напоминания — как запланированные. Работа бота здесь отдельно не проверялась.",
      partnersTitle: "Участники и партнёры",
      partners:
        "На этой странице не перечислены школы, организации или партнёры: предоставленные материалы не дают подтверждённого списка. Условия участия в конкретной школе уточняйте через Telegram-бот проекта.",
    },
    contact: {
      kicker: "СВЯЗАТЬСЯ С ПРОЕКТОМ",
      title: "Подготовьте сообщение для Telegram",
      intro:
        "Заполните форму, чтобы проверить текст и подготовить его для отправки самостоятельно.",
      limitation:
        "Важно: сообщения с этого сайта не подключены к почтовому ящику или службе поддержки. Отправка формы ничего не отправляет команде.",
      name: "Имя (необязательно)",
      reply: "Как с вами связаться? (необязательно)",
      replyHint: "Не указывайте здесь чувствительные данные.",
      message: "Сообщение",
      messageHint:
        "Не включайте адрес ребёнка, телефон, медицинские или другие чувствительные сведения.",
      submit: "Подготовить сообщение",
      prepared:
        "Текст подготовлен только на этом устройстве. Скопируйте его и отправьте самостоятельно через Telegram. Сайт не отправил сообщение и не уведомил команду.",
      preparedLabel: "Подготовленный текст для копирования",
      copy: "Скопировать текст",
      copied:
        "Текст скопирован. Теперь откройте Telegram и отправьте его самостоятельно.",
      copyManual:
        "Автоматическое копирование недоступно. Выделите текст ниже и скопируйте его вручную.",
    },
    faq: {
      kicker: "ОТВЕТЫ НА ВОПРОСЫ",
      title: "Частые вопросы о пилоте",
      intro:
        "Коротко о том, что известно из материалов проекта, и о том, что нужно согласовать напрямую.",
      items: [
        [
          "Кто может участвовать?",
          "Пилот предназначен для семей, которым нужно добираться до одной школы примерно в одно время. Точный список школ и условия допуска не опубликованы здесь; уточните доступность через Telegram-бот проекта.",
        ],
        [
          "Как подбираются семьи?",
          "Участник может указать школу, район и расписание. Автоматический подбор совместимых семей указан как находящийся в разработке, поэтому не предполагайте, что совпадение уже найдено или проверено.",
        ],
        [
          "Запрос на поездку подтверждается автоматически?",
          "Нет. Совпадение — только возможное предложение. Родители и координатор должны согласовать детали напрямую до поездки.",
        ],
        [
          "Можно ли отменить поездку?",
          "Правила отмены не подтверждены как работающая функция в материалах проекта. До согласия на поездку обсудите с участниками, как сообщать об изменении планов и кто подтверждает отмену.",
        ],
        [
          "Как обрабатываются мои данные?",
          "Эта информационная страница не отправляет и не сохраняет данные формы на сервере. Не вводите в форму чувствительные сведения. Порядок обработки данных в Telegram-боте уточняйте в самом проекте; здесь он не подтверждается.",
        ],
        [
          "Участники и водители проверены?",
          "Не следует считать это подтверждённым. Проверка взрослых и водителей обозначена в материалах как мера, которую предстоит внедрить. Попросите координатора разъяснить действующий порядок до поездки.",
        ],
      ],
      cta: "Остались вопросы? Откройте Telegram-бот",
    },
  },
  uz: {
    how: {
      kicker: "OILA UCHUN JARAYON",
      title: "Jadvaldan kelishilgan safargacha",
      intro:
        "Loyiha materiallarida oila ma’lumotlaridan umumiy safargacha bo‘lgan jarayon tasvirlangan. Moslik — taklif, avtomatik tasdiq emas.",
      current: "Loyiha materiallariga ko‘ra ishlaydi",
      planned: "Ishlab chiqilmoqda yoki rejalashtirilgan",
      steps: [
        [
          "Ro‘yxatdan o‘tish va til",
          "Ishtirokchi Telegram-botda ro‘yxatdan o‘tadi va tilni tanlaydi. Bu ishlayotgan funksiya sifatida ko‘rsatilgan.",
        ],
        [
          "Maktab, hudud va jadval",
          "Oila maktab, hudud, kunlar va qulay vaqtni kiritadi — loyiha materiallarida bu ma’lumotlar mavjud deb ko‘rsatilgan.",
        ],
        [
          "Moslikni izlash",
          "Oilalarni o‘zaro moslashtirish ishlab chiqilayotgan funksiya sifatida qayd etilgan. Moslik safarni tasdiqlamaydi yoki belgilamaydi.",
        ],
        [
          "Koordinator bilan kelishish",
          "Ota-onalar taklifni ko‘rib chiqadi, koordinator esa safarni kelishishga yordam beradi. Bu ishlayotgan funksiya sifatida tasvirlangan; muayyan safar tafsilotlarini bevosita tasdiqlash kerak.",
        ],
        [
          "Eslatmalar",
          "Avtomatik eslatmalar hozir mavjud funksiya emas, reja sifatida ko‘rsatilgan.",
        ],
      ],
      noteTitle: "Safardan oldin",
      note: "Kattalar ishtirokchilar, vaqt, uchrashuv joyi va bolani topshirish tartibini kelishmaguncha yo‘lga chiqmang. Sayt bandlovni tasdiqlamaydi.",
      ctaNote:
        "Loyiha materiallarida mavjud bot pilotning boshlang‘ich nuqtasi sifatida ko‘rsatilgan.",
    },
    safety: {
      kicker: "XAVFSIZLIK VA MAS’ULIYAT",
      title: "Safardan oldin xavfsizlik qoidalari aniq bo‘lishi kerak",
      intro:
        "Biz mutlaq xavfsizlikni va’da qilmaymiz va ishtirokchilar tekshiruvdan o‘tgan deb aytmaymiz. Loyiha materiallarida ayrim choralar hali joriy etilishi kerakligi ochiq ko‘rsatilgan.",
      sections: [
        [
          "Hozircha tekshirilgan deb hisoblamang",
          "Kattalar va haydovchilarni tekshirish hali joriy etilishi kerak bo‘lgan chora sifatida qayd etilgan. Profil, moslik yoki ishtirokni tekshiruv tasdig‘i deb qabul qilmang.",
        ],
        [
          "Rozilik va kelishuv",
          "Har bir safardan oldin ota-onalar va koordinator ishtirokchilar, yo‘nalish va vaqt tafsilotlari, uchrashuv joyi hamda bolani topshirishni shaxsan kelishishi kerak. Oilalar mosligi o‘z-o‘zidan hech narsani tasdiqlamaydi.",
        ],
        [
          "Bekor qilish va kutilmagan holat",
          "Bekor qilish qoidalari va hodisalar haqida xabar berish kanali taqdim etilgan materiallarda amalda deb tasdiqlanmagan. Aloqa va bekor qilish rejasini oldindan muhokama qiling; sayt favqulodda xizmat emas.",
        ],
        [
          "Shaxsiy ma’lumotlar",
          "Safarni muhokama qilish uchun zarur bo‘lgan ma’lumotlargina ulashing. Bu yerda manzil, bola ma’lumotlari yoki boshqa nozik ma’lumotlarni yubormang: quyidagi forma qo‘llab-quvvatlash xizmatiga ulanmagan.",
        ],
      ],
      caution:
        "Bevosita xavf bo‘lsa, mahalliy favqulodda xizmatlarga murojaat qiling. SchoolBus Tashkent favqulodda yordam o‘rnini bosmaydi.",
    },
    about: {
      kicker: "LOYIHA HAQIDA",
      title: "Umumiy maktab safarlari — Toshkent oilalari uchun pilot",
      intro:
        "SchoolBus Tashkent materiallarda o‘xshash maktab jadvaliga ega oilalarga umumiy safarlarni muhokama qilishda yordam beruvchi pilot sifatida ta’riflangan.",
      purposeTitle: "Loyiha vazifasi",
      purpose:
        "Taxminan bir vaqtda bir maktabga boradigan oilalar alohida yo‘nalishlar o‘rniga safarlarni muvofiqlashtirishi mumkin. Bu loyiha maqsadi, e’lon qilingan natija yoki vaqt tejalishi kafolati emas.",
      approachTitle: "Pilot qanday baholanadi",
      approach:
        "Materiallarda ota-onalar so‘rovi va ishtirokchi maktablar atrofidagi kuzatuvlar orqali dastlabki ma’lumot to‘plash, kichik pilot o‘tkazish va natijalarni boshlang‘ich daraja bilan solishtirish taklif etilgan. Tasdiqlangan natijalar va raqamli ko‘rsatkichlar bu yerda da’vo qilinmaydi.",
      statusTitle: "Joriy tavsif chegaralari",
      status:
        "Ro‘yxatdan o‘tish, til tanlash, maktab, hudud va jadvalni kiritish hamda koordinator tasdig‘i materiallarda ishlayotgan funksiyalar deb ko‘rsatilgan. Mos oilalarni topish ishlab chiqilmoqda, eslatmalar rejalashtirilgan. Bot bu yerda alohida tekshirilmagan.",
      partnersTitle: "Ishtirokchilar va hamkorlar",
      partners:
        "Bu sahifada maktablar, tashkilotlar yoki hamkorlar ro‘yxati berilmaydi: taqdim etilgan materiallarda tasdiqlangan ro‘yxat yo‘q. Muayyan maktabdagi ishtirok shartlarini loyiha Telegram-boti orqali aniqlashtiring.",
    },
    contact: {
      kicker: "LOYIHA BILAN BOG‘LANISH",
      title: "Telegram uchun xabar tayyorlang",
      intro:
        "Matnni tekshirish va o‘zingiz yuborishga tayyorlash uchun formani to‘ldiring.",
      limitation:
        "Muhim: ushbu saytdagi xabarlar pochta qutisi yoki qo‘llab-quvvatlash xizmatiga ulanmagan. Formani yuborish jamoaga hech narsa jo‘natmaydi.",
      name: "Ism (ixtiyoriy)",
      reply: "Siz bilan qanday bog‘lanish mumkin? (ixtiyoriy)",
      replyHint: "Bu yerda nozik ma’lumotlarni kiritmang.",
      message: "Xabar",
      messageHint:
        "Bolaning manzili, telefon, tibbiy yoki boshqa nozik ma’lumotlarni kiritmang.",
      submit: "Xabarni tayyorlash",
      prepared:
        "Matn faqat shu qurilmada tayyorlandi. Uni nusxalab, Telegram orqali o‘zingiz yuboring. Sayt xabarni yubormadi va jamoaga bildirmadi.",
      preparedLabel: "Nusxalash uchun tayyorlangan matn",
      copy: "Matnni nusxalash",
      copied: "Matn nusxalandi. Endi Telegram’ni ochib, uni o‘zingiz yuboring.",
      copyManual:
        "Avtomatik nusxalash ishlamadi. Quyidagi matnni belgilang va qo‘lda nusxalang.",
    },
    faq: {
      kicker: "SAVOLLARGA JAVOBLAR",
      title: "Pilot haqida ko‘p so‘raladigan savollar",
      intro:
        "Loyiha materiallarida ma’lum bo‘lgan narsalar va bevosita kelishish kerak bo‘lgan masalalar.",
      items: [
        [
          "Kim ishtirok etishi mumkin?",
          "Pilot taxminan bir vaqtda bir maktabga borishi kerak bo‘lgan oilalar uchun. Maktablarning aniq ro‘yxati va qabul shartlari bu yerda e’lon qilinmagan; loyiha Telegram-botida mavjudligini aniqlashtiring.",
        ],
        [
          "Oilalar qanday moslashtiriladi?",
          "Ishtirokchi maktab, hudud va jadvalni kiritishi mumkin. Mos oilalarni avtomatik topish ishlab chiqilmoqda, shuning uchun moslik allaqachon topilgan yoki tekshirilgan deb o‘ylamang.",
        ],
        [
          "Safar so‘rovi avtomatik tasdiqlanadimi?",
          "Yo‘q. Moslik faqat ehtimoliy taklif. Safardan oldin ota-onalar va koordinator tafsilotlarni bevosita kelishishi kerak.",
        ],
        [
          "Safarni bekor qilish mumkinmi?",
          "Loyiha materiallarida bekor qilish qoidalari ishlayotgan funksiya sifatida tasdiqlanmagan. Safarga rozi bo‘lishdan oldin reja o‘zgarsa qanday xabar berish va bekor qilishni kim tasdiqlashini kelishing.",
        ],
        [
          "Ma’lumotlarim qanday qayta ishlanadi?",
          "Ushbu axborot sahifasi forma ma’lumotlarini serverga yubormaydi yoki saqlamaydi. Formaga nozik ma’lumotlarni kiritmang. Telegram-botdagi ma’lumotlar tartibini loyihaning o‘zidan aniqlashtiring; bu yerda u tasdiqlanmaydi.",
        ],
        [
          "Ishtirokchilar va haydovchilar tekshirilganmi?",
          "Buni tasdiqlangan deb hisoblamang. Kattalar va haydovchilarni tekshirish loyiha materiallarida joriy etilishi kerak bo‘lgan chora deb ko‘rsatilgan. Safardan oldin koordinatordan amaldagi tartibni tushuntirishni so‘rang.",
        ],
      ],
      cta: "Savolingiz bormi? Telegram-botni oching",
    },
  },
  en: {
    how: {
      kicker: "THE FAMILY JOURNEY",
      title: "From a schedule to an agreed ride",
      intro:
        "Project materials describe a path from family details to a shared ride. A match is a suggestion, not an automatic confirmation.",
      current: "Reported as working in project materials",
      planned: "In development or planned",
      steps: [
        [
          "Registration and language",
          "A participant registers through the Telegram bot and chooses a language. Project materials list this as working.",
        ],
        [
          "School, area, and schedule",
          "A family enters a school, area, days, and suitable time—these details are listed as available in project materials.",
        ],
        [
          "Finding compatibility",
          "Matching families is listed as in development. A possible match does not confirm or schedule a ride.",
        ],
        [
          "Agreeing with a coordinator",
          "Parents review a suggestion, and a coordinator helps agree on a ride. This is described as working; confirm the details of each specific ride directly.",
        ],
        [
          "Reminders",
          "Automatic ride reminders are listed as planned, not as a feature currently available.",
        ],
      ],
      noteTitle: "Before a ride",
      note: "Do not travel until adults have agreed on participants, time, meeting place, and child handover arrangements. This website does not confirm bookings.",
      ctaNote:
        "Project materials identify the existing bot as the pilot entry point.",
    },
    safety: {
      kicker: "SAFETY AND RESPONSIBILITY",
      title: "Safety arrangements should be clear before a ride",
      intro:
        "We do not promise absolute safety or claim that participants have been checked. Project materials explicitly say some measures still need to be implemented.",
      sections: [
        [
          "What not to assume is checked",
          "Checks for adults and drivers are listed as a measure still to be implemented. Do not treat a profile, a match, or participation as proof of a check.",
        ],
        [
          "Consent and agreement",
          "Before each ride, parents and the coordinator should personally agree on participants, route and timing details, meeting points, and child handover. A family match alone confirms none of these.",
        ],
        [
          "Cancellation and unexpected situations",
          "Cancellation rules and an incident-reporting channel are not confirmed as active in the supplied materials. Discuss a contact and cancellation plan beforehand; this website is not an emergency service.",
        ],
        [
          "Personal information",
          "Share only details needed to discuss a ride. Do not submit addresses, child details, or other sensitive information here: the form below is not connected to a support inbox.",
        ],
      ],
      caution:
        "If there is immediate danger, contact local emergency services. SchoolBus Tashkent is not a substitute for emergency help.",
    },
    about: {
      kicker: "ABOUT THE PROJECT",
      title: "Shared school journeys—a pilot for Tashkent families",
      intro:
        "SchoolBus Tashkent is described in project materials as a pilot helping families with similar school schedules discuss shared rides.",
      purposeTitle: "The project’s aim",
      purpose:
        "Families travelling to the same school at around the same time may coordinate journeys rather than make separate trips. This is the project’s aim, not a published result or a promise of time saved.",
      approachTitle: "How the pilot is intended to be evaluated",
      approach:
        "The materials propose gathering baseline information through parent surveys and observations at participating schools, running a small pilot, and then comparing outcomes with the baseline. No verified outcomes or numerical results are claimed here.",
      statusTitle: "Limits of the current description",
      status:
        "Registration, language selection, entering a school, area, and schedule, and coordinator confirmation are listed as working in project materials. Family matching is in development; reminders are planned. The bot’s operation has not been independently tested here.",
      partnersTitle: "Participants and partners",
      partners:
        "No schools, organizations, or partners are listed on this page: the supplied materials do not provide a confirmed list. Ask through the project Telegram bot about availability at a particular school.",
    },
    contact: {
      kicker: "CONTACT THE PROJECT",
      title: "Prepare a message for Telegram",
      intro:
        "Use this form to review your text and prepare it to send yourself.",
      limitation:
        "Important: website messages are not connected to an email address or support inbox. Submitting this form does not send anything to the team.",
      name: "Name (optional)",
      reply: "How can we reach you? (optional)",
      replyHint: "Do not enter sensitive information here.",
      message: "Message",
      messageHint:
        "Do not include a child’s address, phone number, medical information, or other sensitive details.",
      submit: "Prepare message",
      prepared:
        "The text has only been prepared on this device. Copy it and send it yourself through Telegram. The website did not send the message or notify the team.",
      preparedLabel: "Prepared text to copy",
      copy: "Copy text",
      copied: "Text copied. Now open Telegram and send it yourself.",
      copyManual:
        "Automatic copying is unavailable. Select the text below and copy it manually.",
    },
    faq: {
      kicker: "ANSWERS TO COMMON QUESTIONS",
      title: "Frequently asked questions about the pilot",
      intro: "What project materials say—and what needs to be agreed directly.",
      items: [
        [
          "Who is eligible to participate?",
          "The pilot is intended for families travelling to the same school at around the same time. The exact school list and eligibility rules are not published here; ask about availability through the project Telegram bot.",
        ],
        [
          "How are families matched?",
          "A participant can enter a school, area, and schedule. Automatic family matching is listed as in development, so do not assume a match has already been found or checked.",
        ],
        [
          "Is a ride request confirmed automatically?",
          "No. A match is only a possible suggestion. Parents and a coordinator need to agree on the details directly before a ride.",
        ],
        [
          "Can I cancel a ride?",
          "Cancellation rules are not confirmed as a working feature in project materials. Before agreeing to a ride, discuss how to communicate a change of plans and who confirms a cancellation.",
        ],
        [
          "How is my information handled?",
          "This informational page does not send or store form data on a server. Do not enter sensitive information in the form. Ask the project directly about how information is handled in the Telegram bot; that is not confirmed here.",
        ],
        [
          "Are participants and drivers checked?",
          "Do not assume so. Project materials list checks for adults and drivers as a measure still to be implemented. Ask the coordinator to explain the current process before a ride.",
        ],
      ],
      cta: "Still have questions? Open the Telegram bot",
    },
  },
} as const;

const pageStyles = `
  .sb-public-page { color: #101a2e; }
  .sb-public-page .sb-kicker { color: #986700; font-size: .7rem; font-weight: 800; letter-spacing: .16em; }
  .sb-public-page .sb-title { max-width: 54rem; margin-top: .8rem; font-size: clamp(2.25rem, 5vw, 4.5rem); font-weight: 850; letter-spacing: -.05em; line-height: 1.02; }
  .sb-public-page .sb-intro { max-width: 48rem; margin-top: 1.25rem; color: #526078; font-size: clamp(1.05rem, 1.8vw, 1.2rem); line-height: 1.8; }
  .sb-public-page .sb-reveal { opacity: 0; transform: translateY(12px); transition: opacity 420ms ease, transform 420ms ease; }
  .sb-public-page .sb-reveal.is-visible { opacity: 1; transform: translateY(0); }
  .sb-public-page .sb-reveal-pending { opacity: 0; }
  .sb-public-page details > summary::-webkit-details-marker { display: none; }
  .sb-public-page details > summary::marker { content: ""; }
  .sb-public-page details[open] .sb-faq-answer { animation: sb-faq-open 180ms ease-out; }
  @keyframes sb-faq-open { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .sb-public-page .sb-reveal, .sb-public-page details[open] .sb-faq-answer { transition: none; animation: none; transform: none; }
    .sb-public-page .sb-reveal-pending { opacity: 1; }
  }
`;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    elements.forEach((element) =>
      element.classList.add("sb-reveal", "sb-reveal-pending"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("sb-reveal-pending");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function PublicPage({ children }: { children: ReactNode }) {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef} className="sb-public-page min-h-screen bg-white">
      <style>{pageStyles}</style>
      {children}
    </div>
  );
}

function PageIntro({ copy }: { copy: Copy }) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pb-14 sm:pt-20 lg:px-12 lg:pt-24">
      <p className="sb-kicker">{copy.kicker}</p>
      <h1 className="sb-title">{copy.title}</h1>
      <p className="sb-intro">{copy.intro}</p>
    </header>
  );
}

function TelegramLink({ note }: { note?: string }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <TelegramCTA />
      {note && (
        <p className="max-w-lg text-sm leading-6 text-slate-500">{note}</p>
      )}
    </div>
  );
}

function StatusPill({
  planned,
  children,
}: {
  planned: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold leading-5 ${planned ? "border border-[#dfb240] bg-[#fff8e7] text-[#815800]" : "bg-[#e7f4ec] text-[#24734b]"}`}
    >
      {children}
    </span>
  );
}

export function SchoolBusHowItWorksPage() {
  const locale: Locale = useSchoolBusLocale().locale;
  const t = pageCopy[locale].how;
  return (
    <PublicPage>
      <PageIntro copy={t} />
      <section className="bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="mb-8 flex flex-wrap gap-3 text-sm">
            <StatusPill planned={false}>{t.current}</StatusPill>
            <StatusPill planned>{t.planned}</StatusPill>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.steps.map(([title, body], index) => {
              const planned = index === 2 || index === 4;
              return (
                <li
                  key={title}
                  data-reveal
                  className="rounded-[1.6rem] border border-[#e3e8ef] bg-white p-6 sm:p-8"
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#101a2e] text-sm font-extrabold text-[#ffbd24]">
                      0{index + 1}
                    </span>
                    <StatusPill planned={planned}>
                      {planned ? t.planned : t.current}
                    </StatusPill>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {body}
                  </p>
                </li>
              );
            })}
          </ol>
          <aside
            data-reveal
            className="mt-7 flex items-start gap-4 rounded-2xl border-l-4 border-[#ffb900] bg-white p-5 sm:p-7"
          >
            <IconRoute
              className="mt-1 shrink-0 text-[#986700]"
              size={23}
              aria-hidden="true"
            />
            <div>
              <h2 className="font-bold">{t.noteTitle}</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                {t.note}
              </p>
            </div>
          </aside>
          <div className="mt-9" data-reveal>
            <TelegramLink note={t.ctaNote} />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

export function SchoolBusSafetyPage() {
  const locale: Locale = useSchoolBusLocale().locale;
  const t = pageCopy[locale].safety;
  return (
    <PublicPage>
      <PageIntro copy={t} />
      <section className="bg-[#101a2e] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {t.sections.map(([title, body], index) => (
              <article
                key={title}
                data-reveal
                className="rounded-[1.6rem] border border-white/10 bg-white/[.055] p-6 sm:p-8"
              >
                <IconShieldCheck
                  className="mb-5 text-[#ffbd24]"
                  size={25}
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
                {index === 0 && (
                  <div className="mt-4">
                    <StatusPill planned>
                      {locale === "ru"
                        ? "Не подтверждено как действующее"
                        : locale === "uz"
                          ? "Amalda ekani tasdiqlanmagan"
                          : "Not confirmed as active"}
                    </StatusPill>
                  </div>
                )}
              </article>
            ))}
          </div>
          <p
            data-reveal
            className="mt-6 rounded-2xl border border-[#ffbd24]/25 bg-[#ffbd24]/10 p-5 text-sm leading-7 text-slate-200"
          >
            {t.caution}
          </p>
          <div className="mt-8" data-reveal>
            <TelegramLink />
          </div>
        </div>
      </section>
    </PublicPage>
  );
}

export function SchoolBusAboutPage() {
  const locale: Locale = useSchoolBusLocale().locale;
  const t = pageCopy[locale].about;
  const blocks = [
    [t.purposeTitle, t.purpose],
    [t.approachTitle, t.approach],
    [t.statusTitle, t.status],
    [t.partnersTitle, t.partners],
  ];
  return (
    <PublicPage>
      <PageIntro copy={t} />
      <section className="border-y border-slate-100 bg-[#f5f7fa]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2 lg:px-12 lg:py-20">
          {blocks.map(([title, body], index) => (
            <article
              key={title}
              data-reveal
              className={`rounded-[1.6rem] p-6 sm:p-8 ${index === 2 ? "bg-[#101a2e] text-white" : "border border-[#e3e8ef] bg-white"}`}
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${index === 2 ? "bg-[#ffb900] text-[#101a2e]" : "bg-[#fff3d3] text-[#986700]"}`}
              >
                <IconRoute size={22} aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">{title}</h2>
              <p
                className={`mt-3 text-sm leading-7 ${index === 2 ? "text-slate-300" : "text-slate-600"}`}
              >
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>
      <div
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12"
        data-reveal
      >
        <TelegramLink />
      </div>
    </PublicPage>
  );
}

export function SchoolBusContactPage() {
  const locale: Locale = useSchoolBusLocale().locale;
  const t = pageCopy[locale].contact;
  const [prepared, setPrepared] = useState("");
  const [copyNotice, setCopyNotice] = useState("");

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const messageInput = form.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    const trimmedMessage = messageInput.value.trim();
    const tooShortMessage =
      locale === "ru"
        ? "Введите сообщение длиной не менее 3 символов."
        : locale === "uz"
          ? "Kamida 3 ta belgidan iborat xabar kiriting."
          : "Enter a message with at least 3 non-space characters.";
    messageInput.setCustomValidity(
      trimmedMessage.length < 3 ? tooShortMessage : "",
    );
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const lines = [
      `SchoolBus Tashkent — ${locale.toUpperCase()}`,
      values.get("name")
        ? `${t.name}: ${String(values.get("name")).trim()}`
        : "",
      values.get("reply")
        ? `${t.reply}: ${String(values.get("reply")).trim()}`
        : "",
      `${t.message}:`,
      String(values.get("message") ?? "").trim(),
    ].filter(Boolean);
    setPrepared(lines.join("\n"));
    setCopyNotice("");
  }

  async function copyMessage() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(prepared);
      setCopyNotice(t.copied);
    } catch {
      setCopyNotice(t.copyManual);
    }
  }

  return (
    <PublicPage>
      <PageIntro copy={t} />
      <section className="bg-[#f5f7fa]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:py-20">
          <div data-reveal>
            <form
              onSubmit={prepareMessage}
              className="rounded-[1.7rem] border border-[#e2e7ee] bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="mb-6 rounded-xl border-l-4 border-[#ffb900] bg-[#fff9e9] p-4 text-sm leading-6 text-[#5f4a1b]">
                {t.limitation}
              </p>
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="schoolbus-contact-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.name}
                  </label>
                  <input
                    id="schoolbus-contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[#ffb900]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="schoolbus-contact-reply"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.reply}
                  </label>
                  <input
                    id="schoolbus-contact-reply"
                    name="reply"
                    type="text"
                    maxLength={160}
                    aria-describedby="schoolbus-contact-reply-hint"
                    className="min-h-12 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-[#ffb900]"
                  />
                  <p
                    id="schoolbus-contact-reply-hint"
                    className="mt-2 text-xs leading-5 text-slate-500"
                  >
                    {t.replyHint}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="schoolbus-contact-message"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.message}{" "}
                    <span aria-hidden="true" className="text-[#986700]">
                      *
                    </span>
                  </label>
                  <textarea
                    id="schoolbus-contact-message"
                    name="message"
                    required
                    minLength={3}
                    maxLength={2000}
                    rows={6}
                    onChange={(event) =>
                      event.currentTarget.setCustomValidity("")
                    }
                    aria-describedby="schoolbus-contact-message-hint"
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-base leading-6 outline-none focus-visible:ring-2 focus-visible:ring-[#ffb900]"
                  />
                  <p
                    id="schoolbus-contact-message-hint"
                    className="mt-2 text-xs leading-5 text-slate-500"
                  >
                    {t.messageHint}
                  </p>
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[#101a2e] px-6 py-3 font-bold text-white transition hover:bg-[#1d2d49] focus-visible:outline-offset-4"
                >
                  {t.submit}
                  <IconArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
          <aside
            data-reveal
            className="rounded-[1.7rem] bg-[#101a2e] p-6 text-white sm:p-8"
          >
            <h2 className="text-2xl font-extrabold tracking-tight">
              {locale === "ru"
                ? "Что произойдёт"
                : locale === "uz"
                  ? "Keyingi qadam"
                  : "What happens next"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {locale === "ru"
                ? "Проверьте текст, скопируйте его и самостоятельно откройте бот. Никакое сообщение не отправляется этим сайтом."
                : locale === "uz"
                  ? "Matnni tekshiring, nusxalang va botni o‘zingiz oching. Ushbu sayt hech qanday xabar yubormaydi."
                  : "Review the text, copy it, and open the bot yourself. This website does not send any message."}
            </p>
            {prepared && (
              <div className="mt-6" aria-live="polite" aria-atomic="true">
                <p className="rounded-xl border border-[#ffbd24]/30 bg-[#ffbd24]/10 p-4 text-sm leading-6 text-[#fff0c6]">
                  {t.prepared}
                </p>
                <label
                  htmlFor="schoolbus-prepared-message"
                  className="mb-2 mt-5 block text-sm font-semibold"
                >
                  {t.preparedLabel}
                </label>
                <textarea
                  id="schoolbus-prepared-message"
                  readOnly
                  value={prepared}
                  rows={7}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm leading-6 text-white"
                />
                <button
                  type="button"
                  onClick={copyMessage}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <IconClipboard size={17} aria-hidden="true" />
                  {t.copy}
                </button>
                {copyNotice && (
                  <p
                    role="status"
                    className="mt-3 text-sm leading-6 text-slate-200"
                  >
                    {copyNotice}
                  </p>
                )}
              </div>
            )}
            <div className="mt-7">
              <TelegramCTA />
            </div>
          </aside>
        </div>
      </section>
    </PublicPage>
  );
}

export function SchoolBusFaqPage() {
  const locale: Locale = useSchoolBusLocale().locale;
  const t = pageCopy[locale].faq;
  return (
    <PublicPage>
      <PageIntro copy={t} />
      <section className="bg-[#f5f7fa]">
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16 lg:py-20">
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {t.items.map(([question, answer]) => (
              <details key={question} data-reveal className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-md text-left font-bold leading-7 text-[#101a2e] focus-visible:outline-offset-4">
                  <span>{question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg font-medium text-[#986700] transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="sb-faq-answer max-w-3xl pt-3 pr-8 text-sm leading-7 text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
          <div
            data-reveal
            className="mt-9 rounded-[1.6rem] bg-[#101a2e] p-6 text-white sm:p-8"
          >
            <p className="text-lg font-bold">{t.cta}</p>
            <div className="mt-5">
              <TelegramCTA />
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
