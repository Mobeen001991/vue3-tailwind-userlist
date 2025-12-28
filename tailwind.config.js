/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-dark': '#303030',
        'text-light': '#bcbcbc',
        'theme-blue': '#36bad8',
      },
    },
  },
  plugins: [],
}

