/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // LO Radar palette — teal + gold + deep ink. No retention-blue or revenue-orange
        // (those belong to the sister sites at retentioniq.io).
        ink: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e5e7eb",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#6b7280",
          600: "#475569",
          700: "#374151",
          800: "#111827",
          900: "#0a0d15",
          950: "#05070d",
        },
        // Refi teal — the engine accent
        refi: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        // Gold — the "luxurious" mortgage signal
        gold: {
          100: "#f7e9c8",
          200: "#e9c887",
          300: "#dab76a",
          400: "#c9a96a",
          500: "#b89050",
          600: "#a17c3d",
          700: "#85652d",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["\"Cormorant Garamond\"", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
