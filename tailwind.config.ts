// imports
import type { Config } from "tailwindcss";

// config
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // dark mode
  darkMode: 'class',

  // theme
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // font family
      fontFamily: {
        vazirmatn: ['Vazirmatn', 'system-ui', 'sans-serif'],
        notokufi: ['NotoKufiArabic', 'system-ui', 'sans-serif'],
      },

      // colors
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // keyframes
      keyframes: {
        headerPattern: {
          '0%': { backgroundPosition: '0 0, 15px 15px' },
          '100%': { backgroundPosition: '20px 20px, 35px 35px' },
        }
      },

      // animation
      animation: {
        headerPattern: 'headerPattern 60s linear infinite',
      },
    },
  },

  // plugins
  plugins: [],
};

// export config
export default config;
