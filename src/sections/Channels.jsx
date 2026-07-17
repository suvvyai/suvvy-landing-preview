// ─────────────────────────────────────────────────
// Channels — «Интеграция с CRM, мессенджерами и даже маркетплейсами»
// Широкая секция, контент 1200px: текст + орбита-иллюстрация,
// строка табов с иконками, сетка карточек интеграций.
// Контент табов взят с suvvy.ai.
// ─────────────────────────────────────────────────

const CRM_TABS = [
{
  key: "CRM-системы",
  icon: "assets/icons/tab-crm.svg",
  cards: [
  { name: "amoCRM", logo: "assets/channels/amocrm.png" },
  { name: "Kommo", logo: "assets/channels/kommo.png" },
  { name: "Bitrix24", logo: "assets/channels/bitrix24.png" },
  { name: "Planfix", logo: "assets/channels/planfix.png" }],
  desc: "Смена статусов в воронке CRM, заполнение полей в CRM, запись на услуги и др."
},
{
  key: "Чаты для сайта",
  icon: "assets/icons/tab-chat.svg",
  cards: [
  { name: "Jivo", tint: "#00B956", mark: "J" },
  { name: "Cавви", isBrand: true }],
  desc: "Ответ клиентам в чате на вашем сайте, подключение менеджера по триггерным словам, и др."
},
{
  key: "Мессенджеры",
  icon: "assets/icons/tab-messenger.svg",
  cards: [
  { name: "Telegram", tint: "#27A7E5", mark: "T" },
  { name: "MAX", tint: "#7B61FF", mark: "M" },
  { name: "WhatsApp", tint: "#25D366", mark: "W" }],
  desc: "Прямое подключение к мессенджеру, ответ клиентам от лица вашего бизнеса на основе базы знаний, и др."
},
{
  key: "Социальные сети",
  icon: "assets/icons/tab-social.svg",
  cards: [
  { name: "ВКонтакте", tint: "#0077FF", mark: "VK" }],
  desc: "Прямое подключение к соцсети, ответ клиентам от лица вашего бизнеса на основе базы знаний, и др."
},
{
  key: "Маркетплейсы",
  icon: "assets/icons/tab-marketplace.svg",
  cards: [
  { name: "OZON", tint: "#005BFF", mark: "O" },
  { name: "Яндекс Маркет", tint: "#FFCC00", mark: "Я", inkText: true },
  { name: "Wildberries", tint: "#CB11AB", mark: "WB" }],
  desc: "Прямое подключение к маркетплейсу, ответы на отзывы и вопросы ваших клиентов на основе базы знаний."
},
{
  key: "Хелпдекс-системы",
  icon: "assets/icons/tab-helpdesk.svg",
  cards: [
  { name: "Helpdeskeddy", tint: "#1B7FD6", mark: "H" },
  { name: "Planfix", logo: "assets/channels/planfix.png" },
  { name: "Usedesk", tint: "#2D6CDF", mark: "U" }],
  desc: "Глубокая интеграция с хэлпдеск-системой, ответы клиентам на основе базы знаний, обновление статусов обращений, и др."
},
{
  key: "Букинг-системы",
  icon: "assets/icons/tab-booking.svg",
  cards: [
  { name: "ALTEGIO", tint: "#19C29B", mark: "A" },
  { name: "Google-календарь", tint: "#1A73E8", mark: "G" },
  { name: "YCLIENTS", tint: "#1A8BE5", mark: "Y" }],
  desc: "Общение с клиентами по всем каналам, проверка свободного времени, запись на услуги и к конкретным специалистам, и др."
}];


function ChannelCardLogo({ card }) {
  if (card.logo) {
    return <img className="crmint-card__logo-img" src={card.logo} alt={card.name} width="44" height="44" />;
  }
  if (card.isBrand) {
    return (
      <span className="crmint-card__logo" style={{ background: "var(--suvvy-ink-900)" }}>
        <window.SuvvyMark size={22} color="#fff" />
      </span>);

  }
  return (
    <span className="crmint-card__logo" style={{ background: "var(--suvvy-accent-blue)", color: "#fff" }}>
      {card.mark}
    </span>);

}

function Channels() {
  const { useState } = React;
  const [active, setActive] = useState(0);
  const tab = CRM_TABS[active];

  return (
    <section id="features" className="crm">
      <div className="crm__inner">
        <div className="crm__panel" style={{ padding: "0px 0px 56px" }}>
          <div className="crm__content" style={{ padding: "0px" }}>
          {/* верхняя часть: текст + иллюстрация */}
          <div className="crm__top">
            <div className="crm__copy">
              <span className="crm__eyebrow">Подключение каналов</span>
              <h2 className="crm__title" style={{ fontWeight: "500" }}>Интеграция с CRM,<br />мессенджерами и даже<br />маркетплейсами</h2>
            </div>
            <div className="crm__art" aria-hidden="true">
              <img src="assets/channels-orbit.png" alt="" />
            </div>
          </div>

          {/* строка табов */}
          <div className="crm__tabs" role="tablist">
            {CRM_TABS.map((t, i) =>
              <button
                key={t.key}
                role="tab"
                aria-selected={active === i}
                className={`crm__tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}>

                <span className="crm__tab-icon" style={{ WebkitMaskImage: `url(${t.icon})`, maskImage: `url(${t.icon})` }} aria-hidden="true" />
                <span style={{ fontSize: "14px" }}>{t.key}</span>
              </button>
              )}
          </div>

          {/* карточки интеграций */}
          <div className="crm__grid" key={active}>
            {tab.cards.map((c) =>
              <article className="crmint-card" key={c.name} style={{ margin: "-1px", borderRadius: "13px", borderWidth: "0px", padding: "12px 2px 12px 12px" }}>
                <ChannelCardLogo card={c} />
                <h3 className="crmint-card__name" style={{ height: "21px", fontSize: "15px" }}>{c.name}</h3>
                <p className="crmint-card__desc" style={{ fontSize: "12px" }}>{tab.desc}</p>
              </article>
              )}
          </div>
        </div>
        </div>
      </div>
    </section>);

}

window.Channels = Channels;