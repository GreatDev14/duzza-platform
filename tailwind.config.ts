import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: {
          50: "#F0F7FF",
          100: "#E0EFFF",
          200: "#BAE0FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0284C7",
          600: "#0052FF",
          700: "#0041CC",
          800: "#08338F",
          900: "#0A2558",
          950: "#06122C",
        },
        navy: {
          800: "#1E293B",
          900: "#0F172A",
          950: "#0A1120",
        },
        seaTurquoise: "#00C2CB",
        seaBlue: "#0077B6",
        sand: "#F5EBE1",
        theme: {
          bg: "#FFFFFF",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          cardHover: "#F1F5F9",
          border: "#E2E8F0",
          borderHover: "#CBD5E1",
        },
        gold: {
          light: "#FDE68A",
          DEFAULT: "#D97706",
          dark: "#B45309",
        },
        projects: {
          slate: "#F8FAFC",
          orange: "#EA580C",
          orangeGlow: "#F97316",
          cyan: "#0284C7",
        },
        branding: {
          obsidian: "#0F172A",
          lime: "#65A30D",
          limeGlow: "#84CC16",
          emerald: "#059669",
        },
        fashion: {
          burgundy: "#9F1239",
          rose: "#F43F5E",
          champagne: "#FFF1F2",
        },
        bakery: {
          espresso: "#451A03",
          amber: "#D97706",
          honey: "#B45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-glow": "radial-gradient(circle at 50% 30%, rgba(0, 82, 255, 0.08) 0%, transparent 60%)",
        "ocean-pattern": "linear-gradient(180deg, #E0F2FE 0%, #FFFFFF 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "water-ripple": "water-ripple 8s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "water-ripple": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.03) rotate(0.5deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
