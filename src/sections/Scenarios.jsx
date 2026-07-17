// ─────────────────────────────────────────────────
// Scenarios — «Готовые решения под ваши задачи» (1:1 по референсу)
// 3×2 сетка карточек 390×292, фон F0F4FA: метка Cавви 30×30,
// заголовок, чипы каналов, описание, кнопка «Подключить».
// Последняя карточка — «Свой сценарий» (белая, по центру, с обводкой).
// ─────────────────────────────────────────────────

function ScChip({ c }) {
  return (
    <span className="sc-chip" style={{ padding: "2px 12px 2px 6px" }}>
      {c.img ?
      <img className="sc-chip__logo" src={c.img} alt="" width="20" height="20" style={{ borderRadius: "0px" }} /> :
      <span className="sc-chip__mono" style={{ background: c.bg, color: c.fg }}>{c.mono}</span>}
      <span className="sc-chip__label">{c.label}</span>
    </span>);

}

function ScArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);

}

function Scenarios() {
  const items = window.SUVVY_DATA.scenarios;

  return (
    <section id="partners" className="sc">
      <div className="sc__inner">
        <div className="sc__head">
          <div className="sc__head-left">
            <h2 className="sc__title" style={{ fontWeight: "600", letterSpacing: "-0.9px", fontSize: "33px" }}>Готовые решения под ваши задачи</h2>
            <span className="sc__pill">Первичная настройка занимает 5-15 мин.</span>
          </div>
          <p className="sc__intro" style={{ color: "rgb(99, 113, 128)" }}>
            Cавви — это не просто чат-бот, а умный AI-сотрудник, способный работать по заранее
            настроенным сценариям общения. Эта настройка позволяет адаптировать бота под конкретные
            задачи и уникальные процессы вашего бизнеса
          </p>
        </div>

        <div className="sc__grid">
          {items.map((s) =>
          s.custom ?
          <article className="sc-card sc-card--custom" key={s.title}>
                <span className="sc-card__mark" style={{ backgroundColor: "rgb(225, 230, 236)" }}><window.SuvvyMark size={18} color="var(--suvvy-ink-900)" /></span>
                <h3 className="sc-card__title">{s.title}</h3>
                <p className="sc-card__desc">{s.desc}</p>
                <a href="#" className="btn btn-accent-solid sc-card__btn">
                  Создать свой сценарий <ScArrow />
                </a>
              </article> :

          <article className="sc-card" key={s.title} style={{ padding: "20px", borderRadius: "16px" }}>
                <span className="sc-card__mark"><window.SuvvyMark size={18} color="var(--suvvy-ink-900)" /></span>
                <h3 className="sc-card__title">{s.title}</h3>
                <div className="sc-card__chips">
                  {s.channels.map((c, i) => <ScChip c={c} key={i} />)}
                </div>
                <p className="sc-card__desc" style={{ color: "rgb(99, 113, 128)", fontWeight: "300" }}>{s.desc}</p>
                <a href="#" className="btn btn-accent-solid sc-card__btn">
                  Подключить <ScArrow />
                </a>
              </article>

          )}
        </div>
      </div>
    </section>);

}

window.Scenarios = Scenarios;