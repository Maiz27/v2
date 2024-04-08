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
        'primary-content': '#1a3860',
        'primary-dark': '#6e9bd8',
        'primary-light': '#bed3ee',

        background: '#010001',
        foreground: '#121212',
        border: '#121212',

        copy: '#fafbfc',
        'copy-light': '#cdd7e5',
        'copy-lighter': '#cdd7e5',

        success: '#00b500',
        warning: '#b5b500',
        error: '#b50000',

        'success-content': '#b5ffb5',
        'warning-content': '#000000',
        'error-content': '#ffb5b5',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-300%)' },
        },
      },
      animation: {
        slide: 'slide 30s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
