import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1B1B18",
        "ink-soft": "#2B2A25",
        bone: "#FAF7EF",
        paper: "#F3EEE0",
        sand: "#E7DFC6",
        "sand-dark": "#D8CCA6",
        sage: "#74836A",
        "sage-light": "#A9B79A",
        "sage-dark": "#4B5940",
        clay: "#A8522E",
        "clay-light": "#C97952",
        moss: "#23281F",
        "moss-soft": "#2F362A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        tag: ["var(--font-tag)", "monospace"],
      },
      borderRadius: {
        tag: "2px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,27,24,0.06), 0 8px 24px -12px rgba(27,27,24,0.18)",
        lift: "0 12px 32px -12px rgba(27,27,24,0.28)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        swing: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        swing: "swing 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
