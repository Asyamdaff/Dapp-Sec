import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0b0e",
        charcoal: "#111318",
        navy: "#0b1424",
        accent: "#7dd3fc",
        accentDeep: "#38bdf8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-100%)" },
          "60%, 100%": { transform: "translateY(200%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
