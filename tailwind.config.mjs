/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // LoanOpticsAI palette — drawn directly from the logo mark (magnifier +
        // bar chart, blue-to-violet gradient) + the near-black navy wordmark ink.
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
        // Blue — the bar-chart / magnifier-ring half of the logo gradient.
        // Was "refi" (teal); kept the key name so every text-refi-*/bg-refi-*
        // utility across the site updates without touching each file.
        refi: {
          50:  "#eef6ff",
          100: "#dceaff",
          200: "#b7d6ff",
          300: "#86b9ff",
          400: "#4a94f9",
          500: "#0d7bf5",
          600: "#0a63cc",
          700: "#0a4fa3",
          800: "#0c3f81",
          900: "#0b325f",
        },
        // Violet — the magnifier-handle / "AI" half of the logo gradient.
        // Was "gold" (warm tan); kept the key name for the same reason.
        gold: {
          100: "#f2ecff",
          200: "#ddc5ff",
          300: "#b98cff",
          400: "#9c5ff2",
          500: "#7c3aed",
          600: "#6422c7",
          700: "#4c1799",
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
