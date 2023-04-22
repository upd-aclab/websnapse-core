/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Raleway"],
    },
    extend: {
      colors: {
        lilac: "#786ea6",
        navyblue: "#1c00ff",
      },
    },
  },
  plugins: [],
};

module.exports = config;
