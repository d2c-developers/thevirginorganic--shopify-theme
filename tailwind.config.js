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
      margin: {
        100: '100px',
      },
      padding: {
        100: '100px',
      },
    },
  },
  plugins: [],
};
