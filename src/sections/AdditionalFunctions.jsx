// ─────────────────────────────────────────────────
// AdditionalFunctions — «Дополнительный функционал» (1:1 по референсу)
// Секция: заголовок + подзаголовок + сетка 2×2 карточек.
// Каждая карточка — светлый верх + градиентный низ (как solcard),
// по центру заголовок и описание, ниже — тематический мок.
// ─────────────────────────────────────────────────

// ——— Переиспользуемые куски сообщений ———

function AfClientHead({ letter, name, tone }) {
  return (
    <div className="afmsg__head">
      <span className={`afmsg__ava afmsg__ava--client ${tone ? "afmsg__ava--" + tone : ""}`}>{letter}</span>
      <span className="afmsg__name">{name}</span>
    </div>);

}

function AfBotHead({ name }) {
  return (
    <div className="afmsg__head">
      <span className="afmsg__mark" style={{ backgroundColor: "rgb(241, 245, 251)" }}><window.SuvvyMark size={16} color="var(--suvvy-ink-900)" /></span>
      <span className="afmsg__name">{name || "Чат-бот Cавви"}</span>
    </div>);

}

function AfBotCard({ children }) {
  return (
    <div className="afbotcard">
      <AfBotHead />
      <div className="afbotcard__text">{children}</div>
    </div>);

}

function AfAudio() {
  return (
    <div className="afaudio">
      <button type="button" className="afaudio__play" aria-label="Прослушать">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
      </button>
      <span className="afaudio__wave" aria-hidden="true">{Array.from({ length: 26 }).map((_, i) => <i key={i} />)}</span>
      <span className="afaudio__time">0:08</span>
    </div>);

}

// фото-сообщение клиента (фото его телевизора)
function AfPhoto() {
  return (
    <div className="afphoto-msg">
      <span className="afphoto-tv" aria-hidden="true">
        <svg viewBox="0 0 64 48" fill="none">
          <rect x="6" y="4" width="52" height="32" rx="3.5" fill="#2A3442" />
          <rect x="9" y="7" width="46" height="26" rx="2" fill="#3B82F6" opacity="0.25" />
          <rect x="26" y="36" width="12" height="5" rx="1" fill="#2A3442" />
          <rect x="20" y="41" width="24" height="3" rx="1.5" fill="#2A3442" />
        </svg>
      </span>
      <span className="afphoto-cap">photo_tv.jpg</span>
    </div>);

}

// ——— Карточка 1: распознавание голоса и изображений ———
function CardVoiceVision() {
  return (
    <article className="addfn-card addfn-card--voice">
      <span className="addfn-card__glow" aria-hidden="true" style={{ backgroundImage: "url(assets/addfn-glow-voice.svg)" }} />
      <div className="addfn-card__body">
        <h3 className="addfn-card__title" style={{ fontWeight: "500" }}>Распознавание голоса и изображений</h3>
        <p className="addfn-card__lead">
          ИИ-боты Cавви понимают речь, умеют делать поиск по фото и даже способны сами отправлять
          голосовые сообщения. Ни в чём не уступают сотруднику-человеку
        </p>

        <div className="addfn-stage addfn-stage--vv">
          <div className="afmsg">
            <AfClientHead letter="К" name="Клиент" />
            <AfAudio />
          </div>

          <div className="afmsg">
            <AfClientHead letter="К" name="Клиент" />
            <AfPhoto />
          </div>

          <div className="afmsg afmsg--span">
            <AfBotCard>
              Самое оптимальное решение для вашего телевизора: ТВ-приставка Xiaomi Box S 2nd Gen EU
              MDZ-28-AA (PFJ4151EU). Стоимость данной приставки составит: 5 950р.
            </AfBotCard>
          </div>
        </div>
      </div>
    </article>);

}

// ——— Карточка 2: фоллоу-апы ———
function CardFollowups() {
  return (
    <article className="addfn-card addfn-card--followups">
      <span className="addfn-card__glow" aria-hidden="true" style={{ backgroundImage: "url(assets/addfn-glow-followups.svg)", height: "266px" }} />
      <div className="addfn-card__body">
        <h3 className="addfn-card__title">Отправка фоллоу-апов клиентам</h3>
        <p className="addfn-card__lead">
          Cавви может автоматически отправлять дополнительные сообщения клиенту в случае, если он
          забыл вам ответить или прервал коммуникацию, возвращая его в воронку продаж
        </p>

        <div className="addfn-stage">
          <div className="afmsg">
            <AfClientHead letter="И" name="Клиент Иван" tone="purple" />
            <div className="afbubble afbubble--white">Напишите мне чуть позже, как уточните, пожалуйста</div>
          </div>

          <div className="afmsg afmsg--rel">
            <AfBotCard>Договорились!</AfBotCard>
            <div className="afsched">
              <div className="afsched__top">
                <span className="afsched__time"><span className="afsched__clock" />10 окт. 18:00</span>
                <span className="afsched__cancel">Отменить</span>
              </div>
              <div className="afsched__row">
                <span>Иван, я уточнил, мы сможем доставить</span>
                <span className="afsched__edit" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="#8695A7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </div>
          </div>

          <AfBotCard>Иван, я уточнил, мы сможем доставить ваш заказ сегодня.</AfBotCard>
        </div>
      </div>
    </article>);

}

