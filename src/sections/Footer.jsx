// ─────────────────────────────────────────────────
// Footer — тёмный навигационный подвал (по структуре suvvy.ai)
// Лого + описание + контакты/соцсети слева, колонки ссылок справа,
// нижняя полоса: копирайт + юридические ссылки.
// ─────────────────────────────────────────────────

function Footer() {
  const all = window.SUVVY_DATA.footerCols;
  const order = ["Решения", "Возможности платформы", "Интеграторам"];
  const cols = order.map((t) => all.find((c) => c.title === t)).filter(Boolean);
  return (
    <footer className="ft">
      <div className="ft__inner">
        <div className="ft__top">
          <div className="ft__brand">
            <img className="ft__logo" src="assets/logo-suvvy-full.svg" alt="Cавви" width="118" height="30" />
            <div className="ft__contacts">
              <a href="tel:+74952314200">+7 (495) 231-42-00</a>
              <a href="mailto:info@suvvy.ai">info@suvvy.ai</a>
            </div>
            <a href="#" className="ft__support">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><rect x="2.5" y="13" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" /><rect x="17.5" y="13" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" /><path d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              Поддержка
              <span className="ft__support-dot" aria-hidden="true"></span>
            </a>
          </div>

          <div className="ft__cols">
            {cols.map((col) =>
            <div className="ft__col" key={col.title}>
              <h4 className="ft__coltitle">{col.title}</h4>
              <ul>
                {col.links.map((l) =>
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
                )}
              </ul>
            </div>
            )}
          </div>
        </div>

        <div className="ft__bottom">
          <span className="ft__copy">© 2026 ООО «СаввиЭйАй» · Все права защищены</span>
          <a href="#" className="ft__policy">Политика обработки персональных данных</a>
        </div>
      </div>
    </footer>);

}

window.Footer = Footer;