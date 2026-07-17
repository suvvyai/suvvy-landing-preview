// ─────────────────────────────────────────────────
// Security — 152-ФЗ, шифрование, локальные ДЦ.
// Dark panel — uses ink background.
// ─────────────────────────────────────────────────

function Security() {
  const points = [
    { title: "Шифрование на лету", desc: "Имена, телефоны и e-mail маскируются и шифруются до отправки в LLM. Модель работает только с обезличенными данными." },
    { title: "Хранение в РФ",       desc: "Данные размещаются в локальных дата-центрах и соответствуют требованиям 152-ФЗ." },
    { title: "Полная анонимность",  desc: "LLM получает только обезличенные запросы — без возможности идентификации пользователя." },
  ];

  return (
    <section className="section security">
      <div className="container">
        <div className="security__panel reveal">
          <div className="security__head">
            <span className="eyebrow security__eyebrow">
              <window.Icons.shield size={14} color="var(--suvvy-success-600)" />
              100% безопасность
            </span>
            <h2 className="h1 mt-6" style={{ color: "#fff" }}>
              Используйте ИИ без компромиссов — мощность LLM, безопасность ваших данных
            </h2>
            <p className="lead mt-6" style={{ color: "rgba(255,255,255,0.7)", maxWidth: 720 }}>
              Савви не передаёт в LLM-модель ни имён, ни телефонов, ни e-mail.
              Все чувствительные поля автоматически маскируются и шифруются до отправки.
            </p>
          </div>

          <div className="security__grid mt-10">
            {points.map(pt => (
              <div className="security__card" key={pt.title}>
                <div className="security__icon">
                  <window.Icons.shield size={18} />
                </div>
                <h3 className="h3" style={{ color: "#fff", fontSize: 17 }}>{pt.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5 }}>{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Security = Security;
