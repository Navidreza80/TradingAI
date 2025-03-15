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
        sidebarDM: "url('/image/sidebar-dark-mode.svg')",
        sidebarLM: "url('/image/sidebar-light-mode.svg')",
        dashboardDM: "url('/image/dashboard-dark-mode.svg')",
        dashboardLM: "url('/image/dashboard-light-mode.svg')",
        userLM: "url('/image/user-light-mode.svg')",
        userDM: "url('/image/user-dark-mode.svg')",
        bookLM: "url('/image/book-light-mode.svg')",
        bookDM: "url('/image/book-dark-mode.svg')",
        coinLM: "url('/image/coin-light-mode.svg')",
        coinDM: "url('/image/coin-dark-mode.svg')",
        commentLM: "url('/image/comment-light-mode.svg')",
        commentDM: "url('/image/comment-dark-mode.svg')",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        vazirmatn: ["Vazirmatn", "system-ui", "sans-serif"],
        notokufi: ["NotoKufiArabic", "system-ui", "sans-serif"],
        numericpersian: ["NumericPersian", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#6366f1", // Custom primary color
        secondary: "#10b981", // Custom secondary color
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
