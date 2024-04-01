/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00B691",
        selected: "#00E5BD",
        Gam: "#4150D8",
        Chat: "#4CFF69",
        Social: "#FFD95B",
        BgColor: "#f0f2f5",
        sidebar: "#496bf1",
        card: "#2dd6c1",
        contrast: "#e8f3f9",
        background: "#f7fbfe",
      },
      minHeight: {
        card: "90vh",
      },
      height: {
        sidebar: "84vh",
      },
      fontFamily: {
        Poppins: ["Poppins", "system-ui", "sans-serif"],
        Roboto: ["Roboto", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
