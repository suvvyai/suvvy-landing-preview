// ─────────────────────────────────────────────────
// Capabilities — «Возможности платформы» (тематические вкладки)
// 5 табов в стиле блока «Подключение каналов» (.crm__tabs / .crm__tab).
// Под табами — широкая градиентная панель (высота контента 540px),
// внутри: заголовок, бренд-чипы, чек-строки и тематический мок.
// ─────────────────────────────────────────────────

// ——— Мелкие переиспользуемые куски ———

function CapCheck({ children }) {
  return (
    <span className="cap-check">
      <svg viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9.25" stroke="#3A3DD4" strokeWidth="1.5" />
        <path d="M7 11.2l2.6 2.6L15 8.4" stroke="#3A3DD4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </span>);

}

function CapBrand({ logo, name }) {
  return (
    <span className="cap-brand">
      <img src={logo} alt="" aria-hidden="true" width="26" height="26" />
      <span>{name}</span>
    </span>);

}

// Маленькая метка Cавви в углу карточки сделки
function DealMark() {
  return (
    <span className="deal__mark" aria-hidden="true">
      <window.SuvvyMark size={16} color="#B6C0CC" />
    </span>);

}

function DealCard({ name, org, deal, sum, faded, moving }) {
  return (
    <div className={`deal ${faded ? "deal--faded" : ""} ${moving ? "deal--moving" : ""}`}>
      <DealMark />
      <div className="deal__title">
        <strong>{name},</strong> <span>{org}</span>
      </div>
      <div className="deal__id">Сделка #{deal}</div>
      <div className="deal__sum">{sum} руб.</div>
    </div>);

}

// ——— Контент каждого таба ———

function PaneCRM() {
  const { useState, useEffect } = React;

  // Колонки воронки
  const COLS = [
  { label: "Первичный контакт", bar: "#3739CF" },
  { label: "Переговоры", bar: "#EE0EA8" },
  { label: "Принимают решение", bar: "#E47711" },
  { label: "Успешно реализовано", bar: "#0CCA1F" }];


  // Статичные сделки-контекст в колонках
  const FIXED = {
    1: { name: "Николай", org: "ИП Мурашкин", deal: "38209113", sum: "190 000" },
    2: { name: "Максим", org: "ИП Васильев", deal: "38209108", sum: "80 000" },
    3: { name: "Сергей", org: "ФЛ", deal: "38209113", sum: "190 000" } };


  // Сделка, которую бот двигает по воронке
  const MOVER = { name: "Алексей", org: "Cавви", deal: "38209297", sum: "35 000" };

  const [stage, setStage] = useState(0); // в какой колонке сейчас MOVER

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % 4), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cap-pane">
      <h3 className="cap-title" style={{ fontWeight: "500" }}>Интеграция с CRM</h3>
      <div className="cap-brands">
        <CapBrand logo="assets/channels/amocrm.png" name="amoCRM" />
        <CapBrand logo="assets/channels/bitrix24.png" name="Bitrix" />
        <CapBrand logo="assets/channels/kommo.png" name="Kommo" />
      </div>
      <div className="cap-checks">
        <CapCheck>Двигает сделки по воронке</CapCheck>
        <CapCheck>Извлекает и заполняет данные из полей</CapCheck>
        <CapCheck>Использует режим co-pilot</CapCheck>
      </div>

      <div className="cap-board">
        <div className="kanban">
          {COLS.map((c, i) =>
          <div className="kanban__col" key={i}>
              <div className="kanban__label">{c.label}</div>
              <div className="kanban__bar" style={{ background: c.bar }} />

              {/* контекстная сделка колонки */}
              {FIXED[i] && <DealCard {...FIXED[i]} />}

              {/* призрак сделки в колонке, которую она только что покинула */}
              {stage > 0 && i === stage - 1 &&
            <DealCard key={"ghost-" + i} {...MOVER} faded />
            }

              {/* сама движущаяся сделка */}
              {i === stage &&
            <DealCard key={"mover-" + i} {...MOVER} moving />
            }
            </div>
          )}
        </div>
      </div>
    </div>);

}

