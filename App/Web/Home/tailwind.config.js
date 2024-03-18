/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00B691",
        selected: "#00E5BD",
        Gam: "#4150D8",
        Chat: "#4CFF69",
        Social: "#FFD95B",
      },
      minHeight: {
        card: "90vh",
      },
      height: {
        sidebar: "84vh",
      },
      fontFamily: {
        Poppins: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
