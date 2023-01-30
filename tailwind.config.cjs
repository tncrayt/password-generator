/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark': "#09090d",
        'green': "#a5ffaf",
        'gray': "#24232a",
        'yellow': "#f7ce66",
        'smoke': "#e7e6eb",
      }
    },
  },
  plugins: [],
}
