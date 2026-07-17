// ─────────────────────────────────────────────────
// Solutions — «Решения для автоматизации звонков и чатов».
// Две ИНТЕРАКТИВНЫЕ карточки:
//   • Чат-бот — живой чат, Cавви отвечает через Claude API.
//   • Голосовой бот — звонок: микрофон → распознавание речи →
//     ответ Cавви голосом; в конце «Послушайте голос Cавви».
// ─────────────────────────────────────────────────

const SAVVY_PERSONA =
"Ты — Cавви, дружелюбный ИИ-ассистент платформы Suvvy (Савви) для автоматизации " +
"продаж и поддержки. Отвечай кратко (1–2 предложения), вежливо, на «вы», по-русски, " +
"без эмодзи. Веди себя как ИИ-продавец и поддержка: консультируй, отвечай на вопросы " +
"и мягко подводи к целевому действию. Если спрашивают о Suvvy — это платформа для " +
"создания ИИ-ботов для чатов, маркетплейсов и звонков.";

// Запрос ответа Cавви: собираем персону + транскрипт диалога в один промпт.
async function askSavvy(messages) {
  const transcript = messages.
  map((m) => (m.who === "bot" ? "Cавви: " : "Клиент: ") + m.text).
  join("\n");
  const prompt = `${SAVVY_PERSONA}\n\nДиалог:\n${transcript}\nCавви:`;
  try {
    const text = await window.claude.complete(prompt);
    return (text || "").trim() || "Извините, повторите, пожалуйста.";
  } catch (e) {
    return "Извините, сейчас не получилось ответить. Попробуйте ещё раз.";
  }
}

// Авто-скролл ленты к низу (как в hero), пока пользователь сам не отлистнул вверх.
function useStickToBottom(deps) {
  const { useRef, useEffect, useCallback } = React;
  const ref = useRef(null);
  const stick = useRef(true);
  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return { ref, onScroll };
}

function SolutionCard({ tone, icon, title, desc, children }) {
  return (
    <article className={`solcard solcard--${tone} reveal`}>
      <div className="solcard__bg" aria-hidden="true" />
      <div className="solcard__body" style={{ padding: "44px 52px 34px" }}>
        <img className="solcard__icon" src={icon} alt="" aria-hidden="true" />
        <h3 className="solcard__title" style={{ fontSize: "23px" }}>{title}</h3>
        <p className="solcard__desc" style={{ fontSize: "15px" }}>{desc}</p>
        <div className="solcard__preview">{children}</div>
      </div>
    </article>);

}

/* ───────── Сообщения чата (по референсу, без inline-стилей) ───────── */
function IChatClientMsg({ children }) {
  return (
    <div className="msg msg--client">
      <div className="msg__head">
        <span className="msg__avatar msg__avatar--client">К</span>
        <span className="msg__name">Клиент</span>
      </div>
      <div className="msg__bubble">{children}</div>
    </div>);

}

function IChatBotMsg({ children }) {
  return (
    <div className="msg msg--bot">
      <div className="botblock">
        <div className="botblock__head">
          <span className="botblock__mark">
            <window.SuvvyMark size={18} color="var(--suvvy-ink-900)" />
          </span>
          <span className="botblock__name">Чат-бот Cавви</span>
        </div>
        <div className="botblock__text" style={{ whiteSpace: "pre-line" }}>{children}</div>
      </div>
    </div>);

}

/* ───────── Скриптовый диалог с Cавви (демо, без ввода) ───────── */
const CHAT_SCRIPT = [
{ who: "client", text: "Здравствуйте, подскажите, сколько стоит доставка?" },
{ who: "bot", text: "Здравствуйте! Доставка по вашему адресу составит 300 рублей. Хотите оформить заказ?" }];


function InteractiveChat() {
  return (
    <div className="ichat ichat--static">
      <div className="ichat__feed">
        {CHAT_SCRIPT.map((m, i) =>
        m.who === "client" ?
        <IChatClientMsg key={i}>{m.text}</IChatClientMsg> :
        <IChatBotMsg key={i}>{m.text}</IChatBotMsg>
        )}
      </div>
    </div>);

}

