// ─────────────────────────────────────────────────
// Contact — «Хотите узнать больше о Cавви, свяжитесь с нами» (1:1)
// Светлая карточка: метка Cавви + заголовок в 2 строки,
// три синие кнопки (Telegram / WhatsApp / e-mail).
// Справа — декоративные концентрические круги, уходящие за край.
// ─────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="ct">
      <div className="ct__inner">
        <div className="ct__card">
          <span className="ct__rings" aria-hidden="true"></span>
          <div className="ct__body">
            <span className="ct__mark"><window.SuvvyMark size={26} color="var(--suvvy-ink-900)" /></span>
            <h2 className="ct__title">Хотите узнать больше о Cавви,<br />свяжитесь с нами</h2>
            <div className="ct__actions">
              <a href="#" className="ct__btn">
                <span className="ct__btn-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.4 13.2 1.6 11.7c-1-.3-1-1 .2-1.5l18.6-7.2c.9-.3 1.6.2 1.5 1.3z" /></svg>
                </span>
                Написать в Telegram
              </a>
              <a href="#" className="ct__btn">
                <span className="ct__btn-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-5.9c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 5.3 5.3 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" /></svg>
                </span>
                Написать в WhatsApp
              </a>
              <a href="mailto:info@suvvy.ai" className="ct__btn">
                <span className="ct__btn-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" /><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                info@suvvy.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Contact = Contact;