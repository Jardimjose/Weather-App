/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        luminous: {
          primary: "#0284C7",
          secondary: "#0EA5E9",
          tertiary: "#38BDF8",
          neutral: "#0F172A",
        },
        atmospheric: {
          primary: "#00B4D8",
          secondary: "#0096C7",
          tertiary: "#48CAE4",
          neutral: "#0A0F18",
        },
      },
    },
  },
  plugins: [],
};
