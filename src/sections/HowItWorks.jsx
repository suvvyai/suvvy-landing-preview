// ─────────────────────────────────────────────────
// HowItWorks — «Принцип работы Cавви» (1:1 по референсу)
// Две вкладки: «Обработка запроса» и «Фиксация данных».
// Flow-диаграмма: сообщения → узлы-действия → сообщения.
// Коннекторы рисуются измеряемым SVG-оверлеем (точное
// соединение центров элементов, чистые скруглённые линии).
// ─────────────────────────────────────────────────

// ——— примитивы ———
function HiwClient({ name, anchor, children }) {
  return (
    <div className="hiw-msg">
      <div className="hiw-msg__head">
        <span className="hiw-ava hiw-ava--client">К</span>
        <span className="hiw-msg__name">{name || "Клиент"}</span>
      </div>
      <div className="hiw-bubble hiw-bubble--client" data-hw={anchor}>{children}</div>
    </div>);

}

function HiwBot({ anchor, children }) {
  return (
    <div className="hiw-botcard" data-hw={anchor}>
      <div className="hiw-msg__head">
        <span className="hiw-mark"><window.SuvvyMark size={16} color="var(--suvvy-ink-900)" /></span>
        <span className="hiw-msg__name">Чат-бот Cавви</span>
      </div>
      <div className="hiw-botcard__text">{children}</div>
    </div>);

}

function HiwNode({ children, logos, anchor }) {
  return (
    <span className="hiw-node" data-hw={anchor}>
      <span className="hiw-node__icons">{logos}</span>
      <span className="hiw-node__label">{children}</span>
    </span>);

}

// логотипы
const LogoSheets = () =>
<span className="hiw-logo">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" fill="#0F9D58" />
      <rect x="7" y="7" width="10" height="10" rx="1" fill="#fff" />
      <path d="M7 10.3h10M7 13.7h10M11.2 7v10M14.6 7v10" stroke="#0F9D58" strokeWidth="1" />
    </svg>
  </span>;

const LogoExcel = () =>
<span className="hiw-logo">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" fill="#1D6F42" />
      <path d="M9 8l6 8M15 8l-6 8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  </span>;

const LogoAmo = () => <span className="hiw-logo"><img src="assets/channels/amo.png" alt="" width="22" height="22" /></span>;
const LogoTelegram = () => <span className="hiw-logo"><img src="assets/channels/telegram.png" alt="" width="22" height="22" /></span>;
const LogoDoc = () =>
<span className="hiw-logo hiw-logo--doc">
    <svg viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" stroke="#5E748D" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3v5h5M8.5 13h7M8.5 16.5h7" stroke="#5E748D" strokeWidth="1.5" strokeLinecap="round" /></svg>
  </span>;

