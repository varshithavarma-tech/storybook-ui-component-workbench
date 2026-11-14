/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Quicksand"', 'Georgia', 'serif']
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgb(15 23 42 / 0.06)'
      }
    }
  },
  plugins: []
};
