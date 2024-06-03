/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ["Playfair Display", 'serif'],
        'lora': ["Lora", 'serif'],
        'mulish': ["Mulish", 'sans-serif']
      }
    },
  },
  plugins: [],
}