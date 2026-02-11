/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ox-red": "#D00000",
        "ox-dark": "#191919",
      },
    },
  },
  plugins: [],
};
