/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,css}',
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
      colors: {
        'dark-grey': 'rgba(0, 0, 0, 0.75)',
        'grey-50': 'rgba(0, 0, 0, 0.5)',
        'grey-25': 'rgba(0, 0, 0, 0.25)',
        border: 'rgba(#4C4C46, 0.25)',
        'coratina-green': '#4C601B',
        'picual-red': '#C73A15',
      },
    },
  },
  plugins: [],
};
