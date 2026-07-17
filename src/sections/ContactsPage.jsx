// ─────────────────────────────────────────────────
// ContactsPage — страница «Контакты» (шапка/подвал с главной, 1:1 по референсу)
// ─────────────────────────────────────────────────

function ContactInfo() {
  const depts = [
    { name: "Тех. поддержка", phone: "+7 (495) 231-42-00 доб. «1»", email: "support@suvvy.ai" },
    { name: "Отдел продаж", phone: "+7 (495) 231-42-00 доб. «2»", email: "Info@suvvu.ai" },
    { name: "Фин. отдел", phone: "+7 (495) 231-42-00 доб. «3»", email: "finance@suvvy.ai" },
  ];
  return (
    <div className="cinfo">
      <aside className="cinfo__card cinfo__card--main">
        <ul className="cinfo__list">
          <li>
            <span className="cinfo__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
            </span>
            <a href="tel:+74952314200">+7 (495) 231-42-00</a>
          </li>
          <li>
            <span className="cinfo__ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>
            </span>
            <span>г. Санкт-Петербург, БЦ "Каскад", ул. Мельничная 18, пом. 7-Н</span>
          </li>
        </ul>
        <a href="#" className="btn btn-accent-solid cinfo__cta">
          Обратная связь
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </aside>

      <div className="cinfo__card cinfo__depts">
        {depts.map((d) =>
        <div className="cdept" key={d.name}>
          <h3 className="cdept__name">{d.name}</h3>
          <p className="cdept__phone">{d.phone}</p>
          <a className="cdept__email" href={`mailto:${d.email}`}>{d.email}</a>
          <p className="cdept__hours">пн-пт 9:00-18:00</p>
        </div>
        )}
      </div>
    </div>);

}

function ContactsPage() {
  return (
    <React.Fragment>
      <window.Header />
      <main className="cpage">
        <div className="cpage__inner">
          <nav className="cpage__crumbs" aria-label="Хлебные крошки">
            <a href="Suvvy Landing.html">Главная</a>
            <span aria-hidden="true">/</span>
            <span className="is-current">Контакты</span>
          </nav>
          <h1 className="cpage__title">Контакты</h1>
          <p className="cpage__lead">
            По всем вопросам вы можете обращаться по телефону, либо по электронной почте компании ООО «СаввиЭйАй»
          </p>
        </div>

        <window.Contact />

        <div className="cpage__inner">
          <ContactInfo />
        </div>

        <div className="cpage__inner">
          <div className="cmap">
            <iframe
              className="cmap__frame"
              title="Карта — БЦ Каскад, ул. Мельничная 18"
              src="https://yandex.ru/map-widget/v1/?ll=30.365000%2C59.907800&z=15&pt=30.365000,59.907800,pm2rdm"
              loading="lazy"
              allowFullScreen>
            </iframe>
            <div className="cmap__pin">
              <span className="cmap__pin-mark"><window.SuvvyMark size={18} color="var(--suvvy-ink-900)" /></span>
              <span className="cmap__pin-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" fill="var(--suvvy-ink-900)"/><circle cx="12" cy="10" r="2.4" fill="#fff"/></svg>
              </span>
              <span className="cmap__pin-text">г. Санкт Петербург, БЦ “Каскад”,<br />ул. Мельничная 18, пом. 7-Н</span>
            </div>
          </div>

          <section className="creq">
            <h2 className="creq__title">Реквизиты компании ООО «СаввиЭйАй»</h2>
            <div className="creq__grid">
              <dl className="creq__col">
                <div><dt>Наименование организации:</dt><dd>ООО «СаввиЭйАй»</dd></div>
                <div><dt>Генеральный директор:</dt><dd>Семенов Олег Александрович</dd></div>
                <div><dt>Юридический адрес:</dt><dd>192019, г. Санкт-Петербург, ул. Мельничная, д. 18, литер А, пом. 7-Н</dd></div>
                <div><dt>Почтовый адрес:</dt><dd>192019, г. Санкт-Петербург, ул. Мельничная, д. 18, литер А, пом. 7-Н</dd></div>
              </dl>
              <dl className="creq__col">
                <div><dt>Расчетный счет:</dt><dd>40702810610002000041</dd></div>
                <div><dt>Банк:</dt><dd>АО "ТБанк"</dd></div>
                <div><dt>БИК:</dt><dd>044525974</dd></div>
                <div><dt>Корреспондентский счет:</dt><dd>30101810145250000974</dd></div>
                <div><dt>ИНН:</dt><dd>7811811919</dd></div>
                <div><dt>КПП:</dt><dd>781101001</dd></div>
                <div><dt>ОГРН:</dt><dd>1257800098600</dd></div>
              </dl>
            </div>
          </section>
        </div>
      </main>
      <window.Footer />
    </React.Fragment>);

}

window.ContactsPage = ContactsPage;
