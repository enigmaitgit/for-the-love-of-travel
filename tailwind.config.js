/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-ink": "#0b1320",
        "brand-gold": "#c4a052",
        "brand-rose": "#fbe7ec"
      },
      boxShadow: {
        "smooth": "0 10px 30px rgba(0,0,0,0.12)"
      },
      borderRadius: {
        "2xl": "1.25rem"
      }
    },
  },
  plugins: [],
}
