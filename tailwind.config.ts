import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b5005f',
          container: '#e20378',
          fixed: '#ffd9e2',
        },
        secondary: {
          DEFAULT: '#4c00bb',
          container: '#6600f7',
          fixed: '#e9ddff',
        },
        tertiary: {
          DEFAULT: '#006c07',
          container: '#00880c',
          fixed: '#7afe6a',
        },
        background: '#fff8f8',
        surface: {
          DEFAULT: '#fff8f8',
          dim: '#f0d3d9',
          bright: '#fff8f8',
          container: {
            lowest: '#ffffff',
            low: '#fff0f2',
            DEFAULT: '#ffe8ed',
            high: '#ffe1e7',
            highest: '#f9dbe2',
          },
        },
      },
      backgroundImage: {
        'virtavio-gradient': 'linear-gradient(135deg, #FF2D8D 0%, #6A00FF 100%)',
        'virtavio-glow': 'radial-gradient(circle at center, rgba(106, 0, 255, 0.08) 0%, transparent 70%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
      },
      spacing: {
        'xs': '4px',
        'sm': '12px',
        'md': '24px',
        'lg': '48px',
        'xl': '80px',
      },
    },
  },
  plugins: [],
};
export default config;
