/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: "#662D91",
        pri_light: "#753277",
        pri_dark: "#392f77",
        sec: "#F15A29",
        sec_light: "#d88552",
        sec_dark: "#c64b42",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
