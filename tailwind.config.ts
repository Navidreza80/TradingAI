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
        primary: {
          light: '#3A0CA3',
          dark: '#4361EE',
        },
        secondary: {
          light: '#7209B7',
          dark: '#3F37C9',
        },
        background: {
          light: '#F1FAEE',
          dark: '#121212',
        },
        foreground: {
          light: '#1D3557',
          dark: '#E5E5E5',
        },
        success: {
          light: '#80B918',
          dark: '#55A630',
        },
        danger: {
          light: '#D90429',
          dark: '#EF233C',
        },
        warning: {
          light: '#FF9F1C',
          dark: '#FF8800',
        },
        neutral: {
          light: '#ADB5BD',
          dark: '#6C757D',
        },
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
