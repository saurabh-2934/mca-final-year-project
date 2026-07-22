/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        merriweather: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