// ——— измеряемый SVG-оверлей коннекторов ———
// edges: [{from, to, spine: 'source'|'target'}]
function HiwConnectors({ edges, dep }) {
  const { useRef, useState, useLayoutEffect, useCallback } = React;
  const [data, setData] = useState({ w: 0, h: 0, paths: [], dots: [] });

  const measure = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const host = svg.parentElement;
    const hostRect = host.getBoundingClientRect();
    const anchor = (id, side) => {
      const el = host.querySelector(`[data-hw="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: (side === "right" ? r.right : r.left) - hostRect.left,
        y: r.top + r.height / 2 - hostRect.top };

    };
    const paths = [];
    const dots = [];
    edges.forEach((e) => {
      const s = anchor(e.from, "right");
      const t = anchor(e.to, "left");
      if (!s || !t) return;
      // Почти на одной линии — выравниваем по горизонтали (без наклона).
      if (Math.abs(t.y - s.y) < 9) t.y = s.y;
      // Спайн (вертикальный сегмент) всегда между источником и целью,
      // с отступом — иначе горизонтальный сегмент уходит назад и даёт «крючок».
      let spineX = e.spine === "source" ? s.x + 28 : t.x - 28;
      const lo = s.x + 14;
      const hi = t.x - 14;
      if (lo <= hi) spineX = Math.min(Math.max(spineX, lo), hi);else
      spineX = (s.x + t.x) / 2;
      paths.push(orth(s.x, s.y, t.x, t.y, spineX));
      dots.push({ x: t.x, y: t.y });
    });
    setData({ w: hostRect.width, h: hostRect.height, paths, dots });
  }, [edges]);

  const svgRef = useRef(null);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (svgRef.current && svgRef.current.parentElement) ro.observe(svgRef.current.parentElement);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 200);
    return () => {ro.disconnect();window.removeEventListener("resize", measure);clearTimeout(t);};
  }, [measure, dep]);

  return (
    <svg ref={svgRef} className="hiw-svg" width={data.w} height={data.h} aria-hidden="true">
      {data.paths.map((d, i) => <path key={i} className="hiw-path" pathLength="1" d={d} stroke="#CFD5E0" strokeWidth="1" fill="none" />)}
      {data.dots.map((p, i) => <circle key={i} className="hiw-dot" cx={p.x} cy={p.y} r="3" fill="#CFD5E0" />)}
    </svg>);

}

// строит ортогональный путь со скруглёнными углами (слева направо)
function orth(sx, sy, tx, ty, spineX) {
  // одинаковая высота — ровная горизонтальная линия
  if (Math.abs(ty - sy) < 0.5) return `M ${sx} ${sy} L ${tx} ${ty}`;
  const dirV = ty > sy ? 1 : -1;
  const r = Math.max(0, Math.min(12, Math.abs(spineX - sx), Math.abs(ty - sy) / 2, Math.abs(tx - spineX)));
  return (
    `M ${sx} ${sy}` +
    ` L ${spineX - r} ${sy}` +
    ` Q ${spineX} ${sy} ${spineX} ${sy + dirV * r}` +
    ` L ${spineX} ${ty - dirV * r}` +
    ` Q ${spineX} ${ty} ${spineX + r} ${ty}` +
    ` L ${tx} ${ty}`);

}

// ——— Вкладка 1: Обработка запроса ———
function PaneRequest() {
  const edges = [
  { from: "b1", to: "kb", spine: "target" },
  { from: "kb", to: "tbl", spine: "source" },
  { from: "kb", to: "crm", spine: "source" },
  { from: "tbl", to: "b2", spine: "target" },
  { from: "crm", to: "b2", spine: "target" }];

  return (
    <div className="hiw-flow hiw-flow--top">
      <HiwConnectors edges={edges} dep="req" />
      <div className="hiw-col hiw-col--msgs">
        <HiwClient anchor="c1">Добрый день! Интересует стоимость фена Dyson и подскажите по доставке.</HiwClient>
        <HiwBot anchor="b1">Здравствуйте! Сейчас проверю информацию.</HiwBot>
      </div>

      <div className="hiw-col hiw-col--node">
        <HiwNode anchor="kb" logos={<LogoDoc />}>База знаний</HiwNode>
        <p className="hiw-cap">Cавви делает запрос в базу знаний для получения информации о доставке</p>
      </div>

      <div className="hiw-col hiw-col--node">
        <div className="hiw-node-stack">
          <HiwNode anchor="tbl" logos={<React.Fragment><LogoSheets /><LogoExcel /></React.Fragment>}>Вызов таблицы</HiwNode>
          <HiwNode anchor="crm" logos={<LogoAmo />}>Обращение в CRM</HiwNode>
        </div>
        <p className="hiw-cap">Далее идёт либо в гугл-таблицу, где находит информацию о стоимости, либо обращается в стороннюю CRM и оттуда получает эту информацию</p>
      </div>

      <div className="hiw-col hiw-col--msgs">
        <HiwBot anchor="b2">Стоимость фена составит 34 500 руб. Доставка по вашему адресу составит 500 рублей. Оформить заказ?</HiwBot>
        <HiwClient anchor="c2">Да, оформите заказ!</HiwClient>
      </div>
    </div>);

}

// ——— Вкладка 2: Фиксация данных ———
function PaneFix() {
  const edges = [
  { from: "c1", to: "crm", spine: "target" },
  { from: "crm", to: "st", spine: "source" },
  { from: "crm", to: "fl", spine: "source" },
  { from: "st", to: "tg", spine: "target" }];

  return (
    <div className="hiw-flow hiw-flow--top">
      <HiwConnectors edges={edges} dep="fix" />
      <div className="hiw-col hiw-col--msgs">
        <HiwBot anchor="b1">Доставка по вашему адресу составит 500 рублей и займёт 1–3 рабочих дня. Оформить заказ?</HiwBot>
        <HiwClient anchor="c1">Да, оформите заказ!</HiwClient>
      </div>

      <div className="hiw-col hiw-col--node">
        <HiwNode anchor="crm" logos={<LogoAmo />}>Обращение в CRM</HiwNode>
        <p className="hiw-cap">Отправляет запрос в CRM (например, amoCRM) с информацией о заказе</p>
      </div>

      <div className="hiw-col hiw-col--node">
        <div className="hiw-node-stack">
          <HiwNode anchor="st" logos={<LogoAmo />}>Смена статусов</HiwNode>
          <HiwNode anchor="fl" logos={<LogoAmo />}>Заполнение полей</HiwNode>
        </div>
        <p className="hiw-cap">Меняет статус в CRM по продажам, заполняет поля</p>
      </div>

      <div className="hiw-col hiw-col--node hiw-col--last">
        <HiwNode anchor="tg" logos={<LogoTelegram />}>Telegram</HiwNode>
        <p className="hiw-cap">Оповещает ответственного менеджера в Telegram, что клиент готов сделать заказ</p>
      </div>
    </div>);

}

function HowItWorks() {
  const { useState, useEffect, useRef } = React;
  const TABS = [
  { key: "Обработка запроса", icon: "assets/icons/how-tab-request.svg", Pane: PaneRequest },
  { key: "Фиксация данных", icon: "assets/icons/how-tab-fix.svg", Pane: PaneFix }];

  const [active, setActive] = useState(0);
  const [inview, setInview] = useState(false);
  const secRef = useRef(null);
  const Pane = TABS[active].Pane;

  // Запуск анимации появления, когда блок прокручен в зону видимости.
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const show = () => setInview(true);
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.8 && r.bottom > 0;
    };
    if (inView()) {show();return;}
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((e) => {if (e.isIntersecting) {show();io.disconnect();}}), { threshold: 0.2 });
      io.observe(el);
    }
    const poll = setInterval(() => {if (inView()) {show();clearInterval(poll);if (io) io.disconnect();}}, 300);
    const fb = setTimeout(show, 2500);
    return () => {if (io) io.disconnect();clearInterval(poll);clearTimeout(fb);};
  }, []);

  return (
    <section id="how" className={`hiw ${inview ? "is-inview" : ""}`} ref={secRef} data-anim="1">
      <div className="hiw__panel">
        <div className="hiw__content">
          <header className="hiw__header reveal">
            <a href="#" className="hero__bonus hiw__bonus" style={{ display: "inline-flex", marginBottom: 22 }}>
              500 руб. ваш персональный бонус
            </a>
            <h2 className="hiw__title">Принцип работы Cавви</h2>
            <p className="hiw__sub">
              Наша технология позволяет настроить ИИ-бота под задачи вашего бизнеса всего за несколько
              шагов, что значительно упрощает процесс внедрения и экономит ваше время
            </p>
          </header>

          <div className="crm__tabs hiw__tabs" role="tablist" style={{ borderWidth: "0px" }}>
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

          <div className="hiw__card">
            <div className="hiw__stage" key={active}>
              <Pane />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.HowItWorks = HowItWorks;