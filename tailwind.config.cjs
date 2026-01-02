/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        church: {
          50: "#f8fbff",
          100: "#eef6ff",
          200: "#d6e9ff",
          500: "#2b6cb0",
        },
      },
    },
  },
  plugins: [],
};