function PaneSheets() {
  const { useState, useEffect, useRef } = React;
  const rows = [
  { name: "Николай Мурашкин", phone: "+7 912 345-67-89", deal: "38209113", sum: "190 000", status: "Новая" },
  { name: "Максим Васильев", phone: "+7 903 111-22-33", deal: "38209108", sum: "80 000", status: "В работе" },
  { name: "Сергей Орлов", phone: "+7 985 777-10-04", deal: "38209097", sum: "35 000", status: "Оплачено" },
  { name: "Анна Лебедева", phone: "+7 921 559-08-12", deal: "38209090", sum: "120 000", status: "Новая" },
  { name: "Игорь Соколов", phone: "+7 916 220-44-71", deal: "38209085", sum: "64 000", status: "В работе" }];

  const cols = ["A", "B", "C", "D", "E"];

  const statusMod = (s) => s === "Оплачено" ? "ok" : s === "В работе" ? "work" : "new";

  return (
    <div className="cap-pane cap-pane--sheets">
      <h3 className="cap-title">Интеграции с Google-таблицами</h3>
      <p className="cap-mlead">
        Для вашего удобства мы научили Cавви напрямую подключаться к Google-таблицам и использовать
        их как базы знаний или заносить в них полученную от клиентов информацию
      </p>
      <img className="cap-sheets-logo" src="assets/savvi-logo-chip.svg" alt="Cавви → Google Таблицы" width="168" height="60" />

      <div className="gsheet">
        <div className="gsheet__app">
          <span className="gsheet__sheets-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#188038" /><path d="M14 2v6h6" fill="#0F6B2E" /><path d="M8 12h8v6H8z" fill="#fff" /><path d="M8 12h8M8 15h8M11 12v6M14 12v6" stroke="#188038" strokeWidth="1" /></svg>
          </span>
          <div className="gsheet__titles">
            <span className="gsheet__file">Заявки — Cавви</span>
            <span className="gsheet__menu">Файл · Правка · Вид · Вставка · Формат</span>
          </div>
          <span className="gsheet__share">Открыть доступ</span>
        </div>

        <div className="gsheet__table">
          <div className="gsheet__row gsheet__row--cols">
            <span className="gsheet__corner" />
            {cols.map((c) => <span className="gsheet__colh" key={c}>{c}</span>)}
          </div>
          <div className="gsheet__row gsheet__row--head">
            <span className="gsheet__rownum">1</span>
            <span>Клиент</span><span>Телефон</span><span>Сделка</span><span>Сумма</span><span>Статус</span>
          </div>
          {rows.map((r, i) =>
          <div className="gsheet__row gsheet__drow" key={r.deal}>
              <span className="gsheet__rownum">{i + 2}</span>
              <span>{r.name}</span>
              <span>{r.phone}</span>
              <span className="gsheet__link">#{r.deal}</span>
              <span>{r.sum} ₽</span>
              <span><i className={`sheet__tag sheet__tag--${statusMod(r.status)}`}>{r.status}</i></span>
            </div>
          )}
        </div>
      </div>
    </div>);

}

