/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        FredokaOne: ["Fredoka One", "cursive"],
      },
    },
  },
  plugins: [require("daisyui"), 
  require("tailwindcss-scoped-groups")
],
  daisyui: {
    // themes: false,
  },
};
