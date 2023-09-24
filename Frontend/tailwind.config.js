require('./tailwind-plugin.cjs');
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          50: 'var(--primary-color-50)',
          100: 'var(--primary-color-100)',
          200: 'var(--primary-color-200)',
          300: 'var(--primary-color-300)',
          400: 'var(--primary-color-400)',
          500: 'var(--primary-color-500)',
          600: 'var(--primary-color-600)',
          700: 'var(--primary-color-700)',
          800: 'var(--primary-color-800)',
          900: 'var(--primary-color-900)',
          neon: 'var(--primary-color-neon)',
        },
      },
      lineHeight: {
        12: '48px',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      width: {
        sidebar: 300,
      },
      maxWidth: {
        'main-content': 768,
      },
      height: {
        header: 50,
      },
      fontSize: {
        small: 10,
      },
      keyframes: {
        shine: {
          to: { backgroundPositionX: '-200%' },
        },
      },
      animation: {
        shine: '1.5s shine linear infinite',
      },
      // gridTemplateColumns: {
      //   // Simple 8 row grid
      //   8: 'repeat(8, minmax(0, 1fr))',

      //   // // Complex site-specific row configuration
      //   // layout: '200px minmax(900px, 1fr) 100px',
      // },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.border-base': {
          '@apply  border-solid border-gray-300 dark:border-slate-700': {},
        },
        'body, .body-pr': {
          '@apply pr-[var(--body-padding-right)]': {},
        },
      });
    },
    // Tải config để tailwind IntelliSense có thể đọc config từ file này và suggesstion
    require('./src/assets/tailwind.css'),
  ],

  darkMode: 'class',
  safelist: ['bg-gray-200 text-gray-800 dark:bg-slate-950 dark:text-slate-300'],
};
