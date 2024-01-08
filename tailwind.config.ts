import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00adb5',
        'primary-content': '#b5fcff',
        'primary-dark': '#007c82',
        'primary-light': '#00dee8',

        secondary: '#00b535',
        'secondary-content': '#b5ffcb',
        'secondary-dark': '#008226',
        'secondary-light': '#00e844',

        background: '#ebf4f4',
        foreground: '#fafcfc',
        border: '#d6e7e8',

        copy: '#1c3031',
        'copy-light': '#4a8082',
        'copy-lighter': '#6da9ac',

        success: '#00b500',
        warning: '#b5b500',
        error: '#b50000',

        'success-content': '#b5ffb5',
        'warning-content': '#000000',
        'error-content': '#ffb5b5',
      },
    },
  },
  plugins: [],
};
export default config;
