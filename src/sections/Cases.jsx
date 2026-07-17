// ─────────────────────────────────────────────────
// Cases — «Кейсы и полезная выжимка от Cавви»
// Горизонтальный слайдер карточек с prev/next в шапке.
// Карточка: eyebrow → заголовок → описание → «Читать» →
// фото-обложка (image-slot, заполняется пользователем) внизу.
// «Читать» ведёт на внутреннюю страницу кейса (Кейс.html?id=…).
// ─────────────────────────────────────────────────

function CaseCard({ cs }) {
  return (
    <article className="ccard">
      <div className="ccard__body">
        <span className="ccard__eyebrow" style={{ fontWeight: "500", color: "rgb(134, 149, 167)" }}>{cs.eyebrow}</span>
        <h3 className="ccard__title" style={{ fontWeight: "600" }}>{cs.title}</h3>
        <p className="ccard__desc">{cs.desc}</p>
        <a className="ccard__read" href={`Кейс.html?id=${cs.id}`}>
          <span className="ccard__read-mark"><window.SuvvyMark size={15} color="var(--suvvy-ink-900)" /></span>
          Читать
        </a>
      </div>
      <image-slot
        id={cs.cover}
        class="ccard__cover"
        shape="rounded"
        radius="0"
        placeholder="Обложка кейса">
      </image-slot>
    </article>);

}

function Cases() {
  const { useRef, useState, useEffect, useCallback } = React;
  const all = window.SUVVY_DATA.cases;
  const FILTERS = ["Все", "Кейсы", "Маркетинг", "Обучение", "Новости"];
  const [filter, setFilter] = useState("Все");
  const items = filter === "Все" ? all : all.filter((c) => c.cat === filter);

  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {el.removeEventListener("scroll", update);window.removeEventListener("resize", update);};
  }, [update]);

  // при смене фильтра — сброс к началу и пересчёт стрелок
  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = 0;
    update();
  }, [filter, update]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".ccard");
    const step = card ? card.offsetWidth + 16 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="cases" className="cases2">
      <div className="cases2__inner">
        <div className="cases2__head">
          <h2 className="cases2__title">Кейсы и полезная выжимка от Cавви</h2>
          <div className="cases2__nav">
            <button type="button" className="cases2__arrow" aria-label="Назад" disabled={atStart} onClick={() => scrollBy(-1)}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="cases2__arrow" aria-label="Вперёд" disabled={atEnd} onClick={() => scrollBy(1)}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div className="cases2__filters" role="tablist">
          {FILTERS.map((f) =>
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`cases2__filter ${filter === f ? "is-active" : ""}`}
            onClick={() => setFilter(f)} style={{ height: "36px" }}>

              {f}
            </button>
          )}
        </div>

        <div className="cases2__track" ref={trackRef}>
          {items.map((cs) => <CaseCard cs={cs} key={cs.id} />)}
        </div>
      </div>
    </section>);

}

window.Cases = Cases;