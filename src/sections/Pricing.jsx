// ─────────────────────────────────────────────────
// Pricing — «Сколько стоит чат-бот» (калькулятор 1:1 по референсу)
// Широкая градиентная панель (отступы как у блока каналов),
// контент 1200px: слева карточка-калькулятор со слайдером,
// справа карточка «Работаете с большим потоком клиентов?».
// ─────────────────────────────────────────────────

function Pricing() {
  const { useState, useRef, useLayoutEffect } = React;
  const MAX = 10000;
  const PER = 15; // ₽ за диалог
  const [vol, setVol] = useState(0);
  const fmt = (n) => n.toLocaleString("ru-RU");

  const isMax = vol >= MAX;
  const price = vol * PER;
  const pct = vol / MAX * 100;

  // позиция «пузырька» со значением над ползунком
  const trackRef = useRef(null);
  const [bubbleX, setBubbleX] = useState(0);
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    setBubbleX(pct / 100 * (w - 20) + 10);
  }, [pct]);

  return (
    <section id="pricing" className="pr" style={{ padding: "0px 60px 64px" }}>
      <div className="pr__panel">
        <img className="pr__glow pr__glow--1" src="assets/pr-glow-1.svg" alt="" aria-hidden="true" />
        <img className="pr__glow pr__glow--2" src="assets/pr-glow-2.svg" alt="" aria-hidden="true" />
        <div className="pr__content">
          <span className="pr__eyebrow">Сколько стоит чат-бот</span>
          <h2 className="pr__title" style={{ fontSize: "40px", fontWeight: "500" }}>
            Средняя стоимость от 5000₽ в месяц
            <span className="pr__title-note" style={{ fontWeight: "500" }}>≈ 500 запросов от клиентов</span>
          </h2>
          <p className="pr__sub" style={{ color: "rgb(99, 113, 128)" }}>
            Стоимость зависит от задач. Можно выбрать готовый вариант — он дешевле и быстрее в запуске.<br />
            Или заказать разработку AI-бота — индивидуальное решение, которое полностью адаптируется под ваш процесс.
          </p>

          <div className="pr__grid">
            {/* калькулятор */}
            <div className="pr-calc" style={{ borderRadius: "14px", borderStyle: "solid", borderColor: "rgb(225, 230, 236)", borderWidth: "0px" }}>
              <div className="pr-calc__head">
                <h3 className="pr-calc__title" style={{ fontWeight: "600" }}>Рассчитайте стоимость ИИ-бота</h3>
                <span className="pr-calc__mark"><window.SuvvyMark size={22} color="var(--suvvy-ink-900)" /></span>
              </div>
              <p className="pr-calc__hint" style={{ color: "rgb(99, 113, 128)" }}>Укажите примерное кол-во диалогов с клиентами в месяц</p>

              <div className="pr-slider">
                <div className="pr-slider__track" ref={trackRef}>
                  <span className="pr-slider__bubble" style={{ left: bubbleX + "px" }}>{isMax ? "10000+" : fmt(vol)}</span>
                  <span className="pr-slider__fill" style={{ width: pct + "%" }} />
                  <input
                    type="range"
                    min={0}
                    max={MAX}
                    step={50}
                    value={vol}
                    aria-label="Количество диалогов в месяц"
                    onChange={(e) => setVol(Number(e.target.value))} />
                </div>
                <div className="pr-slider__scale">
                  <span>0</span>
                  <span style={{ color: "rgb(99, 113, 128)" }}>10000+</span>
                </div>
              </div>

              <div className="pr-calc__row">
                <div className="pr-calc__cost">
                  <span className="pr-calc__cost-label">Стоимость</span>
                  <span className="pr-calc__cost-val" style={{ fontWeight: "500" }}>{isMax ? "Персональный" : fmt(price) + "руб."}</span>
                </div>
                <div className="pr-chip">
                  <span className="pr-chip__top" style={{ color: "rgb(99, 113, 128)" }}>до 1000 диалогов</span>
                  <span className="pr-chip__big">≈15₽/диалог</span>
                </div>
                <div className="pr-chip">
                  <span className="pr-chip__top" style={{ color: "rgb(99, 113, 128)" }}>10 000+ диалогов</span>
                  <span className="pr-chip__big">Персональный</span>
                </div>
              </div>

              <div className="pr-calc__foot">
                <a href="#" className="btn btn-accent-solid pr-calc__btn" style={{ height: "42px", borderRadius: "10px" }}>Создать ИИ-бота</a>
                <div className="pr-note" style={{ fontSize: "12px", borderRadius: "12px" }}>
                  <span className="pr-note__ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#F0A024" /><path d="M12 10.5v6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" /><circle cx="12" cy="7.4" r="1.4" fill="#fff" /></svg>
                  </span>
                  Диалог — это сессия общения с клиентом в течение 24 часов
                </div>
              </div>
            </div>

            {/* большой поток */}
            <aside className="pr-big" style={{ borderRadius: "14px" }}>
              <img className="pr-big__img" src="assets/chat-3d.webp" alt="" width="150" height="120" />
              <h3 className="pr-big__title" style={{ fontWeight: "600", lineHeight: "1.3" }}>Работаете с большим потоком клиентов?</h3>
              <p className="pr-big__text" style={{ color: "rgb(99, 113, 128)" }}>Если у вас больше 10 000 диалогов в месяц — мы предложим гибкие условия и скидки</p>
              <a href="#" className="btn btn-accent-solid pr-big__btn" style={{ height: "42px", borderRadius: "10px" }}>
                Получить предложение
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>);

}

window.Pricing = Pricing;