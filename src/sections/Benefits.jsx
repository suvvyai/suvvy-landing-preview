// ─────────────────────────────────────────────────
// Benefits — три тезиса прямо под hero (1:1 с suvvy.ai).
// Белый фон, три равные колонки, разделённые тонкими
// вертикальными линиями. Иконка + заголовок (2 строки) + описание.
// ─────────────────────────────────────────────────

function Benefits() {
  const items = [
  {
    icon: "assets/icons/benefit-llm.svg",
    title: "Cавви работает на базе\nнадёжных LLM",
    desc:
    <>Боты легко адаптируются к любым сценариям диалога. Только 1 из 600
        человек понимает, что с ним общается бот</>

  },
  {
    icon: "assets/icons/benefit-100.svg",
    title: "Cавви отвечает на 100%\nобращений",
    desc: <>Боты онлайн 24/7, без выходных и праздников</>
  },
  {
    icon: "assets/icons/benefit-accuracy.svg",
    title: "Точность ответов\nCавви от 95%",
    desc:
    <>Уникальная методика <span className="benefit__accent">Smart Bot Network</span> позволяет
        Cавви качественно улучшить общение с клиентами</>

  }];


  return (
    <section className="benefits-section">
      <div className="benefits container">
        {items.map((it) =>
        <article className="benefit reveal" key={it.title}>
            <img className="benefit__icon" src={it.icon} alt="" aria-hidden="true" width="20" height="20" />
            <h3 className="benefit__title">{it.title}</h3>
            <p className="benefit__desc">{it.desc}</p>
          </article>
        )}
      </div>
    </section>);

}

window.Benefits = Benefits;