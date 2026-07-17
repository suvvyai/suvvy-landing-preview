// ─────────────────────────────────────────────────
// Hero — 1:1 по референсу suvvy.ai
// 3 колонки: текст | «Готовые решения» + сетка каналов | живой чат
// Под hero — три тезиса на диагональной фиолетово-синей ленте.
// ─────────────────────────────────────────────────

// Сценарии диалогов: подпись таба, заголовок чата и реплики.
const SCENARIOS = [
  {
    label: "ИИ-продажник",
    title: "Бот-продажник",
    script: [
      { who: "client", text: "Здравствуйте, подскажите, сколько стоит доставка?" },
      { who: "bot", text: "Здравствуйте! Доставка по вашему адресу составит 300 рублей. Хотите оформить заказ?" },
      { who: "client", text: "Да, оформите, пожалуйста." },
      { who: "bot", text: "Отлично! Я оформил ваш заказ. Вы получите его 20 ноября. Оплата будет при получении, верно? Если нужно что-то уточнить, дайте знать!" },
    ],
  },
  {
    label: "ИИ-сотрудник поддержки",
    title: "ИИ-сотрудник поддержки",
    script: [
      { who: "client", text: "У меня возникла проблема, не могу войти в личный кабинет." },
      { who: "bot", text: "Здравствуйте! Попробуйте восстановить пароль через ссылку «Забыли пароль?» на странице входа." },
      { who: "client", text: "Спасибо! Все получилось." },
      { who: "bot", text: "Супер! Если возникнет какая-то проблема, обращайтесь. Мы на связи 24/7. Хорошего дня!" },
    ],
  },
  {
    label: "ИИ-ответы на маркетплейсах",
    title: "ИИ-ответы на маркетплейсах",
    script: [
      { who: "client", text: "Сложно ли менять шины на самокате в модели E212?" },
      { who: "bot", text: "Нет, замена шин на самокате обычно несложна. Процесс включает снятие колеса, замену покрышки или камеры и установку колеса обратно.\n\nДля наглядного примера вы можете ознакомиться с видеоинструкцией: https://youtu.be/lmtHIY7W" },
    ],
  },
  {
    label: "ИИ-администратор YCLIENTS",
    title: "ИИ-администратор YCLIENTS",
    script: [
      { who: "client", text: "Добрый день. Хочу записаться на прием к Иванову Ивану." },
      { who: "bot", text: "Добрый день! Отлично, необходимо проверить его график. На какую дату и время вы бы хотели записаться?" },
      { who: "client", text: "Можно на завтра, с 10 до 12?" },
      { who: "bot", text: "Отлично! Я записал вас на завтра с 10:00 до 12:00. Если что-то нужно изменить или уточнить, дайте знать!" },
    ],
  },
  {
    label: "ИИ-HR",
    title: "ИИ-HR",
    script: [
      { who: "client", text: "Привет! Вы на данный момент еще ищете сотрудников?" },
      { who: "bot", text: "Привет! Ищем. Я могу за пару минут провести первичный скрининг — хотите начать сейчас?" },
      { who: "client", text: "Да, конечно." },
      { who: "bot", text: "Супер! Первый вопрос — в каких индустриях вы уже работали, и есть ли опыт в B2B-продаж?" },
    ],
  },
];

function Hero() {
  const { useState } = React;
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState("text"); // "text" | "voice"
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-tint" style={{ height: "1200px" }} />
        <img className="hero__glow" src="assets/hero-glow.svg" alt="" aria-hidden="true" />
      </div>

      <div className="container hero__grid" style={{ paddingInline: 0, maxWidth: "1200px" }}>
        {/* ── Left: heading & CTAs ───────────────────────── */}
        <div className="hero__copy reveal" style={{ padding: "1px 0px" }}>
          <a href="#" className="hero__bonus" style={{ margin: "0px 0px 28px", height: "30px", padding: "4px 18px 6px", fontSize: "13px" }}>
            500 руб. приветственный бонус на вашем аккаунте
          </a>

          <h1 className="hero__title" style={{ fontWeight: "500", color: "rgb(26, 55, 92)" }}>
            Платформа<br />для создания<br />мощных<br />
            <span className="hero__title-grad" style={{ color: "rgb(59, 61, 212)", fontWeight: "500" }}>
              AI-ботов
              <span className="hero__title-chip" aria-hidden="true">
                <img src="assets/channels/chatgpt.png" alt="" style={{ width: "33px", height: "33px" }} />
              </span>
            </span>
          </h1>

          <p className="hero__lead">
            AI-боты для бизнеса с возможностью работы по сложным сценариям
          </p>

          <div className="hero__ctas">
            <a href="#" className="btn btn-accent-solid btn-lg" style={{ backgroundColor: "rgb(59, 61, 212)", borderRadius: "11px", height: "42px", width: "167px", fontSize: "14px" }}>
              Создать ИИ-бота <window.Icons.arrow size={16} />
            </a>
            <a href="#" className="hero__play-link">
              <span className="hero__play-circle">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--suvvy-accent-blue)" aria-hidden="true">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              </span>
              <span style={{ color: "rgb(99, 113, 128)", fontWeight: "400" }}>Знакомство с Cавви<br />за 2 минуты</span>
            </a>
          </div>
        </div>

        {/* ── Right: combined panel + chat (chat overlaps the panel) ── */}
        <div className="hero__visual reveal" aria-hidden="true">
          <div className="combo" style={{ fontSize: "13px", lineHeight: "1.6" }}>
            <SolutionsCard active={active} setActive={setActive} mode={mode} setMode={setMode} />
            <div className="combo__chat">
              <ChatPreviewCard active={active} mode={mode} />
            </div>
          </div>
        </div>
      </div>

    </section>);

}

