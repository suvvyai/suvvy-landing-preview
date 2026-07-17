// ─────────────────────────────────────────────────
// Root App — composes all sections.
// Each section reads from window.SUVVY_DATA (src/data.js)
// so content edits don't touch markup.
// ─────────────────────────────────────────────────

function App() {
  const {
    Header, Hero, Benefits, Solutions, Channels, KeyFunctions, Capabilities,
    AdditionalFunctions, HowItWorks, Scenarios, Setup, Cases, Testimonial, Testimonial2,
    Pricing, Security, Contact, Footer,
  } = window;

  // Reveal-on-scroll (robust: reveals in-viewport elements immediately,
  // and has a load fallback so content never gets stuck hidden)
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const reveal = (el) => el.classList.add("is-visible");

    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    els.forEach((el) => {
      // Anything already within the viewport on load is shown right away.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    // Safety net: if anything is still hidden shortly after load, show it.
    const t = setTimeout(() => els.forEach(reveal), 1200);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Solutions />
        <Channels />
        <KeyFunctions />
        <Capabilities />
        <AdditionalFunctions />
        <HowItWorks />
        <Cases />
        <Testimonial />
        <Pricing />
        <Setup />
        <Scenarios />
        <Testimonial2 />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
