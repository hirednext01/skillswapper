import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep navy ink — primary text
        ink: {
          DEFAULT: "#0E1230",
          soft: "#3D4368",
          faint: "#787E9E",
        },
        // Electric violet — primary accent
        violet: {
          50: "#F3F1FF",
          100: "#E9E5FF",
          200: "#D5CCFF",
          300: "#B6A5FF",
          400: "#9375FF",
          500: "#7C4DFF",
          600: "#6A2FF5",
          700: "#5B21D6",
          800: "#4A1CAD",
          900: "#3D1A8A",
        },
        // Coral/orange — secondary accent
        coral: {
          50: "#FFF3EE",
          100: "#FFE4D8",
          200: "#FFC7AF",
          300: "#FFA37D",
          400: "#FF7A47",
          500: "#FF5C1F",
          600: "#F04408",
          700: "#C73508",
          800: "#9E2C0E",
          900: "#7F280F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F7F7FB",
          sunken: "#EFEFF6",
          line: "#E5E5EF",
        },
        mint: {
          100: "#D9F7EA",
          500: "#0FA968",
          700: "#0A7A4C",
        },
        gold: {
          100: "#FFF4D6",
          500: "#E8A912",
          700: "#B07E06",
        },
      },
      fontFamily: {
        sans: [
          "InterVariable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,18,48,0.04), 0 8px 24px -12px rgba(14,18,48,0.12)",
        "card-hover":
          "0 2px 4px rgba(14,18,48,0.06), 0 16px 40px -12px rgba(14,18,48,0.18)",
        pop: "0 24px 64px -16px rgba(92,46,246,0.35)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