/* ───────── Готовые решения панель (табы диалогов) ─────────── */
function SolutionsCard({ active, setActive, mode, setMode }) {
  const scenarios = SCENARIOS.map((s) => s.label);

  const channels = [
  "kommo.png", "telegram", "whatsapp.png", "amo.png",
  "bitrix24.png", "wildberries.png", "yandex.png", "ozon.png",
  "jivo.png", "mango.png", "planfix.png", "helpdesk.png"];


  return (
    <div className="sol-card" style={{ borderRadius: "16px 16px 0 0", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", height: "539px", gap: "30px", margin: "40px 0px 0px", width: "638px" }}>
      {/* Текст / Голос */}
      <div className="seg" role="tablist" style={{ height: "37px", borderRadius: "90px" }}>
        <button
          type="button"
          className={`seg__btn ${mode === "text" ? "is-active" : ""}`}
          onClick={() => setMode("text")} style={{ height: "26px", borderRadius: "90px", padding: "9px 12px" }}>
          
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M2.5 4.5h11M2.5 8h8M2.5 11.5h5" />
          </svg>
          Текст
        </button>
        <button
          type="button"
          className={`seg__btn ${mode === "voice" ? "is-active" : ""}`}
          onClick={() => setMode("voice")} style={{ borderRadius: "90px", padding: "9px 12px" }}>
          
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6.5v3M6 4v8M9 5.5v5M12.5 7v2" />
          </svg>
          Голос
        </button>
      </div>

      {/* Список сценариев */}
      <ul className="sol-card__list" style={{ gap: "16px" }}>
        {scenarios.map((s, i) =>
        <li
          key={s}
          className={`sol-card__item ${active === i ? "is-active" : ""}`}
          onClick={() => setActive(i)} style={{ fontFamily: "Inter", height: "22px", padding: "2px", margin: "1px", letterSpacing: "0px", lineHeight: "1.65", width: "222px", fontSize: "13px" }}>
          
            {s}
            {active === i && <span className="sol-card__marker" aria-hidden="true" />}
          </li>
        )}
      </ul>

      {/* Каналы */}
      <div className="sol-card__channels" style={{ gap: "24px", marginTop: "40px" }}>
        {channels.map((c, i) =>
        c === "telegram" ?
        <span className="sol-channel sol-channel--tg" key={i} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#27A7E5" />
                <path d="M18.4 6.6 5.9 11.4c-.7.3-.7.8 0 1l3.1.9 1.2 3.7c.1.4.3.5.6.5.3 0 .4-.1.7-.4l1.7-1.6 3.3 2.4c.6.4 1 .2 1.2-.6l2.1-9.8c.2-.9-.3-1.3-1-.9z" fill="#fff" />
                <path d="m7.3 13 6-3.8-7 5.6L7.3 13z" fill="#cfe8f5" />
              </svg>
            </span> :
        <img className="sol-channel" key={i} src={`assets/channels/${c}`} alt="" />
        )}
      </div>
    </div>);

}

/* ───────── Чат-превью карточка (live-имитация диалога) ─────────── */

// Авто-скролл к низу при появлении контента, пока пользователь сам не отлистнул вверх.
function useStickyScroll(deps) {
  const { useRef, useEffect, useCallback } = React;
  const ref = useRef(null);
  const stick = useRef(true); // держимся низа?

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    stick.current = nearBottom;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (el && stick.current) {
      // Мгновенный прыжок к низу: событие scroll придёт уже на самом низу,
      // поэтому "прилипание" не сбрасывается само собой (в отличие от smooth).
      el.scrollTop = el.scrollHeight;
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, onScroll };
}

function ChatPreviewCard({ active, mode }) {
  const { useState, useEffect } = React;

  const scenario = SCENARIOS[active] || SCENARIOS[0];
  const script = scenario.script;

  const [visible, setVisible] = useState(0); // сколько сообщений показано
  const [typing, setTyping] = useState(false); // индикатор «Печатаю»
  const feed = useStickyScroll([visible, typing]);

  useEffect(() => {
    if (mode === "voice") return; // голосовой режим управляется отдельно
    let cancelled = false;
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(() => {if (!cancelled) fn();}, ms));

    const run = () => {
      setVisible(0);
      setTyping(false);
      let t = 1000;
      script.forEach((m, i) => {
        if (m.who === "bot") {
          at(t, () => setTyping(true)); // показать «Печатаю»
          t += 2400;
          at(t, () => {setTyping(false);setVisible(i + 1);}); // выдать ответ
          t += 1600;
        } else {
          at(t, () => setVisible(i + 1)); // сообщение клиента
          t += 2200;
        }
      });
      at(t + 4000, run); // пауза и повтор
    };

    run();
    return () => {cancelled = true;timers.forEach(clearTimeout);};
  }, [active, mode]);

  const isVoice = mode === "voice";

  return (
    <div className="chatcard" style={{ padding: "16px 20px", height: "550px", lineHeight: "1.65", width: "363px" }}>
      <header className="chatcard__head">
        <div className="chatcard__avatar" style={{ width: "38px", height: "38px", borderRadius: "10px" }}>
          <window.SuvvyMark size={22} color="var(--suvvy-ink-900)" />
          <span className="chatcard__avatar-dot" />
        </div>
        <div>
          <div className="chatcard__title" style={{ fontSize: "16px", fontWeight: "600" }}>{scenario.title}</div>
          <div className="chatcard__sub" style={{ fontSize: "13px", fontWeight: "400", margin: "0px" }}>
            {isVoice ? "Голосовой бот" : "Онлайн 24/7"}
          </div>
        </div>
      </header>

      {isVoice ?
      <VoiceCall key={"voice-" + active} scenario={scenario} /> :
      <div className="chatcard__feed" style={{ justifyContent: "flex-start" }} ref={feed.ref} onScroll={feed.onScroll}>
          {script.slice(0, visible).map((m, i) =>
        m.who === "client" ?
        <ClientMsg key={active + "-" + i}>{m.text}</ClientMsg> :
        <BotMsg key={active + "-" + i}>{m.text}</BotMsg>
        )}
          {typing && <TypingIndicator />}
        </div>
      }
    </div>);

}

/* ───────── Голосовой звонок: живая плашка → расшифровка → запись ─────────── */
function fmtTime(total) {
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor(total % 3600 / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function VoiceCall({ scenario }) {
  const { useState, useEffect, useRef } = React;
  const script = scenario.script;

  const [phase, setPhase] = useState("calling"); // calling | ended
  const [visible, setVisible] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false); // индикатор «Говорю»

  // Проигрывание реплик голосом (Web Speech API)
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  const scroll = useStickyScroll([visible, phase, speaking]);

  // Тикающий таймер во время звонка
  useEffect(() => {
    if (phase !== "calling") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Последовательность: реплики появляются → звонок завершается → пауза → повтор
  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(() => {if (!cancelled) fn();}, ms));

    const run = () => {
      stopSpeak();
      setPlaying(false);
      setPhase("calling");
      setVisible(0);
      setSeconds(0);
      setSpeaking(false);
      let t = 1000;
      script.forEach((m, i) => {
        // тот же ритм, что во вкладке «Текст»
        if (m.who === "bot") {
          at(t, () => setSpeaking(true)); // показать «Говорю»
          t += 2400;
          at(t, () => {setSpeaking(false);setVisible(i + 1);}); // выдать ответ
          t += 1600;
        } else {
          at(t, () => setVisible(i + 1));
          t += 2200;
        }
      });
      at(t + 600, () => {setSpeaking(false);setPhase("ended");}); // звонок завершён
    };

    run();
    return () => {cancelled = true;timers.forEach(clearTimeout);stopSpeak();};
  }, [scenario]);

  function stopSpeak() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    playingRef.current = false;
  }

  function handlePlay() {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth) return;

    if (playingRef.current) {
      synth.cancel();
      playingRef.current = false;
      setPlaying(false);
      return;
    }

    synth.cancel();
    const lines = script.map((m) => (m.who === "bot" ? "Савви: " : "Клиент: ") + m.text);
    const ruVoice = synth.getVoices().find((v) => /ru/i.test(v.lang));
    let idx = 0;

    const speakNext = () => {
      if (idx >= lines.length || !playingRef.current) {
        playingRef.current = false;
        setPlaying(false);
        return;
      }
      const u = new SpeechSynthesisUtterance(lines[idx]);
      u.lang = "ru-RU";
      if (ruVoice) u.voice = ruVoice;
      u.rate = 1;
      u.pitch = 1;
      u.onend = () => { idx += 1; speakNext(); };
      synth.speak(u);
    };

    playingRef.current = true;
    setPlaying(true);
    speakNext();
  }

  return (
    <div className="voicecall" ref={scroll.ref} onScroll={scroll.onScroll}>
      {phase === "calling" &&
      <div className="voicebar">
          <span className="voicebar__eq" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="voicebar__status">Говорите, Cавви на линии…</span>
          <span className="voicebar__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="voicebar__timer">{fmtTime(seconds)}</span>
          <button type="button" className="voicebar__hangup" aria-label="Завершить звонок">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.99.99 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 1.36c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28a11.27 11.27 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9V9.7C15.15 9.25 13.6 9 12 9z" />
            </svg>
          </button>
        </div>
      }

      <div className="chatcard__feed voicecall__feed" style={{ justifyContent: "flex-start" }}>
        {script.slice(0, visible).map((m, i) =>
        m.who === "client" ?
        <ClientMsg key={i}>{m.text}</ClientMsg> :
        <BotMsg key={i}>{m.text}</BotMsg>
        )}
        {speaking && <TypingIndicator label="Говорю" variant="wave" />}
      </div>

      {phase === "ended" &&
      <div className="callend">
          <div className="callend__head">
            <span className="callend__avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.99.99 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 1.36c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28a11.27 11.27 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9V9.7C15.15 9.25 13.6 9 12 9z" />
              </svg>
            </span>
            <div>
              <div className="callend__title">Звонок окончен</div>
              <div className="callend__sub">Запись разговора и текстовая расшифровка успешно сохранены</div>
            </div>
          </div>

          <div className="audioplayer">
            <button type="button" className="audioplayer__play" onClick={handlePlay} aria-label={playing ? "Остановить" : "Прослушать запись"}>
              {playing ?
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> :
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
            }
            </button>
            <span className={`audioplayer__wave ${playing ? "is-playing" : ""}`} aria-hidden="true">
              {Array.from({ length: 32 }).map((_, i) => <i key={i} />)}
            </span>
            <span className="audioplayer__time">00:05:55</span>
            <button type="button" className="audioplayer__dl" aria-label="Скачать запись">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />
              </svg>
            </button>
          </div>
        </div>
      }
    </div>);

}

