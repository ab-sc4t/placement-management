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
        yellow:{
          500 : "#FFB800"
        },
        gray:{
          400: "#9C9FA6"
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
