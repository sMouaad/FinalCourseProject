/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Comp/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#00E5BD",
        Secondry: "#D9D9D9",
        DeepthProgresBar: "#65FCE2",
      },
    },
  },
  plugins: [],
};
