// ─────────────────────────────────────────────────
// Channel brand glyphs — colored circles with brand-mark inside.
// Approximations of real logos at small scale.
// Each component returns ONLY the inner content; the colored
// background is applied via the .sol-channel CSS wrapper.
// ─────────────────────────────────────────────────

const ChCircle = ({ children, bg, fg = "#fff", style }) => (
  <div className="sol-channel" style={{ background: bg, color: fg, ...style }}>
    {children}
  </div>
);

window.ChannelMarks = {
  Kommo: () => (
    <ChCircle bg="#0E1E4F">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M5 19V5h2.4l4.4 6.6L16.2 5h2.4v14h-2.4v-9.4l-3.6 5.4h-1l-3.6-5.4V19H5z"/>
      </svg>
    </ChCircle>
  ),

  Telegram: () => (
    <ChCircle bg="#27A7E5">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.5 4.2 3.3 10.8c-.9.4-.9 1 0 1.3l4.3 1.3 1.6 5c.2.6.4.8.8.8.4 0 .6-.2 1-.5l2.4-2.3 4.5 3.3c.8.5 1.4.2 1.6-.8L21.8 5.3c.3-1.2-.4-1.7-1.3-1.1z" fill="#fff"/>
        <path d="m10 14 7.5-7-9.4 8.5L10 14z" fill="#cfe8f5"/>
      </svg>
    </ChCircle>
  ),

  WhatsApp: () => (
    <ChCircle bg="#25D366">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12 2.5C6.8 2.5 2.5 6.8 2.5 12c0 1.8.5 3.5 1.4 5L2.5 21.5l4.6-1.4c1.4.8 3.1 1.2 4.9 1.2 5.2 0 9.5-4.3 9.5-9.5S17.2 2.5 12 2.5zm5.1 12.9c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.3.7.9 2.3.9 2.5.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.3.4-.4.5-.2.2-.3.4-.1.7.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.1.5.2.6.3.1.3.1.8-.1 1.5z"/>
      </svg>
    </ChCircle>
  ),

  amoCRM: () => (
    <ChCircle bg="#43AFE8">
      <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em", fontStyle: "italic" }}>amo</span>
    </ChCircle>
  ),

  Bitrix24: () => (
    <ChCircle bg="#8FCDE6" fg="#0E1E4F">
      <span style={{ fontWeight: 800, fontSize: 11, letterSpacing: "-0.02em" }}>
        Bitrix<sup style={{ fontSize: 7 }}>24</sup>
      </span>
    </ChCircle>
  ),

  Wildberries: () => (
    <ChCircle bg="#CB11AB">
      <span style={{ fontWeight: 800, fontSize: 12, fontStyle: "italic" }}>WB</span>
    </ChCircle>
  ),

  YandexMarket: () => (
    <ChCircle bg="#FFCC00" fg="#000">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.4" aria-hidden="true">
        <path d="M7 8l5 9 5-9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </ChCircle>
  ),

  Ozon: () => (
    <ChCircle bg="linear-gradient(135deg, #DF2B2B 0%, #DF2B2B 50%, #1856E2 50%, #1856E2 100%)">
      <span style={{ fontWeight: 800, fontSize: 10, letterSpacing: "-0.04em" }}>ozon</span>
    </ChCircle>
  ),

  Jivo: () => (
    <ChCircle bg="#FFFFFF" fg="#0E78D2" style={{ border: "1px solid var(--suvvy-border-soft)" }}>
      <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: "-0.01em" }}>jivo</span>
    </ChCircle>
  ),

  Mango: () => (
    <ChCircle bg="#E74C3C">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M12 4c4 0 7 3 7 7 0 5-4 9-7 9-3 0-7-4-7-9 0-4 3-7 7-7zm-2 6c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3z"/>
      </svg>
    </ChCircle>
  ),

  Planfix: () => (
    <ChCircle bg="#27AE60">
      <span style={{ fontWeight: 800, fontSize: 14, fontStyle: "italic" }}>F</span>
    </ChCircle>
  ),

  YandexHelp: () => (
    <ChCircle bg="#E53935">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2.5" fill="#fff" />
        <path d="M12 5v3M12 16v3M5 12h3M16 12h3" strokeLinecap="round"/>
      </svg>
    </ChCircle>
  ),
};
