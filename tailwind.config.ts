import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        wave: "url('/image/gesture.png')",
        waveDark: "url('/image/gestureDark.png')",
        comments: "url('/image/comments.png')",
        likes: "url('/image/likes.png')",
        user: "url('/image/user.png')",
        save: "url('/image/saved.png')",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      fontFamily: {
        vazirmatn: ["Vazirmatn", "system-ui", "sans-serif"],
        notokufi: ["NotoKufiArabic", "system-ui", "sans-serif"],
        numericpersian: ["NumericPersian", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        headerPattern: {
          "0%": { backgroundPosition: "0 0, 15px 15px" },
          "100%": { backgroundPosition: "20px 20px, 35px 35px" },
        },
      },
      animation: {
        headerPattern: "headerPattern 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
