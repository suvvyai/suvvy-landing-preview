// ─────────────────────────────────────────────────
// CaseDetail — внутренняя страница кейса (Кейс.html?id=…)
// Если у кейса есть массив body[] — рендерим длинную статью
// 1:1 как на suvvy.ai (О проекте / Решение / Сложности / Результат
// + изображения, цитата, сноска). Иначе — компактная сводка.
// ─────────────────────────────────────────────────

function CaseBar() {
  return (
    <div className="cdp__bar">
      <div className="cdp__bar-inner">
        <a className="cdp__logo" href="Suvvy Landing.html" aria-label="На главную">
          <img src="assets/logo-suvvy-full.svg" alt="Cавви" width="100" height="25" />
        </a>
        <a className="cdp__back" href="Suvvy Landing.html#cases">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Все кейсы
        </a>
      </div>
    </div>);

}

function CaseCTA() {
  return (
    <div className="cdp__cta">
      <div>
        <h3 className="cdp__cta-title">Хотите так же?</h3>
        <p className="cdp__cta-sub">Запустите ИИ-бота под задачи вашего бизнеса за несколько шагов.</p>
      </div>
      <a className="btn btn-accent-solid cdp__cta-btn" href="Suvvy Landing.html#pricing">
        Создать ИИ-бота
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </div>);

}

function MoreCases({ cs }) {
  const more = window.SUVVY_DATA.cases.filter((c) => c.id !== cs.id).slice(0, 3);
  return (
    <section className="cdp__more">
      <div className="cdp__more-inner">
        <h2 className="cdp__more-title">Другие кейсы</h2>
        <div className="cdp__more-grid">
          {more.map((m) =>
          <a className="cdp__more-card" href={`Кейс.html?id=${m.id}`} key={m.id}>
              <span className="ccard__eyebrow">{m.eyebrow}</span>
              <h3 className="cdp__more-h3">{m.title}</h3>
              <span className="cdp__more-read">
                <span className="ccard__read-mark"><window.SuvvyMark size={14} color="var(--suvvy-ink-900)" /></span>
                Читать
              </span>
            </a>
          )}
        </div>
      </div>
    </section>);

}

// — рендер одного блока длинной статьи —
function CaseBlock({ b }) {
  switch (b.type) {
    case "h2":
      return <h2 className="cdp__h2">{b.text}</h2>;
    case "p":
      return <p className="cdp__p">{b.text}</p>;
    case "label":
      return <p className="cdp__label">{b.text}</p>;
    case "ul":
      return (
        <ul className="cdp__list">
          {b.items.map((t, i) =>
          <li key={i}>
              <span className="cdp__li-mark"><window.SuvvyMark size={14} color="var(--suvvy-ink-900)" /></span>
              <span>{t}</span>
            </li>
          )}
        </ul>);

    case "ul-strong":
      return (
        <ul className="cdp__list cdp__list--strong">
          {b.items.map((it, i) =>
          <li key={i}>
              <span className="cdp__li-mark"><window.SuvvyMark size={14} color="var(--suvvy-ink-900)" /></span>
              <span><strong>{it.strong}</strong>{it.text}</span>
            </li>
          )}
        </ul>);

    case "ol":
      return (
        <ol className="cdp__ol">
          {b.items.map((it, i) =>
          <li key={i}>
              <span className="cdp__ol-num">{i + 1}</span>
              <span><strong>{it.strong}</strong>{it.text}</span>
            </li>
          )}
        </ol>);

    case "image":
      return (
        <image-slot
          id={b.slot}
          class="cdp__fig"
          shape="rounded"
          radius="16"
          placeholder="Скриншот из кейса">
        </image-slot>);

    case "images":
      return (
        <div className="cdp__figs" style={{ "--n": b.slots.length }}>
          {b.slots.map((s) =>
          <image-slot key={s} id={s} class="cdp__fig" shape="rounded" radius="16" placeholder="Скриншот"></image-slot>
          )}
        </div>);

    case "quote":
      return (
        <blockquote className="cdp__quote">
          <p>{b.text}</p>
          {b.author ? <footer>{b.author}</footer> : null}
        </blockquote>);

    case "note":
      return <p className="cdp__note">{b.text}</p>;
    default:
      return null;
  }
}

function CaseDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const all = window.SUVVY_DATA.cases;
  const cs = all.find((c) => c.id === id) || all[0];

  // — длинная статья (1:1 как на сайте) —
  if (cs.body) {
    return (
      <main className="cdp">
        <CaseBar />
        <header className="cdp__banner">
          <image-slot
            id={cs.cover}
            class="cdp__banner-img"
            shape="rect"
            placeholder="Обложка кейса">
          </image-slot>
          <span className="cdp__banner-scrim" aria-hidden="true"></span>
          <div className="cdp__banner-inner">
            <span className="cdp__banner-eyebrow">
              <span className="cdp__banner-mark"><window.SuvvyMark size={15} color="var(--suvvy-ink-900)" /></span>
              {cs.eyebrow}
            </span>
            <h1 className="cdp__banner-title">{cs.pageTitle || cs.title}</h1>
          </div>
        </header>

        <article className="cdp__article cdp__article--body">
          {cs.body.map((b, i) => <CaseBlock b={b} key={i} />)}
          <CaseCTA />
        </article>
        <MoreCases cs={cs} />
      </main>);

  }

  // — компактная сводка (для остальных кейсов) —
  return (
    <main className="cdp">
      <CaseBar />
      <header className="cdp__hero">
        <div className="cdp__hero-inner">
          <div className="cdp__crumbs">
            <span className="cdp__eyebrow">{cs.eyebrow}</span>
            {cs.industry ? <span className="cdp__chip">{cs.industry}</span> : null}
          </div>
          <h1 className="cdp__title">{cs.title}</h1>
          {cs.lead ? <p className="cdp__lead">{cs.lead}</p> : null}

          {cs.stats &&
          <div className="cdp__stats">
              {cs.stats.map((s, i) =>
            <div className="cdp__stat" key={i}>
                  <span className="cdp__stat-val">{s.value}</span>
                  <span className="cdp__stat-lbl">{s.label}</span>
                </div>
            )}
            </div>
          }
        </div>

        <image-slot id={cs.cover} class="cdp__cover" shape="rounded" radius="20" placeholder="Обложка кейса"></image-slot>
      </header>

      <article className="cdp__body">
        {cs.challenge &&
        <section className="cdp__block">
            <h2 className="cdp__h2">Задача</h2>
            <p className="cdp__p">{cs.challenge}</p>
          </section>
        }
        {cs.solution &&
        <section className="cdp__block">
            <h2 className="cdp__h2">Что сделали</h2>
            <ul className="cdp__list">
              {cs.solution.map((t, i) =>
            <li key={i}>
                  <span className="cdp__li-mark"><window.SuvvyMark size={14} color="var(--suvvy-ink-900)" /></span>
                  <span>{t}</span>
                </li>
            )}
            </ul>
          </section>
        }
        {cs.results &&
        <section className="cdp__block">
            <h2 className="cdp__h2">Результат</h2>
            <ul className="cdp__list cdp__list--ok">
              {cs.results.map((t, i) =>
            <li key={i}>
                  <span className="cdp__check" aria-hidden="true">
                    <svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9.25" stroke="#14B825" strokeWidth="1.5" /><path d="M7 11.2l2.6 2.6L15 8.4" stroke="#14B825" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>{t}</span>
                </li>
            )}
            </ul>
          </section>
        }
        {cs.quote &&
        <blockquote className="cdp__quote">
            <p>«{cs.quote.text}»</p>
            {cs.quote.author ? <footer>{cs.quote.author}</footer> : null}
          </blockquote>
        }
        <CaseCTA />
      </article>

      <MoreCases cs={cs} />
    </main>);

}

window.CaseDetail = CaseDetail;
