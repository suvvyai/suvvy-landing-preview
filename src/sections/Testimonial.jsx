// ─────────────────────────────────────────────────
// Testimonial — «Разработка чат-ботов для бизнеса»
// Отзыв фаундера: слева аватар + имя + лого, справа цитата.
// Ширина контента 1200px, карточка высотой ~178px.
// ─────────────────────────────────────────────────

function Testimonial() {
  return (
    <section id="testimonial" className="tm" style={{ padding: "100px 0px" }}>
      <div className="tm__inner">
        <div className="tm__card" style={{ borderRadius: "14px", padding: "26px 40px 42px" }}>
          <h2 className="tm__title" style={{ fontWeight: "500", fontSize: "26px" }}>Разработка чат-ботов для бизнеса</h2>
          <div className="tm__row">
            <div className="tm__person">
              <img className="tm__avatar" src="assets/anton-avatar.jpg" alt="Anton Besshchetnikov" width="70" height="70" />
              <div className="tm__person-info" style={{ textAlign: "left", flexDirection: "column" }}>
                <div className="tm__name">Anton Besshchetnikov</div>
                <div className="tm__role" style={{ color: "rgb(99, 113, 128)" }}>Фаундер Cавви</div>
                <img className="tm__logo" src="assets/logo-suvvy-full.svg" alt="Cавви" width="96" height="24" />
              </div>
            </div>

            <div className="tm__quote">
              <span className="tm__mark" aria-hidden="true" style={{ color: "rgb(99, 113, 128)" }}>“</span>
              <p className="tm__text" style={{ color: "rgb(99, 113, 128)" }}>
                Клиенты выбирают Cавви за точность и качество ответов: платформа предлагает обширный инструментарий для решения сложных задач по внедрению на любом уровне, а также позволяет снизить расходы на ФОТ вплоть до двухкратного размера
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

window.Testimonial = Testimonial;