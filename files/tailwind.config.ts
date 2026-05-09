import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        // Core brand
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Cyberpunk neon
        neon: {
          cyan:    "#00fff2",
          blue:    "#0ea5e9",
          violet:  "#8b5cf6",
          pink:    "#ec4899",
          green:   "#10b981",
          yellow:  "#f59e0b",
        },
        // Dark backgrounds
        dark: {
          950: "#020408",
          900: "#050a14",
          850: "#070d1a",
          800: "#0d1525",
          750: "#101c2e",
          700: "#111827",
          600: "#1e2a3a",
          500: "#263040",
        },
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand":    "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
        "gradient-cyber":    "linear-gradient(135deg, #00fff2 0%, #0ea5e9 50%, #8b5cf6 100%)",
        "gradient-dark":     "linear-gradient(180deg, #050a14 0%, #0d1525 100%)",
        "noise":             "url('/noise.svg')",
      },
      boxShadow: {
        "neon-blue":   "0 0 20px rgba(14,165,233,0.4), 0 0 60px rgba(14,165,233,0.15)",
        "neon-violet": "0 0 20px rgba(139,92,246,0.4), 0 0 60px rgba(139,92,246,0.15)",
        "neon-cyan":   "0 0 20px rgba(0,255,242,0.4), 0 0 60px rgba(0,255,242,0.1)",
        "glass":       "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glass-lg":    "0 25px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
        "card":        "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":  "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(14,165,233,0.1)",
      },
      animation: {
        "spin-slow":       "spin 8s linear infinite",
        "float":           "float 6s ease-in-out infinite",
        "float-delayed":   "float 6s ease-in-out infinite 2s",
        "pulse-glow":      "pulseGlow 3s ease-in-out infinite",
        "shimmer":         "shimmer 2.5s linear infinite",
        "border-glow":     "borderGlow 3s ease-in-out infinite",
        "scan-line":       "scanLine 4s linear infinite",
        "cursor-blink":    "cursorBlink 1s step-end infinite",
        "gradient-shift":  "gradientShift 8s ease infinite",
        "matrix-rain":     "matrixRain 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(14,165,233,0.3)" },
          "50%":      { opacity: "0.8", boxShadow: "0 0 40px rgba(14,165,233,0.6), 0 0 80px rgba(14,165,233,0.2)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(14,165,233,0.3)" },
          "50%":      { borderColor: "rgba(139,92,246,0.6)" },
        },
        scanLine: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        matrixRain: {
          "0%":   { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
        "2000": "2000ms",
      },
    },
  },
  plugins: [],
};

export default config;