function MagentPill({ side, top, text }) {
  return (
    <div className={`magent-pill magent-pill--${side}`} style={{ top: top + "px", height: "40px", padding: "0px 8px", borderRadius: "10px", gap: "6px" }}>
      <span className="magent-pill__mark"><window.SuvvyMark size={18} color="#11253E" /></span>
      <span className="magent-pill__text">{text}</span>
      <svg className="magent-pill__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="#B6C0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>);

}

function MagentChannel({ glyph, name, sub, delay }) {
  return (
    <div className="magent-ch" style={{ animationDelay: delay + "ms", height: "34px", borderRadius: "8px", padding: "8px" }}>
      <span className="magent-ch__logo">{glyph}</span>
      <span className="magent-ch__name">{name}</span>
      <span className="magent-ch__sub">{sub}</span>
      <span className="magent-ch__toggle" aria-hidden="true" style={{ fontSize: "15px" }}><i /></span>
    </div>);

}

function PaneMulti() {
  const CM = window.ChannelMarks;
  return (
    <div className="cap-pane cap-pane--multi">
      <h3 className="cap-title">Мультиагентность</h3>
      <p className="cap-mlead">
        Уникальная технология Cавви, позволяющая подключать вспомогательных ботов к основному.
        Кратно увеличивает точность и качество ответов и минимизирует «галлюцинации», теперь можно
        не переживать, что бот ответит что-то не то
      </p>
      <div className="magent">
        <div className="magent__stage">
          {/* соединительные линии */}
          <svg className="magent__lines" viewBox="0 0 1120 400" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMin meet">
            <g stroke="#D5DCE6" strokeWidth="2" strokeLinecap="round" fill="none">
              {/* левая сторона: маршрут между пилюлями со скруглёнными углами */}
              <path className="magent-line" pathLength="1" d="M300 97 H361 a14 14 0 0 1 14 14 V213 a14 14 0 0 1 -14 14 H300" style={{ strokeWidth: "1.5px" }} />
              {/* левая ветка к карточке */}
              <path className="magent-line magent-line--b" pathLength="1" d="M375 162 H399" style={{ strokeWidth: "1.5px" }} />
              {/* правая сторона */}
              <path className="magent-line" pathLength="1" d="M820 97 H759 a14 14 0 0 0 -14 14 V213 a14 14 0 0 0 14 14 H820" />
              {/* правая ветка к карточке */}
              <path className="magent-line magent-line--b" pathLength="1" d="M745 162 H721" style={{ strokeWidth: "1.5px" }} />
            </g>
            <g className="magent-dots" fill="#C3CDD9">
              <circle cx="300" cy="97" r="4.5" />
              <circle cx="300" cy="227" r="4.5" />
              <circle cx="399" cy="162" r="4.5" />
              <circle cx="820" cy="97" r="4.5" />
              <circle cx="820" cy="227" r="4.5" />
              <circle cx="721" cy="162" r="4.5" />
            </g>
          </svg>

          {/* левые пилюли */}
          <MagentPill side="left" top={70} text="Расчет стоимости услуг" />
          <MagentPill side="left" top={200} text="Бронирование времени встречи" />

          {/* правые пилюли */}
          <MagentPill side="right" top={70} text="Расчет стоимости доставки" />
          <MagentPill side="right" top={200} text="Запись информации в таблицу" />

          {/* центральная карточка */}
          <div className="magent-card" style={{ borderRadius: "12px 12px 0px 0px" }}>
            <div className="magent-card__head">
              <span className="magent-card__avatar"><window.SuvvyMark size={20} color="#15B53C" /></span>
              <span className="magent-card__typing">
                <span className="magent-card__dots"><i /><i /><i /></span>
                Печатаю
              </span>
              <span className="magent-card__bell" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#15B53C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#15B53C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <h4 className="magent-card__title" style={{ fontSize: "18px", fontWeight: "700" }}>Бот для продаж</h4>

            <div className="magent-card__stats">
              <div className="magent-stat">
                <span className="magent-stat__label">Сообщений</span>
                <span className="magent-stat__value">289</span>
              </div>
              <div className="magent-stat">
                <span className="magent-stat__label">Отработано</span>
                <span className="magent-stat__value">270</span>
              </div>
              <div className="magent-stat">
                <span className="magent-stat__label">Эффективн…</span>
                <span className="magent-stat__value">96%</span>
              </div>
            </div>

            <button type="button" className="magent-card__btn" style={{ height: "40px" }}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Настройка чат-бота
            </button>

            <div className="magent-card__label" style={{ fontWeight: "500" }}>
              КАНАЛЫ
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#B6C0CC" strokeWidth="1.6" />
                <path d="M12 11v5M12 8h.01" stroke="#B6C0CC" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>

            <div className="magent-card__channels">
              <MagentChannel glyph={<img src="assets/channels/telegram.png" alt="" width="30" height="30" style={{ width: "24px", height: "24px" }} />} name="Telegram" sub="@savvvvvvi_bot" delay={520} />
              <MagentChannel glyph={<img src="assets/channels/whatsapp-round.png" alt="" width="30" height="30" style={{ height: "24px", width: "24px" }} />} name="WhatsApp" sub="id12452234" delay={620} />
              <MagentChannel glyph={<img src="assets/channels/bitrix24-round.png" alt="" width="30" height="30" />} name="Bitrix24" sub="id422543224" delay={720} />
            </div>
          </div>
        </div>
      </div>
    </div>);

}

function HookClientMsg({ name, children }) {
  return (
    <div className="hookmsg hookmsg--client">
      <div className="hookmsg__head">
        <span className="hookmsg__avatar hookmsg__avatar--client">{name.charAt(0)}</span>
        <span className="hookmsg__name">Клиент {name}</span>
      </div>
      <div className="hookmsg__bubble hookmsg__bubble--white">{children}</div>
    </div>);

}

function HookBotMsg({ children, white }) {
  return (
    <div className="hookmsg hookmsg--bot">
      <div className="hookmsg__head">
        <span className="hookmsg__mark"><window.SuvvyMark size={17} color="var(--suvvy-ink-900)" /></span>
        <span className="hookmsg__name">Чат-бот Cавви</span>
      </div>
      <div className={`hookmsg__bubble ${white ? "hookmsg__bubble--white" : ""}`}>{children}</div>
    </div>);

}

function PaneWebhooks() {
  return (
    <div className="cap-pane cap-pane--hooks">
      <h3 className="cap-title">Вебхуки</h3>
      <p className="cap-mlead">
        С помощью продвинутой системы вебхуков Cавви можно подключить к любым внешним базам
        данных (1С и пр.). Это позволяет формировать более конкретные ответы по запросу клиента
        и повышать глубину внедрения ИИ в процесс коммуникации с клиентом
      </p>

      <div className="hookflow">
        <div className="hookflow__col hookflow__col--left">
          <HookClientMsg name="Иван">Добрый день! Подскажите статус моего заказа?</HookClientMsg>
          <HookBotMsg>Здравствуйте! Напишите номер вашего телефона</HookBotMsg>
        </div>

        <div className="hookflow__hub" aria-hidden="true">
          <svg className="hookflow__conn" viewBox="0 0 700 320" fill="none">
            <g stroke="#CFD6E0" strokeWidth="1.5" fill="none">
              <path d="M378 70 H525" />
              <path d="M322 70 H238 a14 14 0 0 0 -14 14 V153 a14 14 0 0 1 -14 14 H210" />
            </g>
          </svg>
          <span className="hookflow__db">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="5" rx="1.5" stroke="#11253E" strokeWidth="1.5" />
              <rect x="3.5" y="9.5" width="17" height="5" rx="1.5" stroke="#11253E" strokeWidth="1.5" />
              <rect x="3.5" y="15.5" width="17" height="5" rx="1.5" stroke="#11253E" strokeWidth="1.5" />
              <circle cx="6.6" cy="6" r="0.9" fill="#11253E" />
              <circle cx="6.6" cy="12" r="0.9" fill="#11253E" />
              <circle cx="6.6" cy="18" r="0.9" fill="#11253E" />
            </svg>
          </span>
          <span className="hookflow__db-label">База данных 1С</span>
        </div>

        <div className="hookflow__col hookflow__col--right">
          <HookBotMsg>Ваш заказ #32452234 поступил в ПВЗ и готов к выдаче. Забрать заказ можно в рабочее время с 8:00–20:00 без выходных.</HookBotMsg>
          <HookBotMsg>У вас есть ещё вопросы по заказу?</HookBotMsg>
        </div>
      </div>
    </div>);

}

function PaneMarketplace() {
  return (
    <div className="cap-pane cap-pane--mp">
      <h3 className="cap-title">Интеграция с маркетплейсами</h3>
      <p className="cap-mlead" style={{ marginBottom: "18px" }}>
        Cавви можно подключить ко всем ключевым маркетплейсам для ответов на вопросы и отзывы
        клиентов. ИИ-боты возьмут на себя всю рутинную часть взаимодействия с аудиторией
      </p>

      <div className="cap-brands cap-brands--mp">
        <CapBrand logo="assets/channels/wildberries.png" name="Wildberries" />
        <CapBrand logo="assets/channels/ozon.png" name="OZON" />
        <CapBrand logo="assets/channels/yandex.png" name="Яндекс Маркет" />
      </div>

      <div className="mp-grid">
        {/* Карточка 1 — отзыв на Wildberries + ответ поставщика */}
        <article className="mp-card">
          <div className="mp-card__head">
            <span className="mp-ava" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="3.4" stroke="#8695A7" strokeWidth="1.6" /><path d="M5.5 19c0-3 2.9-4.6 6.5-4.6s6.5 1.6 6.5 4.6" stroke="#8695A7" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </span>
            <span className="mp-card__author">Покупатель Wildberries</span>
          </div>
          <div className="mp-card__time">Вчера, 18:55</div>
          <div className="mp-card__q">Здравствуйте, какой кистью лучше наносить?</div>

          <div className="mp-answer">
            <div className="mp-answer__head">
              <span>Ответ поставщика</span>
              <span className="mp-answer__mark"><window.SuvvyMark size={16} color="var(--suvvy-ink-900)" /></span>
            </div>
            <p className="mp-answer__text">
              Добрый день! Можно наносить пальцами, муссовая текстура разогревается на коже
              и ложится ровнее. Для профессионального нанесения распределяйте влажным спонжем
              или кистью (АРТ. 37872240). С уважением, команда бренда B.COLOUR PROFESSIONAL
            </p>
          </div>
        </article>

        {/* Карточка 2 — вопрос о товаре + ответ бренда (verified) */}
        <article className="mp-card">
          <div className="mp-card__head mp-card__head--product">
            <span className="mp-thumb" aria-hidden="true" />
            <span className="mp-card__product">YEAREE Календарь 2024 г., Отрывной, 10×15 см (4×6")</span>
            <span className="mp-card__date">6 декабря 2023</span>
          </div>
          <div className="mp-card__q mp-card__q--lg">Здравствуйте, а был ещё бежевый календарь в продаже, он ещё появится?</div>
          <div className="mp-card__sub">Анастасия В.</div>
          <div className="mp-card__like">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 10v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3zm0 0l4.5-7a2 2 0 0 1 3.5 1.3V8h4.2a1.8 1.8 0 0 1 1.8 2.1l-1.1 7A2 2 0 0 1 18 19H7" stroke="#8695A7" strokeWidth="1.5" strokeLinejoin="round" /></svg>
            5
          </div>

          <div className="mp-reply">
            <div className="mp-reply__head">
              <span className="mp-reply__ava" aria-hidden="true">Y</span>
              <span className="mp-reply__name">Yearee</span>
              <span className="mp-reply__verified" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#3A8DFF" /><path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="mp-reply__mark"><window.SuvvyMark size={15} color="var(--suvvy-ink-900)" /></span>
              <span className="mp-reply__date">14 декабря 2023</span>
            </div>
            <p className="mp-reply__text">
              Здравствуйте! Тираж лимитированной линейки Yearee aesthetic 2024 полностью
              распродан. Повтор не планируется
            </p>
            <div className="mp-reply__foot">
              <span className="mp-reply__ask">Вам помог этот ответ?</span>
              <span className="mp-reply__btn">Да 0</span>
              <span className="mp-reply__btn">Нет 0</span>
            </div>
          </div>
        </article>
      </div>
    </div>);

}

// ——— Сам блок с табами ———

function Capabilities() {
  const { useState } = React;
  const TABS = [
  { key: "Работа с CRM", icon: "assets/icons/tab-crm.svg", Pane: PaneCRM },
  { key: "Интеграция с Google-таблицами", icon: "assets/icons/tab-sheets.svg", Pane: PaneSheets },
  { key: "Мульти-агентность", icon: "assets/icons/tab-multiagent.svg", Pane: PaneMulti },
  { key: "Вебхуки", icon: "assets/icons/tab-webhook.svg", Pane: PaneWebhooks },
  { key: "Интеграция с маркетплейсами", icon: "assets/icons/tab-marketplace.svg", Pane: PaneMarketplace }];

  const [active, setActive] = useState(0);
  const Pane = TABS[active].Pane;

  return (
    <section id="capabilities" className="cap">
      <div className="cap__inner">
        <div className="crm__tabs cap__tabs" role="tablist">
          {TABS.map((t, i) =>
          <button
            key={t.key}
            role="tab"
            aria-selected={active === i}
            className={`crm__tab ${active === i ? "is-active" : ""}`}
            onClick={() => setActive(i)}>

              <span className="crm__tab-icon" style={{ WebkitMaskImage: `url(${t.icon})`, maskImage: `url(${t.icon})` }} aria-hidden="true" />
              <span>{t.key}</span>
            </button>
          )}
        </div>

        <div className="cap__panel">
          <div className="cap__stage" key={active}>
            <Pane />
          </div>
        </div>
      </div>
    </section>);

}

window.Capabilities = Capabilities;