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
        // Prestige Dark Blue & Gilded Champagne Gold Palette
        brandBlue: {
          50: "#091224",  // Deep elevated navy
          100: "#0E1B33", // Sapphire navy card
          200: "#142547", // Interactive navy
          300: "#1B325C", // Crisp navy border
          400: "#254882", // Vivid navy accent
          500: "#0284C7", // Cyan azure
          600: "#D4AF37", // Iconic Glowing Pale Gold (from Gilded Quiet Hours)
          700: "#E5C378", // Champagne Gold
          800: "#E2E8F0", // Slate pearl text
          900: "#F8FAFC", // Crisp white-gold highlight
          950: "#FFFFFF",
        },
        navy: {
          800: "#0E1B33",
          900: "#091224",
          950: "#050B18", // Deepest Midnight Navy
        },
        seaTurquoise: "#00E5FF",
        seaBlue: "#38BDF8",
        sand: "#070E1E",
        theme: {
          bg: "#050B18",        // Deepest Midnight Dark Blue
          surface: "#091224",   // Elevated Navy Surface
          card: "#0E1B33",      // Midnight Navy Card
          cardHover: "#142547", // Interactive Hover
          border: "#1B325C",    // Navy Border
          borderHover: "#D4AF37",// Glowing Gold Border Hover
        },
        gold: {
          light: "#FFF8E7",
          pale: "#F3E5AB",
          DEFAULT: "#D4AF37",   // Glowing Pale Gold
          glow: "#F5D77F",
          dark: "#B88E28",
        },
        azure: {
          light: "#BAE6FD",
          DEFAULT: "#38BDF8",
          glow: "#00E5FF",
          dark: "#0284C7",
        },
        brown: {
          // Re-mapped to harmonized deep navy for backward compatibility
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#334155",
          700: "#1E293B",
          800: "#0E1B33",
          900: "#091224",
          950: "#050B18",
        },
        projects: {
          slate: "#091224",
          orange: "#D4AF37",
          orangeGlow: "#F5D77F",
          cyan: "#38BDF8",
        },
        branding: {
          obsidian: "#050B18",
          lime: "#D4AF37",
          limeGlow: "#00E5FF",
          emerald: "#38BDF8",
        },
        fashion: {
          burgundy: "#0A1329",
          rose: "#E5C378",
          champagne: "#F8FAFC",
        },
        bakery: {
          espresso: "#070E1E",
          amber: "#D4AF37",
          honey: "#E5C378",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-glow": "radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.18) 0%, transparent 65%)",
        "gold-glow": "radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.25) 0%, rgba(14, 27, 51, 0.4) 50%, transparent 75%)",
        "ocean-pattern": "linear-gradient(180deg, #050B18 0%, #0E1B33 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "water-ripple": "water-ripple 8s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "water-ripple": {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "0.4" },
          "100%": { transform: "scale(0.95)", opacity: "0.8" },
        },
      },
      boxShadow: {
        "subtle": "0 2px 10px rgba(0,0,0,0.5)",
        "card": "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.2)",
        "glow": "0 0 30px rgba(212, 175, 55, 0.25)",
        "glow-cyan": "0 0 30px rgba(56, 189, 248, 0.25)",
      },
      screens: {
        "xs": "375px",
        "2xs": "320px",
      },
    },
  },
  plugins: [],
};

export default config;