// ——— Карточка 3: Google-календарь ———
function CardCalendar() {
  const days = [["ВС", 11], ["ПН", 12], ["ВТ", 13], ["СР", 14], ["ЧТ", 15], ["ПТ", 16], ["СБ", 17]];
  const hours = ["6 AM", "7 AM", "8 AM", "9 AM", "10 AM"];
  return (
    <article className="addfn-card addfn-card--cal">
      <div className="addfn-card__body" style={{ color: "rgb(241, 245, 250)" }}>
        <h3 className="addfn-card__title">Интеграция с Google-календарем</h3>
        <p className="addfn-card__lead">
          Интеграция Cавви с Google-календарем позволит боту проверять свободные слоты, предлагать
          их клиентам для согласования и автоматически заносить встречи с клиентом в ваше расписание
        </p>

        <div className="addfn-stage addfn-stage--cal">
          <img className="afconnect-img" src="assets/savvi-gcal-connect.png" alt="Cавви → Google Календарь" width="240" height="64" />

          <div className="afcal">
            <div className="afcal__head">
              <span className="afcal__tz">GMT+03</span>
              {days.map(([d, n]) =>
              <span className="afcal__day" key={n}><i>{d}</i><b>{n}</b></span>
              )}
            </div>
            <div className="afcal__grid">
              {hours.map((h, ri) =>
              <div className="afcal__row" key={h}>
                  <span className="afcal__hour">{h}</span>
                  {days.map(([, n], ci) =>
                <span className="afcal__cell" key={n}>
                      {ri === 1 && ci === 2 && <span className="afcal__ev">Запись на стри…<br />7–8AM</span>}
                      {ri === 4 && ci === 0 && <span className="afcal__ev">Запись на стри…<br />9:30–10:30AM</span>}
                      {ri === 4 && ci === 4 && <span className="afcal__ev">Мужская стриж…<br />10–11AM</span>}
                    </span>
                )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>);

}

// ——— Карточка 4: вызов сотрудника ———
function CardEmployee() {
  return (
    <article className="addfn-card addfn-card--employee">
      <span className="addfn-card__glow" aria-hidden="true" style={{ backgroundImage: "url(assets/addfn-glow-employee.svg)", height: "339px" }} />
      <div className="addfn-card__body">
        <h3 className="addfn-card__title">Вызов сотрудника</h3>
        <p className="addfn-card__lead">
          Бота можно настроить таким образом, что по событиям-триггерам он будет автоматически
          приглашать сотрудника-человека в диалог
        </p>

        <div className="addfn-stage">
          <div className="afmsg">
            <AfClientHead letter="К" name="Клиент" />
            <div className="afbubble afbubble--white">Добрый день! Я хочу купить у вас приставку для телевизора Samsung QE55Q70CAUXRU</div>
          </div>

          <div className="afnotice">
            <div className="afnotice__title">
              <span className="afnotice__ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#8695A7" strokeWidth="1.6" /><path d="M12 8v5M12 16h.01" stroke="#8695A7" strokeWidth="1.7" strokeLinecap="round" /></svg>
              </span>
              Диалог был остановлен т.к. поменялся статус в CRM
            </div>
            <p className="afnotice__text">
              Диалог с чат-ботом прерван, отвечать на поступающие сообщения в этом чате
              необходимо в ручном режиме
            </p>
          </div>

          <div className="afmsg">
            <AfClientHead letter="М" name="Менеджер" mgr />
            <div className="afbubble afbubble--white">Добрый день! Сейчас проверю наличие</div>
          </div>
        </div>
      </div>
    </article>);

}

function AdditionalFunctions() {
  return (
    <section id="addfn" className="addfn">
      <div className="addfn__inner">
        <header className="addfn__header reveal">
          <h2 className="addfn__h2">Дополнительный функционал</h2>
          <p className="addfn__sub">
            Платформа оснащена набором всех необходимых функций для проведения полного цикла продаж
          </p>
        </header>

        <div className="addfn__grid">
          <CardVoiceVision />
          <CardFollowups />
          <CardCalendar />
          <CardEmployee />
        </div>

        <div className="addfn__cta">
          <a href="#" className="btn btn-accent-solid addfn__cta-btn">
            Создать ИИ-бота
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>);

}

window.AdditionalFunctions = AdditionalFunctions;