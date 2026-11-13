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
        // Luxury Warm Earth & Pale Gold Theme Mapping
        brandBlue: {
          50: "#FDFBF7",
          100: "#F7F2E7",
          200: "#EFE5CE",
          300: "#E2CFAB",
          400: "#D4B37F",
          500: "#B88E4F", // Pale burnished gold
          600: "#8B5A2B", // Signature Deep Warm Saddle Brown
          700: "#6E431F", // Rich Espresso Earth
          800: "#523117", // Dark Roast Umber
          900: "#3B2210", // Deepest Warm Mahogany
          950: "#241409", // Deep Obsidian Brown
        },
        navy: {
          800: "#3E2718",
          900: "#2A180E",
          950: "#1C1008",
        },
        seaTurquoise: "#D4AF37", // Harmonized metallic accents
        seaBlue: "#A67C37",
        sand: "#F5EBE1",
        theme: {
          bg: "#FFFFFF",
          surface: "#FAF8F5",
          card: "#FFFFFF",
          cardHover: "#F6F2EC",
          border: "#EADCCB",
          borderHover: "#D8C3A5",
        },
        gold: {
          light: "#FDF4DC",
          pale: "#EED9B3",
          DEFAULT: "#D4AF37", // Iconic Glowing Pale Gold
          glow: "#F3C966",
          dark: "#AA8022",
        },
        brown: {
          50: "#FAF7F2",
          100: "#F3ECE1",
          200: "#E5D7C3",
          300: "#CDB697",
          400: "#B0926C",
          500: "#8B5A2B", // Warm saddle brown
          600: "#6E431F",
          700: "#543317",
          800: "#3D2310",
          900: "#2A180B",
          950: "#1B0E06",
        },
        projects: {
          slate: "#FDFBF7",
          orange: "#C2782A",
          orangeGlow: "#E0933C",
          cyan: "#8B5A2B",
        },
        branding: {
          obsidian: "#1C1008",
          lime: "#D4AF37",
          limeGlow: "#F3C966",
          emerald: "#8B5A2B",
        },
        fashion: {
          burgundy: "#5E2519",
          rose: "#9E5338",
          champagne: "#FAF5ED",
        },
        bakery: {
          espresso: "#2A180B",
          amber: "#D4AF37",
          honey: "#8B5A2B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-glow": "radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
        "gold-glow": "radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.22) 0%, rgba(139, 90, 43, 0.08) 50%, transparent 75%)",
        "ocean-pattern": "linear-gradient(180deg, #FDF7EB 0%, #FFFFFF 100%)",
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