function TypingIndicator({ label = "Печатаю", variant = "dots" }) {
  return (
    <div className="typing">
      {variant === "wave" ?
      <span className="typing__wave" aria-hidden="true"><i /><i /><i /><i /></span> :
      <span className="typing__dots" aria-hidden="true"><i /><i /><i /></span>
      }
      <span className="typing__label">{label}</span>
    </div>);

}

function ClientMsg({ children }) {
  return (
    <div className="msg msg--client" style={{ gap: "4px" }}>
      <div className="msg__head">
        <span className="msg__avatar msg__avatar--client">К</span>
        <span className="msg__name" style={{ fontSize: "14px", fontWeight: "600" }}>Клиент</span>
      </div>
      <div className="msg__bubble" style={{ fontSize: "14px", margin: "0px 0px 0px 27px", padding: "8px 16px", borderRadius: "10px" }}>{children}</div>
    </div>);

}

function BotMsg({ children }) {
  return (
    <div className="msg msg--bot">
      <div className="botblock" style={{ gap: "7px", borderRadius: "10px", padding: "8px 16px", backgroundColor: "rgb(240, 244, 250)" }}>
        <div className="botblock__head">
          <span className="botblock__mark">
            <window.SuvvyMark size={18} color="var(--suvvy-ink-900)" />
          </span>
          <span className="botblock__name" style={{ fontSize: "14px", fontWeight: "600" }}>Чат-бот Cавви</span>
        </div>
        <div className="botblock__text" style={{ whiteSpace: "pre-line" }}>{children}</div>
      </div>
    </div>);

}

window.Hero = Hero;
window.ClientMsg = ClientMsg;
window.BotMsg = BotMsg;
window.TypingIndicator = TypingIndicator;