/* ───────── Интерактивный голосовой звонок ───────── */
function fmtCall(total) {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `00:${m}:${s}`;
}

function InteractiveVoice() {
  const { useState, useEffect, useRef } = React;
  // idle | listening | thinking | speaking | ended
  // По умолчанию показываем плашку с записью голоса Cавви + кнопку «Позвонить».
  const [phase, setPhase] = useState("ended");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState([]); // {who,text}
  const [error, setError] = useState("");
  const [playing, setPlaying] = useState(false);

  const recRef = useRef(null);
  const greetRef = useRef(null);
  const feed = useStickToBottom([transcript, phase]);

  const live = phase === "listening" || phase === "thinking" || phase === "speaking";

  // Таймер во время звонка
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [live]);

  function speak(text, after) {
    const synth = window.speechSynthesis;
    if (!synth) {if (after) after();return;}
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";
    const ru = synth.getVoices().find((v) => /ru/i.test(v.lang));
    if (ru) u.voice = ru;
    u.onend = () => {if (after) after();};
    synth.speak(u);
  }

  function startCall() {
    setError("");
    setTranscript([]);
    setSeconds(0);
    const greet = "Здравствуйте! Меня зовут Cавви. Чем могу помочь?";
    setPhase("speaking");
    setTranscript([{ who: "bot", text: greet }]);
    speak(greet, listen);
  }

  function listen() {
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      setError("Распознавание речи недоступно в этом браузере. Откройте сайт в Chrome.");
      setPhase("ended");
      return;
    }
    setPhase("listening");
    const rec = new Rec();
    recRef.current = rec;
    rec.lang = "ru-RU";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = async (ev) => {
      const said = ev.results[0][0].transcript;
      setTranscript((t) => [...t, { who: "client", text: said }]);
      setPhase("thinking");
      const history = [...transcript, { who: "client", text: said }];
      const reply = await askSavvy(history);
      setTranscript((t) => [...t, { who: "bot", text: reply }]);
      setPhase("speaking");
      speak(reply, () => setPhase("listening") || restartListen());
    };
    rec.onerror = (ev) => {
      if (ev.error === "no-speech") {setError("Не расслышал. Нажмите «Сказать» ещё раз.");} else
      if (ev.error === "not-allowed") {setError("Разрешите доступ к микрофону, чтобы поговорить с Cавви.");} else
      {setError("Микрофон недоступен.");}
      setPhase("speaking"); // остаёмся в звонке, ждём кнопку
    };
    rec.onend = () => {};
    try {rec.start();} catch (e) {/* already started */}
  }

  // Повторное прослушивание запускается кнопкой «Сказать», не авто-циклом.
  function restartListen() {}

  function pushToTalk() {
    if (phase === "listening") return;
    listen();
  }

  function endCall() {
    if (recRef.current) {try {recRef.current.stop();} catch (e) {}}
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setPhase("ended");
  }

  function playGreeting() {
    const a = greetRef.current;
    // Если загружена реальная запись приветствия — играем её, иначе синтез речи.
    if (a && a.readyState >= 2 && a.duration && isFinite(a.duration)) {
      if (playing) {a.pause();a.currentTime = 0;setPlaying(false);return;}
      setPlaying(true);
      a.onended = () => setPlaying(false);
      a.play().catch(() => {setPlaying(false);speak("Здравствуйте! Меня зовут Cавви. Рад слышать вас.");});
      return;
    }
    if (playing) {window.speechSynthesis && window.speechSynthesis.cancel();setPlaying(false);return;}
    setPlaying(true);
    speak("Здравствуйте! Меня зовут Cавви. Рад слышать вас. Я помогу ответить на ваши вопросы.", () => setPlaying(false));
  }

  const statusText =
  phase === "listening" ? "Слушаю вас…" :
  phase === "thinking" ? "Думаю…" :
  phase === "speaking" ? "Говорю…" : "Cавви на линии…";

  return (
    <div className="ivoice">
      {phase === "idle" &&
      <div className="ivoice__start">
        <p className="ivoice__hint">Нажмите «Позвонить», разрешите доступ к микрофону и поговорите с Cавви голосом.</p>
        <button type="button" className="ivoice__call" onClick={startCall}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.9 3 3.4 3.4 3 4 3h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
          </svg>
          Позвонить
        </button>
      </div>
      }

      {live &&
      <div className="voicebar voicebar--static">
        <span className="voicebar__eq" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="voicebar__status">{statusText}</span>
        <span className="voicebar__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="voicebar__timer">{fmtCall(seconds)}</span>
        <button type="button" className="voicebar__hangup" aria-label="Завершить звонок" onClick={endCall}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 9c-1.6 0-3.15.25-4.6.7v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.99.99 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-1.78 1.36c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28a11.27 11.27 0 0 0-2.66-1.85.998.998 0 0 1-.56-.9V9.7C15.15 9.25 13.6 9 12 9z" />
          </svg>
        </button>
      </div>
      }

      {live &&
      <div className="ivoice__feed" ref={feed.ref} onScroll={feed.onScroll}>
        {transcript.map((m, i) =>
        m.who === "client" ?
        <window.ClientMsg key={i}>{m.text}</window.ClientMsg> :
        <window.BotMsg key={i}>{m.text}</window.BotMsg>
        )}
        {error && <div className="ivoice__err">{error}</div>}
        <div className="ivoice__controls">
          <button type="button" className="ivoice__talk" onClick={pushToTalk} disabled={phase === "listening" || phase === "thinking"}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
              <path d="M19 11a7 7 0 0 1-14 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 18v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {phase === "listening" ? "Слушаю…" : "Сказать"}
          </button>
        </div>
      </div>
      }

      {phase === "ended" &&
      <div className="callend" style={{ padding: "17px" }}>
          {/* Запись приветствия. Когда появится файл assets/savvy-greeting.mp3,
          задайте src ниже — плеер автоматически проиграет его вместо синтеза речи. */}
          <audio ref={greetRef} preload="none" />
          <div className="callend__head">
            <span className="callend__avatar callend__avatar--brand" aria-hidden="true">
              <window.SuvvyMark size={20} color="#fff" />
            </span>
            <div>
              <div className="callend__title">Послушайте голос Cавви</div>
              <div className="callend__sub">Запись приветствия — так Cавви общается с вашими клиентами</div>
            </div>
          </div>

          <div className="audioplayer">
            <button type="button" className="audioplayer__play" onClick={playGreeting} aria-label={playing ? "Остановить" : "Прослушать"}>
              {playing ?
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg> :
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>}
            </button>
            <span className={`audioplayer__wave ${playing ? "is-playing" : ""}`} aria-hidden="true">
              {Array.from({ length: 32 }).map((_, i) => <i key={i} />)}
            </span>
            <span className="audioplayer__time">00:00:09</span>
          </div>
        </div>
      }
    </div>);

}

