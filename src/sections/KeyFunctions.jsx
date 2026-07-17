// ─────────────────────────────────────────────────
// KeyFunctions — «Ключевые функции Cавви» (1:1 по референсу)
// Слева заголовок + 3 пункта (активный с синей чертой на разделителе),
// справа реальный скриншот продукта, меняется по активному пункту.
// ─────────────────────────────────────────────────

function KeyFunctions() {
  const { useState } = React;
  const items = window.SUVVY_DATA.keyFunctions;
  const [active, setActive] = useState(items[0].id);
  const current = items.find((i) => i.id === active) || items[0];

  return (
    <section id="solutions" className="keyfn">
      <div className="keyfn__inner">
        <header className="keyfn__header reveal">
          <h2 className="keyfn__title">Ключевые функции Cавви</h2>
          <p className="keyfn__sub" style={{ fontSize: "17px" }}>
            Платформа оснащена набором всех необходимых функций для проведения полного цикла продаж
          </p>
        </header>

        <div className="keyfn__grid">
          <div className="keyfn__nav">
            {items.map((it) =>
            <button
              key={it.id}
              type="button"
              className={`keyfn__item ${active === it.id ? "is-active" : ""}`}
              onClick={() => setActive(it.id)}
              onMouseEnter={() => setActive(it.id)}>

                <span className="keyfn__item-head">
                  <img className="keyfn__icon" src={it.icon} alt="" aria-hidden="true" width="20" height="20" style={{ width: "18px", height: "18px" }} />
                  <span className="keyfn__item-title" style={{ fontSize: "20px", fontWeight: "600" }}>{it.title}</span>
                </span>
                <span className="keyfn__item-desc">{it.desc}</span>
              </button>
            )}
          </div>

          <div className="keyfn__stage">
            <div className="keyfn__frame" key={current.id}>
              <img src={current.image} alt={current.title} />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.KeyFunctions = KeyFunctions;