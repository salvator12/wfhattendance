/** @type {import('tailwindcss').Config} */ //fitur autocomplete
export default {
  content: [ // memberitahu semua file yang perlu discan untuk mencari nama-nama class Tailwind
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}