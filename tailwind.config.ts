import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#96b7e3',

        background: '#010001',
        foreground: '#121212',
        border: '#212222',

        copy: '#fafbfc',
        'copy-light': '#cdd7e5',
        'copy-lighter': '#cdd7e5',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-150%)' },
        },
        'slide-2': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-300%)' },
        },
        'slide-3': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-450%)' },
        },
      },
      animation: {
        slide: 'slide 20s linear infinite',
        'slide-2': 'slide-2 30s linear infinite',
        'slide-3': 'slide-2 40s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
