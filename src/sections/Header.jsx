// ─────────────────────────────────────────────────
// Header — переделан под референс suvvy.ai
// • Лого "Cавви" слева
// • Меню по центру (Решения, Возможности, Интеграторам, Прайс, Контакты)
// • Справа: RU (ссылка) + Регистрация (light pill) + Войти (фиолетовый CTA)
// ─────────────────────────────────────────────────

function Header() {
  const { useState, useEffect } = React;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const nav = window.SUVVY_DATA.nav;
  const solutionsMenu = window.SUVVY_DATA.solutionsMenu;
  const integratorsMenu = window.SUVVY_DATA.integratorsMenu;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.body.style.overflow = "";};
  }, [open]);

  return (
    <React.Fragment>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} id="top" style={{ height: "86px" }}>
      <div className="container site-header__row" style={{ height: "84px", paddingInline: 0, maxWidth: "1200px" }}>
        <a href="Suvvy Landing.html#top" className="suvvy-logo">
          <img src="assets/logo-suvvy-full.svg" alt="Cавви" width="100" height="25" style={{ display: "block" }} />
        </a>

        <nav className="site-nav" aria-label="Основная навигация">
          {nav.map((item) =>
          item.menu === "solutions" ?
          <div
            key={item.href}
            className={`site-nav__item has-menu ${openMenu === "solutions" ? "is-open" : ""}`}
            onMouseEnter={() => setOpenMenu("solutions")}
            onMouseLeave={() => setOpenMenu(null)}>
            <a href={item.href} className="site-nav__link site-nav__link--caret">
              {item.label}
              <svg className="site-nav__caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </a>
            <div className="nav-menu" role="menu">
              <div className="nav-menu__panel">
                {solutionsMenu.map((s) =>
                <a key={s.title} href={s.href} className="nav-menu__item" role="menuitem" onClick={() => setOpenMenu(null)} style={{ borderRadius: "12px" }}>
                  <div className="nav-menu__head">
                    <img className="nav-menu__icon" src={s.icon} alt="" />
                    <div className="nav-menu__title">{s.title}</div>
                  </div>
                  <div className="nav-menu__text">{s.text}</div>
                </a>
                )}
              </div>
            </div>
          </div> :
          item.menu === "integrators" ?
          <div
            key={item.href}
            className={`site-nav__item has-menu ${openMenu === "integrators" ? "is-open" : ""}`}
            onMouseEnter={() => setOpenMenu("integrators")}
            onMouseLeave={() => setOpenMenu(null)}>
            <a href={item.href} className="site-nav__link site-nav__link--caret">
              {item.label}
              <svg className="site-nav__caret" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6l4 4 4-4" />
              </svg>
            </a>
            <div className="nav-menu nav-menu--wide" role="menu">
              <div className="nav-wide">
                <div className="nav-wide__col">
                  <span className="nav-wide__eyebrow">{integratorsMenu.title}</span>
                  <div className="nav-wide__links">
                    {integratorsMenu.links.map((l) =>
                    <a key={l.label} href={l.href} className="nav-wide__link" role="menuitem" onClick={() => setOpenMenu(null)}>{l.label}</a>
                    )}
                  </div>
                </div>
                <div className="nav-wide__contacts">
                  <a href={`tel:${integratorsMenu.phone.replace(/[^+\d]/g, "")}`} className="nav-wide__contact">
                    <span className="nav-wide__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
                    {integratorsMenu.phone}
                  </a>
                  <a href={`mailto:${integratorsMenu.email}`} className="nav-wide__contact">
                    <span className="nav-wide__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    {integratorsMenu.email}
                  </a>
                </div>
              </div>
            </div>
          </div> :
          <a key={item.href} href={item.href} className="site-nav__link">{item.label}</a>
          )}
        </nav>

        <div className="site-header__actions">
          <a href="#" className="lang-link" aria-label="Язык: русский" style={{ color: "#3B3DD4", fontWeight: "600", fontSize: "13px" }}>RU</a>
          <a href="#" className="btn btn-soft btn-sm" style={{ backgroundColor: "#DDE9F6", color: "#3B3DD4", height: "42px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", border: "none", padding: "0px 16px" }}>Регистрация</a>
          <a href="#" className="btn btn-accent-solid btn-sm" style={{ backgroundColor: "#3B3DD4", color: "#fff", height: "42px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", gap: "10px", padding: "0px 16px" }}>
            Войти
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </a>
          <button
            type="button"
            className="site-header__burger"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}>
            
            <window.Icons.menu size={22} />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer — вне <header>, чтобы backdrop-filter шапки
          не превращался в containing block для position:fixed */}
      <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-drawer__inner">
          <div className="mobile-drawer__head">
            <a href="#top" className="suvvy-logo" onClick={() => setOpen(false)}>
              <window.SuvvyMark size={24} color="var(--suvvy-ink-900)" />
              <span className="suvvy-logo__wordmark">Cавви</span>
            </a>
            <button type="button" aria-label="Закрыть" onClick={() => setOpen(false)} className="mobile-drawer__close">
              <window.Icons.close size={22} />
            </button>
          </div>
          <nav className="mobile-drawer__nav">
            {nav.map((item) =>
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            )}
          </nav>
          <div className="mobile-drawer__actions">
            <a href="#" className="btn btn-soft w-full">Регистрация</a>
            <a href="#" className="btn btn-accent-solid w-full">Войти <window.Icons.arrow size={14} /></a>
          </div>
        </div>
      </div>
    </React.Fragment>);

}

window.Header = Header;