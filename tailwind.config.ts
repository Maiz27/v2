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
    },
  },
  plugins: [],
};
export default config;
