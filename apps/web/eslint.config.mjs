import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['src/lib/data/**', 'src/lib/sanity/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/lib/sanity/client',
              message: 'Read Sanity data through an accessor in @/lib/data.',
            },
            {
              name: '@/lib/sanity/queries',
              message: 'Bind Sanity queries to accessors in @/lib/data.',
            },
          ],
        },
      ],
    },
  },
];

export default config;
