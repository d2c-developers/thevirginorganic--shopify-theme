/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './sections/*.liquid',
    './snippets/*.liquid',
    './layout/*.liquid',
    './templates/*.liquid',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['GT-Alpina', 'serif'],
        sans: ['SuperGrotesk', 'sans-serif'],
        display: ['Engelsgold', 'sans-serif'],
      },
      margin: {
        100: '100px',
        50: '50px',
      },
      padding: {
        100: '100px',
        50: '50px',
      },
      spacing: {
        50: '50px',
        100: '100px',
      },
    },
  },
  plugins: [],
};
