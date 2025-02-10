import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main_purple: "#7e22ce"
      },
      boxShadow: {
        "weak-ass-glow": "0 0 15px 5px rgba(180, 180, 180, 0.5)",
        "glow-red": "0 0 15px 5px rgba(231, 33, 6, 0.3)",
        "glow-slight-red": "0 0 15px 5px rgba(255, 166, 0, 0.3)",
        "glow-purple": "0 0 15px 5px rgba(147, 51, 234, 0.6)",
        "glow-pink": "0 0 15px 5px rgba(236, 72, 153, 0.6)",
        glow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
} satisfies Config;
