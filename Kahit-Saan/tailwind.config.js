/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#D4AF37',
        'brand-black': '#1A1A1A',
        'brand-white': '#FFFFFF',
        'brand-gray': '#B0B0B0',
        'brand-red': '#C0392B',
        'brand-green': '#27AE60',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        kaushan: ['Kaushan Script', 'cursive'],
      }
    },
  },
  plugins: [],
}