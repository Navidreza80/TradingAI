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
          light: "#9D4EDD", // Vibrant purple for light mode
          dark: "#BB86FC", // Soft neon purple for dark mode
        },
        secondary: {
          light: "#7B2CBF", // Deep purple for light mode
          dark: "#03DAC6", // Teal accent for dark mode
        },
        background: {
          light: "#FFFFFF", // Clean white for light mode
          dark: "#0A0A0A", // Deep black background (pixel-perfect dark)
        },
        foreground: {
          light: "#1A1A1A", // Near black for light mode text
          dark: "#EDEDED", // Off-white for dark mode text
        },
        accent: {
          light: "#FEE440", // Bright yellow for light mode
          dark: "#F5E56B", // Neon yellow for dark mode (star of the show)
        },
        success: {
          light: "#2DC653", // Fresh green for light mode
          dark: "#4ADE80", // Neon green for dark mode
        },
        danger: {
          light: "#E5484D", // Soft red for light mode
          dark: "#FF5555", // Bright red for dark mode
        },
        warning: {
          light: "#FF9F1C", // Orange for light mode
          dark: "#FFB347", // Neon orange for dark mode
        },
        neutral: {
          light: "#6B7280", // Gray for light mode
          dark: "#9CA3AF", // Light gray for dark mode
        },
        surface: {
          light: "#F3F4F6", // Light gray surface
          dark: "#1E1E1E", // Dark surface for cards (pixel-perfect)
        },
        border: {
          light: "#E5E7EB", // Light borders
          dark: "#2E2E2E", // Dark borders (barely visible)
        },
        // Special neon yellow for highlights and glows
        neon: {
          light: "#FFE629", // Bright yellow
          dark: "#F5E56B", // Neon yellow with glow effect
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
