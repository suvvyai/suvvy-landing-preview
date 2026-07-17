// ─────────────────────────────────────────────────
// Reusable inline SVG icons — Lucide-style line set
// in the Suvvy navy. Keep stroke 1.6, rounded caps.
// ─────────────────────────────────────────────────

const Ico = (paths, viewBox = "0 0 24 24") => ({ size = 22, color = "currentColor", strokeWidth = 1.6, ...rest } = {}) =>
  React.createElement("svg", {
    width: size,
    height: size,
    viewBox,
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...rest,
  }, paths.map((el, i) => React.cloneElement(el, { key: i })));

const p = (d, extra = {}) => React.createElement("path", { d, ...extra });
const c = (cx, cy, r, extra = {}) => React.createElement("circle", { cx, cy, r, ...extra });
const r = (x, y, w, h, extra = {}) => React.createElement("rect", { x, y, width: w, height: h, ...extra });

window.Icons = {
  // Hero benefits
  brain:   Ico([ p("M12 5a3 3 0 0 0-3 3 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3 3 3 0 0 0 3 3"), p("M12 5a3 3 0 0 1 3 3 3 3 0 0 1 3 3v2a3 3 0 0 1-3 3 3 3 0 0 1-3 3"), p("M12 5v14") ]),
  clock:   Ico([ c(12, 12, 9), p("M12 7v5l3 2") ]),
  target:  Ico([ c(12, 12, 9), c(12, 12, 5), c(12, 12, 1.5, { fill: "currentColor" }) ]),

  // Channels & extras
  chat:    Ico([ p("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z") ]),
  bolt:    Ico([ p("M13 2 3 14h7l-1 8 10-12h-7l1-8z") ]),
  shield:  Ico([ p("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z") ]),
  arrow:   Ico([ p("M5 12h14"), p("M13 6l6 6-6 6") ]),
  play:    Ico([ p("M8 5v14l11-7z", { fill: "currentColor", stroke: "none" }) ]),
  sparkle: Ico([ p("M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1") ]),
  check:   Ico([ p("M20 6 9 17l-5-5") ]),
  menu:    Ico([ p("M4 6h16M4 12h16M4 18h16") ]),
  close:   Ico([ p("M18 6 6 18M6 6l12 12") ]),
  globe:   Ico([ c(12, 12, 9), p("M3 12h18"), p("M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z") ]),

  // Key functions / extras
  book:    Ico([ p("M4 19.5A2.5 2.5 0 0 1 6.5 17H20"), p("M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z") ]),
  prompt:  Ico([ r(3, 4, 18, 16, { rx: 2 }), p("M7 9h10M7 13h6") ]),
  inbox:   Ico([ p("M22 12h-6l-2 3h-4l-2-3H2"), p("M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z") ]),
  plug:    Ico([ p("M9 2v6M15 2v6"), p("M5 8h14v4a7 7 0 0 1-14 0V8z"), p("M12 19v3") ]),

  // Extras
  wave:    Ico([ p("M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0") ]),
  send:    Ico([ p("M22 2 11 13"), p("M22 2l-7 20-4-9-9-4 20-7z") ]),
  cal:     Ico([ r(3, 4, 18, 18, { rx: 2 }), p("M16 2v4M8 2v4M3 10h18"), c(8, 15, 1, { fill: "currentColor" }), c(12, 15, 1, { fill: "currentColor" }), c(16, 15, 1, { fill: "currentColor" }) ]),
  human:   Ico([ c(12, 8, 4), p("M4 21a8 8 0 0 1 16 0") ]),
  sheet:   Ico([ r(3, 3, 18, 18, { rx: 2 }), p("M3 9h18M3 15h18M9 3v18M15 3v18") ]),
  branch:  Ico([ c(6, 6, 2), c(18, 6, 2), c(12, 18, 2), p("M6 8v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8"), p("M12 14v2") ]),
  webhook: Ico([ p("M18 16.98h-5.99a3 3 0 1 0-2.83 4"), p("M7.5 13.5 4.62 8.5a3 3 0 1 1 5.2-3"), p("M14 8.5l2.5 4.5a3 3 0 0 1-2.5 4.5") ]),
  mp:      Ico([ p("M3 10 4 4h16l1 6"), p("M3 10v10h18V10"), p("M9 14h6") ]),

  // Footer / contact
  mail:    Ico([ r(2, 4, 20, 16, { rx: 2 }), p("M22 6 12 13 2 6") ]),
  phone:   Ico([ p("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z") ]),
  tg:      Ico([ p("M22 3 2 11l6 2 2 6 4-4 6 4 2-16z") ]),
  wa:      Ico([ p("M21 12a9 9 0 1 1-3.5-7.1L21 4l-.9 3.5A9 9 0 0 1 21 12z"), p("M8 11a4 4 0 0 0 5 5l2-1-2-2-1 .5a2 2 0 0 1-2-2L11 10l-2-2-1 2z", { fill: "currentColor", stroke: "none" }) ]),
};

