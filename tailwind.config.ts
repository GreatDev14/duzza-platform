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
        // Luxury Deep Earth Brown & Pale Gilded Gold (Gilded Obsidian Aesthetic)
        brandBlue: {
          50: "#1C110A",  // Deepest obsidian brown
          100: "#26170E", // Dark umber base
          200: "#382315", // Rich chocolate brown
          300: "#4D311E", // Warm roasted coffee
          400: "#6B4429", // Saddle bronze
          500: "#B88E4F", // Pale burnished gold
          600: "#D4AF37", // Iconic Glowing Pale Gold
          700: "#EED9B3", // Soft pale champagne gold
          800: "#F5EBE1", // Ivory pearl
          900: "#FAF7F2", // Crisp light text highlight
          950: "#FFFFFF",
        },
        navy: {
          800: "#2B1A10",
          900: "#1E110A",
          950: "#140A05",
        },
        seaTurquoise: "#D4AF37",
        seaBlue: "#B88E4F",
        sand: "#1A0F08",
        theme: {
          bg: "#140A05",        // Ultra-luxurious dark espresso/obsidian
          surface: "#1C110A",   // Elevated dark card surface
          card: "#26170E",      // Card container
          cardHover: "#331E12", // Interactive hover card
          border: "#3D2415",    // Subtle gilded border
          borderHover: "#D4AF37",
        },
        gold: {
          light: "#FFF6DE",
          pale: "#EED9B3",
          DEFAULT: "#D4AF37", // Glowing Pale Gold
          glow: "#F3C966",
          dark: "#99731C",
        },
        brown: {
          50: "#FAF7F2",
          100: "#F3ECE1",
          200: "#E5D7C3",
          300: "#CDB697",
          400: "#B0926C",
          500: "#8B5A2B",
          600: "#6E431F",
          700: "#543317",
          800: "#382315",
          900: "#26170E",
          950: "#140A05",
        },
        projects: {
          slate: "#1C110A",
          orange: "#D4AF37",
          orangeGlow: "#F3C966",
          cyan: "#B88E4F",
        },
        branding: {
          obsidian: "#140A05",
          lime: "#D4AF37",
          limeGlow: "#F3C966",
          emerald: "#B88E4F",
        },
        fashion: {
          burgundy: "#401812",
          rose: "#B88E4F",
          champagne: "#FAF5ED",
        },
        bakery: {
          espresso: "#1A0F08",
          amber: "#D4AF37",
          honey: "#B88E4F",
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
