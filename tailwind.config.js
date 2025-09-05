/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1.5rem",
          sm: "2rem",
          md: "2.5rem",
          lg: "3rem",
          xl: "3.5rem",
          "2xl": "4rem",
        },
      },
      colors: {
        orange: "#d87d4a",
        light: "#f1f1f1",
        dark: "#101010",
        orangeLight: "#fbaf85",
        charcoal: "#181818",
        softGrayBg: "#80808038",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