// Brand mark used inside chips/buttons
window.SuvvyMark = function SuvvyMark({ size = 24, color = "currentColor" }) {
  return React.createElement("svg", {
    width: size, height: size * (24/21.176), viewBox: "0 0 21.176 24", fill: color, "aria-hidden": true
  }, [
    React.createElement("path", { key: 1, d: "M 12.147 23.772 C 9.852 23.772 7.773 23.266 5.911 22.253 C 4.071 21.219 2.62 19.799 1.559 17.994 C 0.52 16.189 0 14.153 0 11.886 C 0 9.619 0.53 7.583 1.591 5.778 C 2.652 3.973 4.103 2.564 5.944 1.552 C 7.806 0.517 9.885 0 12.18 0 C 14.042 0 15.742 0.33 17.279 0.991 C 18.816 1.651 20.115 2.608 21.176 3.863 C 19.673 5.3 17.323 5.077 15.4 4.316 C 14.469 3.948 13.46 3.764 12.375 3.764 C 10.816 3.764 9.419 4.116 8.185 4.82 C 6.951 5.503 5.987 6.46 5.294 7.693 C 4.601 8.926 4.255 10.323 4.255 11.886 C 4.255 13.449 4.601 14.847 5.294 16.079 C 5.987 17.312 6.951 18.28 8.185 18.985 C 9.419 19.667 10.816 20.008 12.375 20.008 C 13.19 20.008 13.961 19.903 14.69 19.693 C 16.727 19.104 19.399 19.499 20.24 21.475 L 20.934 23.104 C 21.082 23.452 21.036 23.933 20.668 23.991 C 19.705 24.144 18.565 22.223 17.246 22.782 C 15.709 23.442 14.009 23.772 12.147 23.772 Z" }),
    React.createElement("path", { key: 2, d: "M 12.045 12.829 C 12.045 14.591 10.856 13.799 9.391 13.799 C 7.925 13.799 6.737 14.591 6.737 12.829 C 6.737 11.067 7.925 9.639 9.391 9.639 C 10.856 9.639 12.045 11.067 12.045 12.829 Z" }),
    React.createElement("path", { key: 3, d: "M 19.19 12.886 C 19.19 14.679 18.001 13.881 16.536 13.881 C 15.07 13.881 13.882 14.679 13.882 12.886 C 13.882 11.093 15.07 9.639 16.536 9.639 C 18.001 9.639 19.19 11.093 19.19 12.886 Z" }),
  ]);
};

// Suvvy wordmark — "Савви" set in Inter SemiBold with the brand mark
window.SuvvyLogo = function SuvvyLogo({ size = 22 }) {
  return React.createElement("a", {
    href: "#top",
    className: "suvvy-logo",
    style: { display: "inline-flex", alignItems: "center", gap: 10, color: "var(--suvvy-ink-900)" }
  }, [
    React.createElement(SuvvyMark, { key: 1, size: size, color: "var(--suvvy-ink-900)" }),
    React.createElement("span", {
      key: 2,
      style: { fontWeight: 700, fontSize: size * 0.95, letterSpacing: "-0.01em" }
    }, "Савви"),
  ]);
};
