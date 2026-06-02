/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },
      colors: {
        yellow: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
        },
      },
    },
  },
  plugins: [],
}

