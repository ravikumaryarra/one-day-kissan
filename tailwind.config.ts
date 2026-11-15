import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#f6f8f2",
          100: "#ebf1e2",
          200: "#d7e3c6",
          300: "#b9cea1",
          400: "#97b478",
          500: "#759852",
          600: "#5a7a3e",
          700: "#455e31",
          800: "#394c2a",
          900: "#223218",
          950: "#131d0c",
        },
        clay: {
          50: "#fcf8f5",
          100: "#f8eee7",
          200: "#f0d9cb",
          300: "#e4bfa8",
          400: "#d39c7f",
          500: "#c47e5b",
          600: "#b5694c",
          700: "#97523f",
          800: "#7b4437",
          900: "#643a30",
        },
        sand: {
          50: "#faf8f5",
          100: "#f4f0e8",
          200: "#e8dfd0",
          300: "#d9cab0",
          400: "#c7b08d",
          500: "#ba9d73",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "text-shimmer": "textShimmer 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        textShimmer: {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
export default config;
