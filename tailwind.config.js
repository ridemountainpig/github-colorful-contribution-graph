/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        travertine: {
          50: "#ffffff",
          100: "#fffffc",
          200: "#fffffa",
          300: "#fffff7",
          400: "#fcfced",
          500: "#fcfbe7",
          600: "#e3dfbc",
          700: "#bdb382",
          800: "#968753",
          900: "#735d2f",
          950: "#4a3514",
        },
        shark: {
          50: "#f2f4f5",
          100: "#e6e9eb",
          200: "#bdc5c9",
          300: "#99a2a8",
          400: "#586169",
          500: "#1f2328",
          600: "#191d24",
          700: "#12171f",
          800: "#0c111a",
          900: "#060a12",
          950: "#03060d",
        },
      },
    },
  },
  plugins: [forms],
};
