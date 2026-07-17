// ─────────────────────────────────────────────────
// Testimonial2 — второй отзыв (идентичен .tm по стилям).
// Николай Кудрин, COO, SmartMental. Аватар — заполняемый слот.
// ─────────────────────────────────────────────────

function Testimonial2() {
  return (
    <section id="testimonial-2" className="tm" style={{ padding: "0 0 100px" }}>
      <div className="tm__inner">
        <div className="tm__card" style={{ borderRadius: "14px", padding: "26px 40px 42px" }}>
          <h2 className="tm__title" style={{ fontWeight: "500", fontSize: "25px" }}>Внедрение Cавви сократит расходы на содержание отдела продаж и поддержку клиентов</h2>
          <div className="tm__row">
            <div className="tm__person">
              <img className="tm__avatar" src="assets/nikolay-avatar.png" alt="Николай Кудрин" width="70" height="70" />
              <div className="tm__person-info" style={{ textAlign: "left", flexDirection: "column" }}>
                <div className="tm__name">Николай Кудрин</div>
                <div className="tm__role" style={{ color: "rgb(99, 113, 128)" }}>COO</div>
                <img className="tm__logo" src="assets/logo-smartmental.png" alt="SmartMental" height="24" />
              </div>
            </div>

            <div className="tm__quote">
              <span className="tm__mark" aria-hidden="true" style={{ color: "rgb(99, 113, 128)" }}>“</span>
              <p className="tm__text" style={{ color: "rgb(99, 113, 128)" }}>
                Решение в виде ИИ-ассистента по подбору психологов онлайн позволило сократить расходы на обработку диалогов на 35%. Кроме того, благодаря мгновенным ответам на входящие запросы мы увеличили конверсию в успешную запись на сессию на 5%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Testimonial2 = Testimonial2;