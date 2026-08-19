import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1A1A",
        "deep-brown": "#473237",
        "warm-sage": "#BEB7A7",
        bone: "#E8E2D4",
        "off-white": "#F5F0E6",
      },
      fontFamily: {
        display: ["var(--font-instrument)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.33, 0, 0.2, 1)",
      },
      letterSpacing: {
        label: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