function Solutions() {
  return (
    <section className="solutions-section">
      <div className="solutions container" style={{ paddingInline: 0, maxWidth: "1200px" }}>
        <a href="#" className="hero__bonus reveal" style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "6px", height: "30px", padding: "4px 18px 6px", fontSize: "13px", marginBottom: 0 }}>
          5$ приветственный бонус на вашем аккаунте
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M6 4l4 4-4 4" />
          </svg>
        </a>

        <h2 className="solutions__title reveal" style={{ fontSize: "34px", fontWeight: "500" }}>Решения для автоматизации звонков и чатов</h2>

        <div className="solutions__grid">
          <SolutionCard
            tone="chat"
            icon="assets/icons/sol-chat.svg"
            title="Чат-бот"
            desc="Общается с клиентами в чатах и на сайте: консультирует, помогает выбрать продукт и доводит до заявки или покупки 24/7">
            
            <InteractiveChat />
          </SolutionCard>

          <SolutionCard
            tone="voice"
            icon="assets/icons/sol-voice.svg"
            title="Голосовой бот"
            desc="Cавви обрабатывает звонки без участия оператора: выявляет потребности, отвечает на типовые вопросы и доводит клиента до целевого действия">
            
            <InteractiveVoice />
          </SolutionCard>
        </div>
      </div>
    </section>);

}

window.Solutions = Solutions;