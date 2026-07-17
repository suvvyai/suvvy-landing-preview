// ─────────────────────────────────────────────────
// Setup — «Механизм настройки чат-бота» (1:1 по референсу)
// Широкая градиентная панель (отступы как у калькулятора),
// контент 1200px: бонус-пилюля, заголовок, 4 колонки с разделителями
// и шевронами, внизу — чипы / иконки / логотипы каналов / карточка бота.
// ─────────────────────────────────────────────────

function SetupChip({ children, mark, icon }) {
  return (
    <span className="su-chip">
      {mark && <span className="su-chip__mark"><window.SuvvyMark size={15} color="var(--suvvy-ink-900)" /></span>}
      {icon && <span className="su-chip__icon">{icon}</span>}
      <span style={{ fontSize: "12px" }}>{children}</span>
    </span>);

}

function SetupLogo({ src, alt }) {
  return <span className="su-logo"><img src={src} alt={alt} width="46" height="46" /></span>;
}

function SetupBotCard() {
  const CH = [
  { logo: "assets/channels/telegram.png", name: "Telegram", sub: "@savvvvvvi_bot" },
  { logo: "assets/channels/whatsapp-round.png", name: "WhatsApp", sub: "id12452234" },
  { logo: "assets/channels/bitrix24-round.png", name: "Bitrix24", sub: "id422543224" }];

  return (
    <div className="su-bot">
      <div className="su-bot__head">
        <span className="su-bot__avatar"><window.SuvvyMark size={20} color="#15B53C" /></span>
        <span className="su-bot__typing">
          <span className="su-bot__dots"><i /><i /><i /></span>Печатаю
        </span>
        <span className="su-bot__bell" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="#15B53C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#15B53C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <h4 className="su-bot__title">Бот для продаж</h4>
      <div className="su-bot__stats">
        <div className="su-stat"><span className="su-stat__l">Сообщений</span><span className="su-stat__v">289</span></div>
        <div className="su-stat"><span className="su-stat__l">Отработано</span><span className="su-stat__v">270</span></div>
        <div className="su-stat"><span className="su-stat__l">Эффективн…</span><span className="su-stat__v">96%</span></div>
      </div>
      <button type="button" className="su-bot__btn">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Настройка чат-бота
      </button>
      <div className="su-bot__label">КАНАЛЫ
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#B6C0CC" strokeWidth="1.6" /><path d="M12 11v5M12 8h.01" stroke="#B6C0CC" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </div>
      <div className="su-bot__channels">
        {CH.map((c) =>
        <div className="su-ch" key={c.name}>
            <img className="su-ch__logo" src={c.logo} alt="" width="30" height="30" />
            <span className="su-ch__name">{c.name}</span>
            <span className="su-ch__sub">{c.sub}</span>
            <span className="su-ch__toggle" aria-hidden="true"><i /></span>
          </div>
        )}
      </div>
    </div>);

}

function Setup() {
  const ic = (d) =>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{d}</svg>;

  const COLS = [
  {
    title: "Выбор готовых решений",
    text: "Вы выбираете из библиотеки готовый сценарий, подходящий для вашего бизнеса.\n\nСценарий можно корректировать, или создать собственный",
    foot:
    <div className="su-chips">
          <SetupChip mark>Бот-продажник</SetupChip>
          <SetupChip mark>Бот-сотрудник поддержки</SetupChip>
          <SetupChip mark>HR-бот</SetupChip>
          <SetupChip mark>Бот-администратор YCLIENTS</SetupChip>
          <SetupChip mark>Бот для ответов на маркетплейсах</SetupChip>
        </div>

  },
  {
    title: "Настройка базы знаний",
    text: "Вы переносите в бота всю необходимую информацию о вашем бизнесе. При общении с клиентами бот будет сверяться с базой знаний для формулировки ответа",
    foot:
    <div className="su-chips">
          <SetupChip icon={<img src="assets/icons/kb-doc.svg" alt="" width="20" height="20" />}>Загрузка документов</SetupChip>
          <SetupChip icon={<img src="assets/icons/kb-site.svg" alt="" width="20" height="20" />}>Загрузка информации с сайта</SetupChip>
          <SetupChip icon={<img src="assets/icons/kb-table.svg" alt="" width="20" height="20" />}>Подключение таблиц</SetupChip>
          <SetupChip icon={<img src="assets/icons/kb-api.svg" alt="" width="20" height="20" />}>Интеграция по API</SetupChip>
        </div>

  },
  {
    title: "Подключение каналов",
    text: "Интеграция с amoCRM, Bitrix24, WhatsApp, Telegram и другими каналами происходит в пару кликов. Платформа предоставляет подробные инструкции и интерфейс с подсказками",
    foot:
    <div className="su-logos">
          <SetupLogo src="assets/channels/amo.png" alt="amoCRM" />
          <SetupLogo src="assets/channels/kommo.png" alt="Kommo" />
          <SetupLogo src="assets/channels/bitrix24-round.png" alt="Bitrix24" />
          <SetupLogo src="assets/channels/telegram.png" alt="Telegram" />
          <SetupLogo src="assets/channels/whatsapp-round.png" alt="WhatsApp" />
          <SetupLogo src="assets/channels/jivo.png" alt="JIVO" />
          <SetupLogo src="assets/channels/yandex.png" alt="Яндекс" />
          <SetupLogo src="assets/channels/helpdesk.png" alt="Helpdesk" />
          <SetupLogo src="assets/channels/wildberries.png" alt="Wildberries" />
          <SetupLogo src="assets/channels/ozon.png" alt="Ozon" />
          <SetupLogo src="assets/channels/mango.png" alt="Mango" />
        </div>

  },
  {
    title: "Тестирование и запуск",
    text: "Протестировать работу бота можно прямо в интерфейсе платформы. После успешного тестирования, бот может начинать взаимодействовать с клиентами в реальном времени",
    foot: <SetupBotCard />
  }];


  return (
    <section id="setup" className="su">
      <div className="su__panel" style={{ padding: "52px 0px 20px" }}>
        <img className="su__glow" src="assets/pr-glow-1.svg" alt="" aria-hidden="true" />
        <div className="su__content" style={{ padding: "0px" }}>
          <a href="#" className="hero__bonus" style={{ display: "inline-flex", marginBottom: 26 }}>
            Первичная настройка Cавви занимает 5-15 мин.
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: 16, height: 16, marginLeft: 4 }}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <h2 className="su__title" style={{ fontSize: "42px", fontWeight: "600", margin: "0px", padding: "0px 0px 6px" }}>Механизм настройки чат-бота</h2>
          <p className="su__sub" style={{ color: "rgb(99, 113, 128)", padding: "0px 0px 20px", margin: "0px 0px 35px" }}>
            Мы разработали систему, которая позволяет запустить бота под ваши задачи всего за несколько шагов,
            что значительно упрощает внедрение и экономит ваше время
          </p>

          <div className="su__grid">
            {COLS.map((c, i) =>
            <div className="su-col" key={c.title}>
                <h3 className="su-col__title" style={{ fontSize: "18px", margin: "0px" }}>{c.title}</h3>
                <div className="su-col__rule">
                  {i < COLS.length - 1 &&
                <span className="su-col__chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#B6C0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                }
                </div>
                <p className="su-col__text" style={{ padding: "0px 0px 30px", color: "rgb(99, 113, 128)" }}>{c.text}</p>
                <div className="su-col__foot">{c.foot}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

window.Setup = Setup;